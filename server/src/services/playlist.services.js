import { db } from '../config/db.config.js';

//* Service to create a playlist
async function createPlaylistService(userId, name, description) {
  // Check if user ID and playlist name are provided
  if (!userId || !name) throw new Error('User ID and playlist name are required');

  // Create a new playlist
  const playlist = await db.Playlist.create({
    data: { name, description, userId },
  });

  // Return the created playlist
  return playlist;
}

//* Service to delete a playlist
async function deletePlaylistService(playlistId) {
  // Check if playlist ID is provided
  if (!playlistId) throw new Error('Playlist ID is required');

  // Delete the playlist from the database
  const deletedPlayList = await db.Playlist.delete({
    where: { id: playlistId },
  });

  // Return the deleted playlist
  return deletedPlayList;
}

//* Service to fetch all playlists for a user
async function getAllPlaylistsService(userId) {
  // Check if user ID is provided
  if (!userId) throw new Error('User ID is required');

  // Fetch playlists for the user from the database
  const playlists = await db.Playlist.findMany({
    where: { userId },
    include: {
      problems: {
        include: { problem: true },
      },
    },
  });

  // Return the playlists
  return playlists;
}
