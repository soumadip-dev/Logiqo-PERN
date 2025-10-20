import { Bookmark, Plus, TrashIcon } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useActionStore } from '../store/useActionStore';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddToPlaylistModal from './AddToPlaylistModal';
import CreatePlaylistModal from './CreatePlaylistModal';
import { usePlaylistStore } from '../store/usePlaylistStore';

const ProblemsTable = ({ problems, onProblemDeleted }) => {
  const { authUser } = useAuthStore();
  const { isDeletingProblem, deleteProblem } = useActionStore();
  const { createPlaylist } = usePlaylistStore();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('ALL');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    problemId: null,
    problemTitle: '',
  });
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, difficulty, selectedTag]);

  // Define allowed difficulty levels
  const difficulties = ['EASY', 'MEDIUM', 'HARD'];

  // Extract all unique tags from problems and memoize the result
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach(problem => {
      problem.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [problems]);

  // Filter problems based on search text, difficulty, and selected tag
  const filteredProblems = useMemo(() => {
    const problemsArray = Array.isArray(problems) ? problems : [];
    return problemsArray.filter(problem => {
      const matchesSearch =
        search === '' || problem.title?.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === 'ALL' || problem.difficulty === difficulty;
      const matchesTag = selectedTag === 'ALL' || problem.tags?.includes(selectedTag);
      return matchesSearch && matchesDifficulty && matchesTag;
    });
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage) || 1;

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return filteredProblems.slice(startIndex, endIndex);
  }, [filteredProblems, currentPage]);

  // Handle filter changes
  const handleDifficultyChange = e => {
    setDifficulty(e.target.value);
  };

  const handleTagChange = e => {
    setSelectedTag(e.target.value);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleCreatePlaylist = async data => {
    await createPlaylist(data);
  };

  const handleAddToPlaylist = problemId => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  // Open delete confirmation modal
  const handleOpenDeleteModal = (problemId, problemTitle) => {
    setDeleteModal({
      isOpen: true,
      problemId,
      problemTitle,
    });
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      problemId: null,
      problemTitle: '',
    });
  };

  // Handle delete problem confirmation
  const handleConfirmDelete = async () => {
    if (!deleteModal.problemId) return;

    try {
      await deleteProblem(deleteModal.problemId);
      handleCloseDeleteModal();

      // Call the parent component's refresh function
      if (onProblemDeleted) {
        onProblemDeleted();
      }
    } catch (error) {
      // Error is already handled in the store with toast notification
      console.error('Failed to delete problem:', error);
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <div className="p-6 mt-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
              Coding Problems
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-violet-500/25 active:scale-95 group"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="size-5" />
            Create Playlist
          </button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={handleSearchChange}
                className="w-full px-4 py-2.5 bg-white/5 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 pl-11 transition-all duration-200"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="px-4 py-2.5 bg-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 cursor-pointer"
          >
            <option value="ALL" className="bg-gray-800 text-white">
              All Difficulties
            </option>
            {difficulties.map(diff => (
              <option key={diff} value={diff} className="bg-gray-800 text-white">
                {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            value={selectedTag}
            onChange={handleTagChange}
            className="px-4 py-2.5 bg-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 cursor-pointer"
          >
            <option value="ALL" className="bg-gray-800 text-white">
              All Tags
            </option>
            {allTags.map(tag => (
              <option key={tag} value={tag} className="bg-gray-800 text-white">
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl bg-white/2.5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {paginatedProblems.length > 0 ? (
                  paginatedProblems.map(problem => {
                    const isSolved =
                      problem.solvedBy?.some(user => user.userId === authUser?.id) || false;
                    return (
                      <tr key={problem.id} className="group">
                        <td className="pl-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`relative inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                                isSolved ? 'border-green-500 bg-green-500/20' : 'border-gray-400/30'
                              } transition-all duration-200 group-hover:scale-110`}
                            >
                              {isSolved && (
                                <svg
                                  className="w-3 h-3 text-green-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <Link
                            to={`/app/problem/${problem.id}`}
                            className=" pl-5 text-white hover:text-violet-300 font-medium transition-colors duration-200 inline-block w-full text-left"
                          >
                            {problem.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {(problem.tags || []).slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-violet-500/20 text-violet-300 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                              >
                                {tag}
                              </span>
                            ))}
                            {(problem.tags || []).length > 2 && (
                              <span className="px-2.5 py-1 bg-white/10 text-gray-400 rounded-lg text-xs font-medium">
                                +{(problem.tags || []).length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                              problem.difficulty === 'EASY'
                                ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                : problem.difficulty === 'MEDIUM'
                                ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30'
                                : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {authUser?.role === 'ADMIN' && (
                              <div className="flex items-center gap-1 mr-2">
                                <button
                                  onClick={() => handleOpenDeleteModal(problem.id, problem.title)}
                                  disabled={isDeletingProblem}
                                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <TrashIcon className="size-4" />
                                </button>
                              </div>
                            )}
                            <button
                              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition-all duration-200 active:scale-95 group/btn"
                              onClick={() => handleAddToPlaylist(problem.id)}
                            >
                              <Bookmark className="size-4" />
                              <span className="text-sm font-medium">Save to Playlist</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg
                          className="w-16 h-16 mb-4 opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-lg font-medium mb-1">No problems found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        {filteredProblems.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6">
            <div className="text-sm text-gray-400">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProblems.length)} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of{' '}
              {filteredProblems.length} problems
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-2 text-gray-400">...</span>}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeletingProblem}
        title={`Are you sure you want to delete "${deleteModal.problemTitle}"?`}
      />
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </>
  );
};

export default ProblemsTable;
