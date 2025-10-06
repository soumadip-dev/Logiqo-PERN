import { Router } from 'express';

import { handleCodeExecution } from '../controller/executeCode.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Creating a new router instance
const router = Router();

//* Defining routes
router.post('/', authMiddleware, handleCodeExecution);

//* Export the router
export default router;
