import { Router } from 'express';

import {
  getUserSubmissions,
  getUserSubmissionsForProblem,
  getProblemSubmissionCount,
} from '../controller/submission.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.get('/get-all-submissions', authMiddleware, getUserSubmissions);
router.get('/get-submission/:problemId', authMiddleware, getUserSubmissionsForProblem);
router.get('/get-submissions-count/:problemId', authMiddleware, getProblemSubmissionCount);

//* Export the router
export default router;
