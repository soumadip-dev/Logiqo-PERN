import { db } from '../config/db.config.js';

//* Service to create a playlist
async function createPlaylistService(userId, name, description) {
  // Check if user ID and playlist name are provided
  if (!userId || !name) throw new Error('User ID and playlist name are required');

  // Create a new playlist
  const playlist = await db.playlist.create({
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
  const deletedPlayList = await db.playlist.delete({
    where: { id: playlistId },
  });

  // Return the deleted playlist
  return deletedPlayList;
}
