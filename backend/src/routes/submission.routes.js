// IMPORTING MODULES
import { Router } from 'express';
import {
  getAllSubmission,
  getAllTheSubmissionsForProblem,
  getSubmissionsForProblem,
} from '../controllers/submission.controllers.js';

import { authMiddleware } from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// GET ALL SUBMISSIONS ROUTE
router.get('/get-all-submissions', authMiddleware, getAllSubmission);

// GET ALL SUBMISSIONS FOR PROBLEM ROUTE
router.get(
  '/get-submission/:problemId',
  authMiddleware,
  getSubmissionsForProblem
);

// GET ALL SUBMISSIONS COUNT FOR PROBLEM ROUTE
router.get(
  '/get-submissions-count/:problemId',
  authMiddleware,
  getAllTheSubmissionsForProblem
);

// EXPORTING ROUTER INSTANCE
export default router;
