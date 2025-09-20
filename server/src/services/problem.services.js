import { db } from '../config/db.config.js';
import { getJudge0LanguageId, submissionBatch, pollBatchResults } from '../utils/judge0.utils.js';

//* Service for creating a new problem
async function createProblemService(data) {
  // Destructure problem data
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
    userId,
  } = data;

  // Loop through each reference solution for different languages
  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    // Get the language ID from Judge0
    const languageId = getJudge0LanguageId(language);

    // If the language is not supported, throw an error response
    if (!languageId) {
      throw new Error(`${language} is not supported by Logiqo at the moment`);
    }

    // Prepare submission batch for all test cases using the current reference solution
    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    // Send all submissions to Judge0 — this returns tokens for test cases
    // Example: [{token: "..."}, {token: "..."}, {token: "..."}]
    const submissionResults = await submissionBatch(submissions);

    // Extract tokens (submission IDs) from Judge0's response
    // Example: ["token1", "token2", "token3", ...]
    const tokens = submissionResults.map(result => result.token);

    // Poll Judge0 repeatedly until all submissions are processed
    const results = await pollBatchResults(tokens);

    // Check if all test cases passed for the given language
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status.id !== 3) {
        throw new Error(`Test case ${i + 1} did not pass for ${language}`);
      }
    }
  }

  // Create a new problem in the database
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
      editorial,
      hints,
      userId,
    },
  });

  return newProblem;
}

//* Service for getting all problems
async function getAllProblemsService() {
  // Get all problems from the database
  const problems = await db.problem.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Return an empty array if no problems are found
  return problems || [];
}

//* Service for getting a specific problem by ID
async function getProblemByIdService(problemId) {
  // Validate problem ID
  if (!problemId) {
    throw new Error('Problem ID is required');
  }

  // Get problem by ID from database
  const problem = await db.problem.findUnique({
    where: { id: problemId },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      tags: true,
      examples: true,
      constraints: true,
      testcases: true,
      codeSnippets: true,
      referenceSolutions: true,
      editorial: true,
      hints: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });

  // Return null if no problem is found
  return problem || null;
}

//* Service for updating an existing problem
async function updateProblemService(problemId, data, user) {
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
  } = data;

  // Validate required fields
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
    throw new Error('All fields are required');
  }

  // Check if problem exists
  const existingProblem = await db.problem.findUnique({
    where: { id: problemId },
  });

  if (!existingProblem) {
    throw new Error('Problem not found');
  }

  // Verify authorization (admin or problem owner)
  if (user.role !== 'ADMIN' && existingProblem.userId !== user.id) {
    throw new Error('Forbidden - You are not authorized to update this problem');
  }

  // Validate each reference solution again using Judge0
  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      throw new Error(`${language} is not supported by Logiqo at the moment`);
    }

    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResults = await submissionBatch(submissions);
    const tokens = submissionResults.map(result => result.token);
    const results = await pollBatchResults(tokens);

    for (let i = 0; i < results.length; i++) {
      if (results[i].status.id !== 3) {
        throw new Error(`Test case ${i + 1} did not pass for ${language}`);
      }
    }
  }

  // Update the problem in the database
  const updatedProblem = await db.problem.update({
    where: { id: problemId },
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
      editorial,
      hints,
    },
  });

  return updatedProblem;
}

export { createProblemService, getAllProblemsService, getProblemByIdService, updateProblemService };
