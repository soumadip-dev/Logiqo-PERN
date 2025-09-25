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

//* Controller to delete a playlist
const deletePlaylist = async (req, res) => {
  try {
    // Get playlist ID from request parameters
    const { playlistId } = req.params;

    // Call service to delete playlist
    const deletedPlayList = await deletePlaylistService(playlistId);

    // Send successful response
    res
      .status(200)
      .json({ success: true, message: 'Playlist deleted successfully', deletedPlayList });
  } catch (error) {
    // Handle errors
    console.error('Error in deleting playlist:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

//* Controller to get all playlists for a user
const getAllListDetails = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Call service to get all playlists
    const playlists = await getAllPlaylistsService(userId);

    // Send successful response
    res.status(200).json({ success: true, message: 'Playlists fetched successfully', playlists });
  } catch (error) {
    // Handle errors
    console.error('Error in getting all playlist for user:', error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
