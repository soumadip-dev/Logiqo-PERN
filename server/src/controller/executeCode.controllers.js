import { executeCodeService } from '../services/executeCode.services.js';
async function executeCode(req, res) {
  // Get data from body
  const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;

  // Check if all fields are present
  if (!source_code || !language_id || !stdin || !expected_outputs || !problemId) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  // Get userId from request object
  const userId = req.user.id;

  try {
    // Call service to execute code
    const result = await executeCodeService({
      userId,
      source_code,
      language_id,
      stdin,
      expected_outputs,
      problemId,
    });

    // Send successful response with result
    res.status(200).json({
      success: true,
      message: 'Code executed successfully',
      // submission: result,
    });
  } catch (error) {
    console.error('Error in executeCode controller', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong. Please try again later.',
    });
  }
}

export { executeCode };
