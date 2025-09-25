import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from '../controller/auth.controllers.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/profile', authMiddleware, userProfile);

//* Export the router
export default router;
