import React, { useEffect, useState } from 'react';
import { usePlaylistStore } from '../store/usePlaylistStore';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const PlaylistProfile = () => {
  const { getAllPlaylists, playlists, deletePlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    playlistId: null,
    playlistName: '',
    isDeleting: false,
  });

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = id => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({
      isOpen: true,
      playlistId: id,
      playlistName: name,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    try {
      await deletePlaylist(deleteModal.playlistId);
      setDeleteModal({
        isOpen: false,
        playlistId: null,
        playlistName: '',
        isDeleting: false,
      });
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteClose = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({
        isOpen: false,
        playlistId: null,
        playlistName: '',
        isDeleting: false,
      });
    }
  };

  const getDifficultyBadge = difficulty => {
    switch (difficulty) {
      case 'EASY':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
            Easy
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            Medium
          </span>
        );
      case 'HARD':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
            Hard
          </span>
        );
      default:
        return <span className="badge">Unknown</span>;
    }
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4 sm:mb-0">
            My Playlists
          </h2>
        </motion.div>

        <AnimatePresence>
          {playlists.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 p-4 sm:p-6 lg:p-8 text-center"
            >
              <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-slate-700/50 rounded-full">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Currently don't have any playlists
                </h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-md">
                  You haven't created any playlists yet. Create one to organize your coding
                  problems!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-500/50"
                >
                  <div className="p-4 sm:p-6">
                    {/* Playlist Header */}
                    <div
                      className="flex justify-between items-start sm:items-center cursor-pointer gap-3 sm:gap-4"
                      onClick={() => togglePlaylist(playlist.id)}
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg sm:rounded-xl flex-shrink-0">
                          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                            {playlist.name}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <List size={12} className="sm:w-3 sm:h-3" />
                              <span>{playlist.problems.length} problems</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="sm:w-3 sm:h-3" />
                              <span>Created {formatDate(playlist.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="p-1.5 sm:p-2 hover:bg-slate-600/50 rounded-lg sm:rounded-xl transition-all duration-200 text-slate-400 hover:text-white flex-shrink-0 mt-1 sm:mt-0">
                        {expandedPlaylist === playlist.id ? (
                          <ChevronUp size={18} className="sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>

                    {/* Description */}
                    {playlist.description && (
                      <p className="text-slate-400 text-sm mt-3 pl-11 sm:pl-16 break-words">
                        {playlist.description}
                      </p>
                    )}

                    {/* Expanded Problems List */}
                    <AnimatePresence>
                      {expandedPlaylist === playlist.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-600/40"
                        >
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                            Problems in this playlist
                          </h4>

                          {playlist.problems.length === 0 ? (
                            <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-slate-600/30">
                              <span className="text-slate-400 text-sm sm:text-base">
                                No problems added to this playlist yet.
                              </span>
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[500px]">
                                <thead>
                                  <tr className="border-b border-slate-600/40">
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-slate-300 font-semibold text-xs sm:text-sm">
                                      Problem
                                    </th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-slate-300 font-semibold text-xs sm:text-sm">
                                      Difficulty
                                    </th>
                                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-slate-300 font-semibold text-xs sm:text-sm">
                                      Tags
                                    </th>
                                    <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-slate-300 font-semibold text-xs sm:text-sm">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {playlist.problems.map((item, idx) => (
                                    <tr
                                      key={item.id}
                                      className="border-b border-slate-600/20 last:border-b-0 hover:bg-slate-700/20 transition-colors duration-200"
                                    >
                                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-white font-medium text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                                        {item.problem.title}
                                      </td>
                                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                                        {getDifficultyBadge(item.problem.difficulty)}
                                      </td>
                                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                                        <div className="flex flex-wrap gap-1">
                                          {item.problem.tags &&
                                            item.problem.tags.slice(0, 2).map((tag, tagIdx) => (
                                              <div
                                                key={tagIdx}
                                                className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                              >
                                                <Tag
                                                  size={8}
                                                  className="sm:w-2 sm:h-2 mr-0.5 sm:mr-1"
                                                />
                                                {tag}
                                              </div>
                                            ))}
                                          {item.problem.tags && item.problem.tags.length > 2 && (
                                            <div className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md sm:rounded-lg text-xs font-medium bg-slate-600/50 text-slate-400">
                                              +{item.problem.tags.length - 2}
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                                        <Link
                                          to={`/app/problem/${item.problem.id}`}
                                          className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-violet-500 text-violet-300 rounded-lg sm:rounded-xl hover:bg-violet-500/20 transition-all duration-200 text-xs sm:text-sm font-medium"
                                        >
                                          <ExternalLink size={12} className="sm:w-3 sm:h-3 mr-1" />
                                          Solve
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-600/40">
                            <button
                              onClick={() => handleDeleteClick(playlist.id, playlist.name)}
                              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg sm:rounded-xl hover:bg-red-500/30 transition-all duration-200 font-medium text-xs sm:text-sm"
                            >
                              Delete Playlist
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteModal.isDeleting}
        title={`Are you sure you want to delete the playlist "${deleteModal.playlistName}"?`}
      />
    </div>
  );
};

export default PlaylistProfile;
