import {
  getUserSubmissionsService,
  getUserSubmissionsForProblemService,
  getProblemSubmissionCountService,
} from '../services/submission.services.js';

//* Controller to get all submissions for a user
async function getUserSubmissions(req, res) {
  try {
    // Get user ID from request object added by auth middleware
    const userId = req.user.id;

    // Get submissions from service
    const submissions = await getUserSubmissionsService(userId);

    res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      submissions,
    });
  } catch (error) {
    console.error('Server error', error.message);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch submissions' });
  }
}

//* Controller to get all submissions for a user for a specific problem
async function getUserSubmissionsForProblem(req, res) {
  try {
    // Get user ID from request object added by auth middleware
    const userId = req.user.id;

    // Get problem ID from request parameters
    const problemId = req.params.problemId;

    // Get submissions from service
    const submissions = await getUserSubmissionsForProblemService(userId, problemId);

    res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      submissions,
    });
  } catch (error) {
    console.error('Server error', error.message);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch submissions' });
  }
}

//* Controller to get total submissions count for a problem
async function getProblemSubmissionCount(req, res) {
  try {
    // Get problem ID from request parameters
    const problemId = req.params.problemId;

    // Get submission count from service
    const submissionCount = await getProblemSubmissionCountService(problemId);

    res.status(200).json({
      success: true,
      message: 'Submission count fetched successfully',
      submission: submissionCount,
    });
  } catch (error) {
    console.error('Server error', error.message);
    res
      .status(500)
      .json({ success: false, error: error.message || 'Failed to fetch submission count' });
  }
}

//* Export controllers
export { getUserSubmissions, getUserSubmissionsForProblem, getProblemSubmissionCount };
