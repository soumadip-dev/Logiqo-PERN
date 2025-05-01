// IMPORTING MODULES
import { pollBatchResults, submissionBatch } from '../libs/judge0.lib.js';

// CONTROLLER FUNCTION TO CREATE A PROBLEM
const createProblem = async (req, res) => {
  try {
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

    // Check if the user is an admin
    if (req.user.role !== 'ADMIN')
      return res.status(403).json({
        success: false,
        error: 'Forbidden - you are not allowed to create a problem',
      });

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
      const tokens = submissionResults.map((result) => result.token);

      // Poll Judge0 repeatedly until all submissions are processed
      const results = await pollBatchResults(tokens);

      // Check if all testcases are passed
      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            error: `Testcase ${i + 1} is not passed for ${language}`,
          });
        }
      }

      //
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
    }
  } catch (err) {
    console.error('Error in createProblem controller:', err.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL PROBLEMS
const getAllProblems = async (req, res) => {};

// CONTROLLER FOR GET PROBLEM BY ID
const getProblemById = async (req, res) => {};

// CONTROLLER FOR UPDATE PROBLEM BY ID
const updateProblem = async (req, res) => {};

// CONTROLLER FOR DELETE PROBLEM BY ID
const deleteProblem = async (req, res) => {};

// CONTROLLER FOR GET ALL PROBLEMS SOLVED BY USER
const getAllProblemsSolvedByUser = async (req, res) => {};

// EXPORTING CONTROLLERS
export {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
};
