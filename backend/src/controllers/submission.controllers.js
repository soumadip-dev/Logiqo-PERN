// IMPORTING MODULES
import { db } from '../libs/db.js';

// CONTROLLER FOR GET ALL SUBMISSIONS FOR USER
const getAllSubmission = async (req, res) => {
  try {
    // Extract user ID from request
    const userId = req.user.id;

    // Fetch all submissions for the user
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      submissions,
    });
  } catch (error) {
    console.error('Server error', error.message);
    res.status(500).json({
      error: 'Failed to fetch submissions',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL SUBMISSIONS FOR PROBLEM
const getSubmissionsForProblem = async (req, res) => {
  try {
    // Extract user ID from request
    const userId = req.user.id;

    // Extract problemID from parameters
    const problemId = req.params.problemId;

    // Fetch all submissions for the user and problem
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    // Return success response with submissions
    res.status(200).json({
      success: true,
      message: 'Submissions fetched successfully',
      submissions,
    });
  } catch (error) {
    console.error('Server error', error.message);
    res.status(500).json({
      error: 'Failed to fetch submissions',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL SUBMISSIONS COUNT FOR PROBLEM
const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
  } catch (error) {
    console.error('Server error', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// EXPORTING CONTROLLERS
export {
  getAllSubmission,
  getAllTheSubmissionsForProblem,
  getSubmissionsForProblem,
};
