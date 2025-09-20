import { Router } from 'express';

import { executeCode } from '../controller/executeCode.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Creating a new router instance
const router = Router();

//* Defining routes
router.post('/', authMiddleware, executeCode);

//* Export the router
export default router;
