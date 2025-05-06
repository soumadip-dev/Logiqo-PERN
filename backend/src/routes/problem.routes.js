// IMPORTING MODULES
import { Router } from 'express';
import {
  createProblem,
  deleteProblem,
  getAllProblems,
  getAllProblemsSolvedByUser,
  getProblemById,
  updateProblem,
} from '../controllers/problem.controllers.js';
import { authMiddleware, checkAdmin } from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// CREATE PROBLEM ROUTE
router.post('/create-problem', authMiddleware, checkAdmin, createProblem);

// GET ALL PROBLEMS ROUTE
router.get('/get-all-prblems', authMiddleware, getAllProblems);

// GET PROBLEM BY ID ROUTE
router.get('/get-problem/:id', authMiddleware, getProblemById);

// UPDATE PROBLEM BY ID ROUTE
router.put('/update-problem/:id', authMiddleware, checkAdmin, updateProblem);

// DELETE PROBLEM BY ID ROUTE
router.delete('/delete-problem/:id', authMiddleware, checkAdmin, deleteProblem);

// GET ALL PROBLEMS SOLVED BY USER ROUTE
router.get('/get-solved-problems', authMiddleware, getAllProblemsSolvedByUser);

// EXPORTING ROUTER INSTANCE
export default router;
