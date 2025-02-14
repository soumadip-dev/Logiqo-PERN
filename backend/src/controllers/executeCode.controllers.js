// IMPORTING MODULES
import { db } from '../libs/db.js';
import {
  getJudge0LanguageName,
  pollBatchResults,
  submissionBatch,
} from '../libs/judge0.lib.js';

export const executeCode = async (req, res) => {
  // Get data from body
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  // Check if all fields are present
  if (
    !source_code ||
    !language_id ||
    !stdin ||
    !expected_outputs ||
    !problemId
  ) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  // Get user id from request
  const userId = req.user.id;

  try {
    // Validate test cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing test cases',
      });
    }

    // Prepare each test cases for judge0 batch submission
    const submissions = stdin.map(input => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // Send batch submission request to judge0
    const submitResponse = await submissionBatch(submissions);

    // Extract tokens (submission IDs) from Judge0 response
    const tokens = submitResponse.map(result => result.token);

    // Keep polling Judge0 until all submissions are finished
    const results = await pollBatchResults(tokens);

    // Analyze test cases results
    let allPassed = true;

    // Check if all test cases passed
    const detailedResults = results.map((result, index) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[index].trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: index + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    // Save submission to database
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getJudge0LanguageName(language_id),
        stdin: stdin.join('\n'),
        stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
        stderr: detailedResults.some(r => r.stderr)
          ? JSON.stringify(detailedResults.map(r => r.stderr))
          : null,
        compileOutput: detailedResults.some(r => r.compile_output)
          ? JSON.stringify(detailedResults.map(r => r.compile_output))
          : null,
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        memory: detailedResults.some(r => r.memory)
          ? JSON.stringify(detailedResults.map(r => r.memory))
          : null,
        time: detailedResults.some(r => r.time)
          ? JSON.stringify(detailedResults.map(r => r.time))
          : null,
      },
    });

    // If allPassed = true, mark problem as solved for the current user
    if (allPassed) {
      await db.ProblemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    // Save individual test case result using detailedResults
    const testCaseResults = detailedResults.map(result => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    // Save test case results to database
    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    //
    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Code executed successfully',
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error('Error in executeCode controller', error.message);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    });
  }
};
