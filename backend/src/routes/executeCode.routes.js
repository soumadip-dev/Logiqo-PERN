// IMPORTING MODULES
import { Router } from 'express';
import { executeCode } from '../controllers/executeCode.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// EXECUTE CODE ROUTE
router.post('/', authMiddleware, executeCode);

// EXPORTING ROUTER INSTANCE
export default router;
