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
    // Your logic here
  } catch (error) {
    console.error('Error in deletePlaylist controller:', error.message);
    res.status(500).json({
      error: 'Server Error',
      success: false,
    });
  }
};

// CONTROLLER FOR GET ALL LIST DETAILS
const getAllListDetails = async (req, res) => {
  try {
    // Your logic here
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
    // Your logic here
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
    // Your logic here
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
    // Your logic here
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
