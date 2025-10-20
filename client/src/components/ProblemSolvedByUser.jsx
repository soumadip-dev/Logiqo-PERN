import { useEffect } from 'react';
import { useProblemStore } from '../store/useProblemStore';
import { Link } from 'react-router-dom';
import { Tag, ExternalLink, AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemSolvedByUser = () => {
  const { solvedProblems, fetchSolvedProblems: getSolvedProblemByUser } = useProblemStore();
  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  // Function to get difficulty badge styling
  const getDifficultyBadge = difficulty => {
    switch (difficulty) {
      case 'EASY':
        return (
          <div className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
            <CheckCircle size={10} className="sm:w-3 sm:h-3 mr-1" />
            Easy
          </div>
        );
      case 'MEDIUM':
        return (
          <div className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            <Circle size={10} className="sm:w-3 sm:h-3 mr-1" />
            Medium
          </div>
        );
      case 'HARD':
        return (
          <div className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
            <AlertTriangle size={10} className="sm:w-3 sm:h-3 mr-1" />
            Hard
          </div>
        );
      default:
        return <div className="badge badge-ghost">Unknown</div>;
    }
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4 sm:mb-6 lg:mb-8"
        >
          Problems Solved
        </motion.h2>

        {solvedProblems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 p-4 sm:p-6 lg:p-8 text-center"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              No problems solved yet
            </h3>
            <p className="text-slate-400 text-sm sm:text-base mb-4">
              Start solving problems to see them listed here!
            </p>
            <div className="flex justify-center">
              <Link
                to="/problems"
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200 font-medium text-sm sm:text-base"
              >
                View Problems
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-600/40">
                    <th className="text-left py-3 px-4 sm:py-4 sm:px-6 text-slate-300 font-semibold bg-slate-700/30 text-sm sm:text-base">
                      Problem
                    </th>
                    <th className="text-left py-3 px-4 sm:py-4 sm:px-6 text-slate-300 font-semibold bg-slate-700/30 text-sm sm:text-base">
                      Difficulty
                    </th>
                    <th className="text-left py-3 px-4 sm:py-4 sm:px-6 text-slate-300 font-semibold bg-slate-700/30 text-sm sm:text-base">
                      Tags
                    </th>
                    <th className="text-center py-3 px-4 sm:py-4 sm:px-6 text-slate-300 font-semibold bg-slate-700/30 text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {solvedProblems.map((problem, index) => (
                    <motion.tr
                      key={problem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b border-slate-600/20 hover:bg-slate-700/20 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-white font-medium text-sm sm:text-base">
                        {problem.title}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        {getDifficultyBadge(problem.difficulty)}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {problem.tags &&
                            problem.tags.slice(0, 2).map(
                              (
                                tag,
                                index // Show only 2 tags on mobile
                              ) => (
                                <div
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-md sm:rounded-lg text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                >
                                  <Tag size={8} className="sm:w-2 sm:h-2 mr-1" />
                                  {tag}
                                </div>
                              )
                            )}
                          {problem.tags && problem.tags.length > 2 && (
                            <div className="inline-flex items-center px-2 py-1 rounded-md sm:rounded-lg text-xs font-medium bg-slate-600/50 text-slate-400">
                              +{problem.tags.length - 2}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-center">
                        <div className="flex justify-center">
                          <Link
                            to={`/app/problem/${problem.id}`}
                            className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 border border-violet-500 text-violet-300 rounded-lg sm:rounded-xl hover:bg-violet-500/20 transition-all duration-200 text-xs sm:text-sm font-medium"
                          >
                            <ExternalLink size={12} className="sm:w-3 sm:h-3 mr-1" />
                            View
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-700/30 p-3 sm:p-4 border-t border-slate-600/40">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                <span className="text-slate-300 text-xs sm:text-sm">
                  Total problems solved:{' '}
                  <span className="font-bold text-white">{solvedProblems.length}</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        {solvedProblems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8"
          >
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
              <div className="text-slate-400 text-xs sm:text-sm">Easy</div>
              <div className="text-green-400 text-xl sm:text-2xl font-bold">
                {solvedProblems.filter(p => p.difficulty === 'EASY').length}
              </div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
              <div className="text-slate-400 text-xs sm:text-sm">Medium</div>
              <div className="text-yellow-400 text-xl sm:text-2xl font-bold">
                {solvedProblems.filter(p => p.difficulty === 'MEDIUM').length}
              </div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-600/30">
              <div className="text-slate-400 text-xs sm:text-sm">Hard</div>
              <div className="text-red-400 text-xl sm:text-2xl font-bold">
                {solvedProblems.filter(p => p.difficulty === 'HARD').length}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
