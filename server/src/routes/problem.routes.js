import { Router } from 'express';

import {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
  getAllProblemsSolvedByUser,
} from '../controller/problem.controllers.js';
import { authMiddleware, checkAdmin } from '../middleware/auth.middlewares.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/create-problem', authMiddleware, checkAdmin, createProblem);
router.get('/get-all-prblems', authMiddleware, getAllProblems);
router.get('/get-problem/:id', authMiddleware, getProblemById);
router.put('/update-problem/:id', authMiddleware, checkAdmin, updateProblem);
router.delete('/delete-problem/:id', authMiddleware, checkAdmin, deleteProblem);
router.get('/get-solved-problems', authMiddleware, getAllProblemsSolvedByUser);

//* Export the router
export default router;
