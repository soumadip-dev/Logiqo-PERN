import { Router } from 'express';

import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
} from '../controller/playlist.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.get('/', authMiddleware, getAllListDetails);
router.get('/:playlistId', authMiddleware, getPlayListDetails);
router.post('/create-playlist', authMiddleware, createPlaylist);
router.post('/:playlistId/add-problem', authMiddleware, addProblemToPlaylist);
router.delete('/:playlistId', authMiddleware, deletePlaylist);
router.delete('/:playlistId/remove-problem', authMiddleware, removeProblemFromPlaylist);

//* Export the router
export default router;
