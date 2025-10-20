import { useEffect, useState } from 'react';
import { useSubmissionStore } from '../store/useSubmissionStore';
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusClass = status => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Wrong Answer':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Time Limit Exceeded':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const formatDate = dateString => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const toggleExpand = id => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
    }
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filter === 'all') return true;
    return submission.status === filter;
  });

  // Safe JSON parsing helper
  const safeJsonParse = (str, defaultValue = 'N/A') => {
    try {
      if (!str) return defaultValue;
      return JSON.parse(str);
    } catch (error) {
      return str || defaultValue;
    }
  };

  // Format performance data safely
  const formatPerformanceData = (data, isArray = false) => {
    if (!data) return 'N/A';

    try {
      const parsed = safeJsonParse(data);
      if (isArray && Array.isArray(parsed)) {
        return parsed[0] || parsed || 'N/A';
      }
      return parsed || 'N/A';
    } catch (error) {
      return data || 'N/A';
    }
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            My Submissions
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-stretch sm:items-center">
            {/* Stats Counters */}
            <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
              <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-600/30 min-w-[80px] sm:min-w-[100px] text-center h-[44px] sm:h-[54px] flex items-center justify-center gap-1 sm:gap-2">
                <div className="text-slate-400 text-xs sm:text-sm">Total:</div>
                <div className="text-white text-base sm:text-lg font-semibold">
                  {submissions.length}
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-600/30 min-w-[80px] sm:min-w-[100px] text-center h-[44px] sm:h-[54px] flex items-center justify-center gap-1 sm:gap-2">
                <div className="text-slate-400 text-xs sm:text-sm">Accepted:</div>
                <div className="text-green-400 text-base sm:text-lg font-semibold">
                  {submissions.filter(s => s.status === 'Accepted').length}
                </div>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative order-2 sm:order-1 w-full sm:w-40 lg:w-48">
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-700/50 border border-slate-600/30 rounded-lg sm:rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200 cursor-pointer appearance-none pr-8 sm:pr-10 text-sm sm:text-base"
              >
                <option value="all" className="bg-slate-800 text-white">
                  All Submissions
                </option>
                <option value="Accepted" className="bg-slate-800 text-white">
                  Accepted
                </option>
                <option value="Wrong Answer" className="bg-slate-800 text-white">
                  Wrong Answer
                </option>
                <option value="Time Limit Exceeded" className="bg-slate-800 text-white">
                  Time Limit Exceeded
                </option>
              </select>
              <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
                <Filter size={14} className="sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredSubmissions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 p-4 sm:p-6 lg:p-8 text-center"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                No submissions found
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                You haven&apos;t submitted any solutions yet, or none match your current filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 sm:space-y-6"
            >
              {filteredSubmissions.map((submission, index) => (
                <motion.div
                  key={submission.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-500/50"
                >
                  <div
                    className="p-4 sm:p-6 cursor-pointer hover:bg-slate-700/20 transition-all duration-200"
                    onClick={() => toggleExpand(submission.id)}
                  >
                    {/* Submission Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 w-full">
                        <div
                          className={`inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${getStatusClass(
                            submission.status
                          )}`}
                        >
                          {submission.status === 'Accepted' && (
                            <Check size={12} className="sm:w-3 sm:h-3 mr-1" />
                          )}
                          {submission.status || 'Unknown'}
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                          <Code size={14} className="sm:w-4 sm:h-4" />
                          <span className="font-medium text-sm sm:text-base">
                            {submission.language || 'Unknown'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                          <Clock size={14} className="sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">
                            Submitted {formatDate(submission.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        {expandedSubmission === submission.id ? (
                          <ChevronUp size={18} className="sm:w-5 sm:h-5 text-slate-400" />
                        ) : (
                          <ChevronDown size={18} className="sm:w-5 sm:h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedSubmission === submission.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-600/40 overflow-hidden"
                      >
                        {/* Code Section */}
                        <div className="p-4 sm:p-6">
                          <h3 className="font-bold text-base sm:text-lg text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                            <Code size={16} className="sm:w-4 sm:h-4" />
                            Solution Code
                          </h3>
                          <div className="bg-slate-900 rounded-lg sm:rounded-xl border border-slate-600/30 overflow-hidden">
                            <pre className="p-3 sm:p-4 text-slate-200 overflow-x-auto text-xs sm:text-sm">
                              <code>{submission.sourceCode || 'No code available'}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Input/Output Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 border-t border-slate-600/40">
                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                              <Terminal size={16} className="sm:w-4 sm:h-4" />
                              Input
                            </h3>
                            <div className="bg-slate-900 rounded-lg sm:rounded-xl border border-slate-600/30 overflow-hidden">
                              <pre className="p-3 sm:p-4 text-slate-200 overflow-x-auto text-xs sm:text-sm">
                                <code>{submission.stdin || 'No input provided'}</code>
                              </pre>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-white mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
                              <Terminal size={16} className="sm:w-4 sm:h-4" />
                              Output
                            </h3>
                            <div className="bg-slate-900 rounded-lg sm:rounded-xl border border-slate-600/30 overflow-hidden">
                              <pre className="p-3 sm:p-4 text-slate-200 overflow-x-auto text-xs sm:text-sm">
                                <code>
                                  {(() => {
                                    const output = safeJsonParse(submission.stdout);
                                    if (Array.isArray(output)) {
                                      return output.join('') || 'No output';
                                    }
                                    return output || 'No output';
                                  })()}
                                </code>
                              </pre>
                            </div>
                          </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 border-t border-slate-600/40">
                          <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-md sm:rounded-lg">
                                <Clock size={16} className="sm:w-5 sm:h-5 text-blue-400" />
                              </div>
                              <div>
                                <div className="text-slate-400 text-xs sm:text-sm">
                                  Execution Time
                                </div>
                                <div className="text-white font-semibold text-sm sm:text-base">
                                  {formatPerformanceData(submission.time, true)}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-md sm:rounded-lg">
                                <HardDrive size={16} className="sm:w-5 sm:h-5 text-green-400" />
                              </div>
                              <div>
                                <div className="text-slate-400 text-xs sm:text-sm">Memory Used</div>
                                <div className="text-white font-semibold text-sm sm:text-base">
                                  {formatPerformanceData(submission.memory, true)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileSubmission;
