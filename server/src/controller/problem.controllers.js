import { createProblemService, getAllProblemsService } from '../services/problem.services.js';

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
      userId: req.user.id,
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

async function getProblemById(req, res) {}
async function updateProblem(req, res) {}
async function deleteProblem(req, res) {}
async function getAllProblemsSolvedByUser(req, res) {}

export {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getAllProblemsSolvedByUser,
};
