import { db } from '../config/db.config.js';
import { ENV } from '../config/env.config.js';
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

    // Send all submissions to Judge0, this will return tokens for different test cases
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

export { createProblemService };
