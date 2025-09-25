import {
  createPlaylistService,
  deletePlaylistService,
  getAllPlaylistsService,
  getPlaylistDetailsService,
  addProblemsToPlaylistService,
  removeProblemsFromPlaylistService,
} from '../services/playlist.services.js';

//* Controller to create a playlist
const createPlaylist = async (req, res) => {
  try {
    // Extract playlist data from request body
    const { name, description } = req.body;

    // Get user ID from request object
    const userId = req.user.id;

    // Call service to create playlist
    const playlist = await createPlaylistService(userId, name, description);

    // Send successful response
    res.status(200).json({ success: true, message: 'Playlist created successfully', playlist });
  } catch (error) {
    // Handle errors
    console.error('Error in creating playlist:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
