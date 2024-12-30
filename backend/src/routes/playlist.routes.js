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
import { authMiddleware } from '../middlewares/auth.middlewares.js';

// CREATING ROUTER INSTANCE
const router = Router();

// GET ALL PLAYLISTS ROUTE
router.get('/', authMiddleware, getAllListDetails);

// GET ALL PROBLEMS IN A PLAYLIST ROUTE
router.get('/:playlistId', authMiddleware, getPlayListDetails);

// CREATE A PLAYLIST ROUTE
router.post('/create-playlist', authMiddleware, createPlaylist);

// ADD A PROBLEM TO A PLAYLIST ROUTE
router.post('/:playlistId/add-problem', authMiddleware, addProblemToPlaylist);

// DELETE A PLAYLIST ROUTE
router.delete('/:playlistId', authMiddleware, deletePlaylist);

// REMOVE A PROBLEM FROM A PLAYLIST ROUTE
router.delete(
  '/:playlistId/remove-problem',
  authMiddleware,
  removeProblemFromPlaylist
);

// EXPORTING ROUTER INSTANCE
export default router;
