import { Router } from 'express';

import {
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistDetails,
  addProblemsToPlaylist,
  removeProblemsFromPlaylist,
} from '../controller/playlist.controllers.js';
import { authMiddleware } from '../middleware/auth.middlewares.js';

//* Create a new Express router
const router = Router();

//* Define routes
router.get('/', authMiddleware, getAllPlaylists);
router.get('/:playlistId', authMiddleware, getPlaylistDetails);
router.post('/create-playlist', authMiddleware, createPlaylist);
router.post('/:playlistId/add-problem', authMiddleware, addProblemsToPlaylist);
router.delete('/:playlistId', authMiddleware, deletePlaylist);
router.delete('/:playlistId/remove-problem', authMiddleware, removeProblemsFromPlaylist);

//* Export the router
export default router;
