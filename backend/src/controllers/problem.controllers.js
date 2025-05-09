// IMPORTING MODULES
import { db } from '../libs/db.js';
import {
  getJudge0LanguageId,
  pollBatchResults,
  submissionBatch,
} from '../libs/judge0.lib.js';

// CONTROLLER FUNCTION TO CREATE A PROBLEM
const createProblem = async (req, res) => {
  // Extract all problem-related data from request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // Check if all required fields are present
  if (
    !title ||
    !description ||
    !difficulty ||
    !tags ||
    !examples ||
    !constraints ||
    !testcases ||
    !codeSnippets ||
    !referenceSolutions
  ) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  // Check if the user is an admin
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden - you are not allowed to create a problem',
    });
  }
  try {
    // Loop through each reference solution for different languages
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      // If the language is not supported, send an error response
      if (!languageId) {
        return res.status(400).json({
          success: false,
          error: `${language} is not supported by logiqo at the moment`,
        });
      }

      // Prepare submissions for all testcases using the current reference solution
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      // Send all submissions to Judge0
      const submissionResults = await submissionBatch(submissions);

      // Extract tokens (submission IDs) from Judge0's response
      const tokens = submissionResults.map(result => result.token);

      // Poll Judge0 repeatedly until all submissions are processed
      const results = await pollBatchResults(tokens);

      // Check if all testcases are passed
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log('RESULT:::::::', result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            error: `Testcase ${i + 1} is not passed for ${language}`,
          });
        }
      }
    }
    // Create the problem in the database
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    // Send success response to user
    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem: newProblem,
    });
  } catch (err) {
    console.error('Error in createProblem controller:', err);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL PROBLEMS
const getAllProblems = async (req, res) => {
  try {
    // Fetch all problems from the database
    const problems = await db.problem.findMany();

    // If no problems found, return error
    if (!problems) {
      return res.status(404).json({
        success: false,
        error: 'No problems found',
      });
    }

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Problems fetched successfully',
      problems,
    });
  } catch (error) {
    console.error('Error in getAllProblems controller:', error);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET PROBLEM BY ID
const getProblemById = async (req, res) => {
  // Extract problem ID from request parameters
  const { id } = req.params;
  try {
    // Fetch problem from the database by ID
    const problem = await db.problem.findUnique({
      where: { id },
    });

    // If no problem found, return error
    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Problem not found',
      });
    }

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Problem fetched successfully',
      problem,
    });
  } catch (error) {
    console.error('Error in getProblemById controller:', error);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR UPDATE PROBLEM BY ID
const updateProblem = async (req, res) => {
  // Extract problem ID from request parameters
  const { id } = req.params;

  // Extract all problem-related data from request body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  // Check if all required fields are present
  if (
    !title ||
    !description ||
    !difficulty ||
    !tags ||
    !examples ||
    !constraints ||
    !testcases ||
    !codeSnippets ||
    !referenceSolutions
  ) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  // Check if user is an admin
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden - you are not allowed to update this problem',
    });
  }
  try {
    // Check if problem exists in the database
    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Problem not found',
      });
    }

    // Loop through each reference solution using testcase
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = await getJudge0LanguageId(language);

      // If the language is not supported, send an error response
      if (!languageId) {
        return res.status(400).json({
          success: false,
          error: `${language} is not supported in logiqo at the moment`,
        });
      }

      // Prepare data for submission to Judge0
      const submission = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      // Send all submissions to Judge0
      const submissionResults = await submissionBatch(submission);

      // Get the tokens from the submission results
      const tokens = submissionResults.map(result => result.token);

      // Keep polling Judge0 until all submissions are finished
      const results = await pollBatchResults(tokens);

      // Check if all testcases are passed
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log('RESULT:::::::', result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            error: `Testcase ${i + 1} is not passed for ${language}`,
          });
        }
      }
    }
    // Update problem in the database
    const updatedProblem = await db.problem.update({
      where: { id },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      problem: updatedProblem,
    });
  } catch (error) {
    console.error('Error in updateProblem controller:', error);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR DELETE PROBLEM BY ID
const deleteProblem = async (req, res) => {
  // Extract the problem ID from the request parameters
  const { id } = req.params;

  try {
    // Check if the problem exists in the database
    const problem = await db.problem.findUnique({ where: { id } });

    // If the problem doesn't exist, send a 404 error response
    if (!problem) {
      return res.status(404).json({
        success: false,
        error: 'Problem not found',
      });
    }

    // Delete the problem from the database
    await db.problem.delete({ where: { id } });

    // Send a success response to the client
    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteProblem controller', error);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL PROBLEMS SOLVED BY USER
const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    // Extract user ID from request
    const userId = req.user.id;

    // Fetch all problems solved by the user from the database
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId: userId,
          },
        },
      },
    });

    // Return success response with problems
    res.status(200).json({
      message: 'Problem fetched successfully',
      success: true,
      problems,
    });
  } catch (error) {
    console.error('Error in getAllProblemsSolvedByUser controller:', error);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// EXPORTING CONTROLLERS
export {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
};
