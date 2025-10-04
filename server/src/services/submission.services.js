import { db } from '../config/db.config.js';

//* Service to fetch all submissions for a user
async function getUserSubmissionsService(userId) {
  // Check if user ID is provided
  if (!userId) {
    throw new Error('User ID is required');
  }

  // Fetch submissions for the user from the database
  const submissions = await db.Submission.findMany({
    where: { userId },
  });

  // Return the submissions
  return submissions;
}

//* Service to fetch submissions for a user for a specific problem
async function getUserSubmissionsForProblemService(userId, problemId) {
  // Check if user ID and problem ID are provided
  if (!userId || !problemId) {
    throw new Error('User ID and problem ID are required');
  }

  // Fetch submissions for the user and problem from the database
  const submissions = await db.Submission.findMany({
    where: { userId, problemId },
  });

  // Return the submissions
  return submissions;
}

//* Service to count all submissions for a specific problem
async function getProblemSubmissionCounService(problemId) {
  // Check if problem ID is provided
  if (!problemId) {
    throw new Error('Problem ID is required');
  }

  // Fetch submission count for the problem from the database
  const submissionCount = await db.Submission.count({
    where: { problemId },
  });

  // Return the submission count
  return submissionCount;
}

//* Export services
export {
  getUserSubmissionsService,
  getUserSubmissionsForProblemService,
  getProblemSubmissionCounService,
};
