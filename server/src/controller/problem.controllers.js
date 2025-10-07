import {
  createProblemService,
  getAllProblemsService,
  getProblemByIdService,
  updateProblemService,
  deleteProblemService,
  getAllProblemsSolvedByUserService,
} from '../services/problem.services.js';

//* Controller to create a new problem
async function createProblem(req, res) {
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
    editorial,
    hints,
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
    !referenceSolutions ||
    !editorial ||
    !hints
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    // Call service to create the problem
    const newProblem = await createProblemService({
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
      editorial,
      hints,
      userId: req.user?.id, // Safe access in case user is undefined
    });

    // Send successful response
    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem: newProblem,
    });
  } catch (error) {
    // Handle errors
    console.error('Create problem error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller to get all problems
async function getAllProblems(req, res) {
  try {
    // Call service to fetch all problems
    const problems = await getAllProblemsService();

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'All problems fetched successfully',
      problems,
    });
  } catch (error) {
    // Handle errors
    console.error('Get all problems error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller to get a specific problem by ID
async function getProblemById(req, res) {
  try {
    // Get the problem ID from request parameters
    const problemId = req.params.id;

    // Validate problem ID
    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID is required',
      });
    }

    // Call service to fetch the problem by ID
    const problem = await getProblemByIdService(problemId);

    // If problem is not found
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Problem fetched successfully',
      problem,
    });
  } catch (error) {
    // Handle errors
    console.error('Get problem by ID error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller to update a specific problem by ID
async function updateProblem(req, res) {
  try {
    // Get the problem ID from request parameters
    const problemId = req.params.id;

    // Get the updated problem data from request body
    const updatedProblemData = req.body;

    // Call service to update the problem by ID
    const updatedProblem = await updateProblemService(problemId, updatedProblemData, req.user);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      problem: updatedProblem,
    });
  } catch (error) {
    // Handle errors
    console.error('Update problem error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller to delete a problem by ID
async function deleteProblem(req, res) {
  try {
    // Get the problem ID from request parameters
    const problemId = req.params.id;

    // Validate problem ID
    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: 'Problem ID is required',
      });
    }

    // Call service to delete the problem by ID
    await deleteProblemService(problemId, req.user);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error) {
    // Handle errors
    console.error('Delete problem error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

//* Controller to get all problems solved by a user
async function getAllProblemsSolvedByUser(req, res) {
  try {
    // Get user ID from request object added by auth middleware
    const userId = req.user.id;

    // Call service to fetch all problems solved by the user
    const problems = await getAllProblemsSolvedByUserService(userId);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'All problems solved by user fetched successfully',
      problems,
    });
  } catch (error) {
    // Handle errors
    console.error('Get all problems solved by user error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
}

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getAllProblemsSolvedByUser,
};
