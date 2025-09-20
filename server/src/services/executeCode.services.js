import { pollBatchResults, submissionBatch } from '../utils/judge0.utils.js';

//* Service for executing code
async function executeCodeService({
  userId,
  source_code,
  language_id,
  stdin,
  expected_outputs,
  problemId,
}) {
  // validate test cases
  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    throw new Error('Invalid or missing test cases');
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
      language: getLanguageName(language_id),
      stdin: stdin.join('\n'),
    },
  });
}

export { executeCodeService };
