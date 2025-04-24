// IMPORTING MODULES
import { Router } from 'express';

import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from '../controllers/auth.controllers.js';

// CREATING ROUTER INSTANCE
const router = Router();

// USER REGISTRATION ROUTE
router.post('/register', registerUser);

// USER LOGIN ROUTE
router.post('/login', loginUser);

// USER LOGOUT ROUTE
router.post('/logout', logoutUser);

// USER PROFILE ROUTE
router.get('/profile', userProfile);

// EXPORTING ROUTER INSTANCE
export default router;
