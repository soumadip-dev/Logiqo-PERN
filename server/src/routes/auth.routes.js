import { Router } from 'express';
import { loginUser, logoutUser, registerUser, checkAuth } from '../controller/auth.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/check', authMiddleware, checkAuth);

//* Export the router
export default router;
