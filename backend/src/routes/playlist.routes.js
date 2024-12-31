// IMPORTING MODULES
import { Router } from 'express';
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
} from '../controllers/playlist.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares';

// CREATING ROUTER INSTANCE
const router = Router();

// GET
router.get('/', authMiddleware, getAllListDetails);

router.get('/:playlistId', authMiddleware, getPlayListDetails);

router.post('/create-playlist', authMiddleware, createPlaylist);

router.post('/:playlistId/add-problem', authMiddleware, addProblemToPlaylist);

router.delete('/:playlistId', authMiddleware, deletePlaylist);

router.delete(
  '/:playlistId/remove-problem',
  authMiddleware,
  removeProblemFromPlaylist
);

// EXPORTING ROUTER INSTANCE
export default router;
