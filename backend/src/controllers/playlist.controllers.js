// IMPORTING MODULES
import { db } from '../libs/db.js';

// CONTROLLER FOR CREATE PLAYLIST
const createPlaylist = async (req, res) => {
  try {
    // Get name and description from body
    const { name, description } = req.body;

    // Get user id from request
    const userId = req.user.id;

    // Create playlist in database
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Playlist created successfully',
      playlist,
    });
  } catch (error) {
    console.error('Error in createPlaylist controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR DELETE PLAYLIST
const deletePlaylist = async (req, res) => {
  try {
    // Get playlist id from parameters
    const { playlistId } = req.params;

    // Remove playlist from database
    const deletedPlayList = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Playlist deleted successfully',
      deletedPlayList,
    });
  } catch (error) {
    console.error('Error in deletePlaylist controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL Play LIST DETAILS
const getAllListDetails = async (req, res) => {
  try {
    // Get user id from request
    const userId = req.user.id;

    // Fetch all playlists for the user
    const playlists = await db.playlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Playlists fetched successfully',
      playlists,
    });
  } catch (error) {
    console.error('Error in getAllListDetails controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET PLAYLIST DETAILS
const getPlayListDetails = async (req, res) => {
  try {
    // Get playlist id from params
    const { playlistId } = req.params;

    // Fetch playlist from database
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    // If no playlist found, return error
    if (!playlist) {
      return res.status(404).json({
        success: false,
        error: 'Playlist not found',
      });
    }

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Playlist fetched successfully',
      playlist,
    });
  } catch (error) {
    console.error('Error in getPlayListDetails controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR ADD PROBLEM TO PLAYLIST
const addProblemToPlaylist = async (req, res) => {
  try {
    // Get playlist id from parameters
    const { playlistId } = req.params;

    // Get problem id from body
    const { problemIds } = req.body;

    // Check if problem ids is an array and not empty
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing problem ids',
      });
    }

    // Add problems to playlist in database
    const problemsInPlaylist = await db.ProblemInPlaylist.createMany({
      data: problemIds.map(problemId => ({
        playlistId,
        problemId,
      })),
    });

    // Send success response to user
    res.status(201).json({
      success: true,
      message: 'Problem added to playlist successfully',
      problemsInPlaylist,
    });
  } catch (error) {
    console.error('Error in addProblemToPlaylist controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR REMOVE PROBLEM FROM PLAYLIST
const removeProblemFromPlaylist = async (req, res) => {
  try {
    // Get playlist id from parameters
    const { playlistId } = req.params;

    // GEt problemids from body
    const { problemIds } = req.body;

    // Check if problem ids is an array and not empty
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing problemsId' });
    }

    // Remove problems from playlist in database
    const deleteProblem = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    // Send success response to user
    res.status(200).json({
      success: true,
      message: 'Problem removed from playlist successfully',
      deleteProblem,
    })
  } catch (error) {
    console.error(
      'Error in removeProblemFromPlaylist controller:',
      error.message
    );
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// EXPORTING CONTROLLERS
export {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
};
