import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory } from 'lucide-react';

const SubmissionResults = ({ submission }) => {
  // Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || '[]');
  const timeArr = JSON.parse(submission.time || '[]');

  // Calculate averages
  const avgMemory =
    memoryArr
      .map(m => parseFloat(m)) // remove ' KB' using parseFloat
      .reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr
      .map(t => parseFloat(t)) // remove ' s' using parseFloat
      .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCases.filter(tc => tc.passed).length;
  const totalTests = submission.testCases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-700/50 backdrop-blur-sm"
        >
          <h3 className="text-sm font-medium text-slate-400">Status</h3>
          <div
            className={`text-lg font-bold ${
              submission.status === 'Accepted' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {submission.status}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-700/50 backdrop-blur-sm"
        >
          <h3 className="text-sm font-medium text-slate-400">Success Rate</h3>
          <div className="text-lg font-bold text-slate-300">{successRate.toFixed(1)}%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-700/50 backdrop-blur-sm"
        >
          <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Avg. Runtime
          </h3>
          <div className="text-lg font-bold text-slate-300">{avgTime.toFixed(3)} s</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-700/50 backdrop-blur-sm"
        >
          <h3 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Memory className="w-4 h-4" />
            Avg. Memory
          </h3>
          <div className="text-lg font-bold text-slate-300">{avgMemory.toFixed(0)} KB</div>
        </motion.div>
      </div>

      {/* Test Cases Results */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-300 mb-4">Test Cases Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-700/50">
                  <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">
                    Expected Output
                  </th>
                  <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">
                    Your Output
                  </th>
                  <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">
                    Memory
                  </th>
                  <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {submission.testCases.map((testCase, index) => (
                  <motion.tr
                    key={testCase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={testCase.passed ? 'bg-slate-800/30' : 'bg-red-500/10'}
                  >
                    <td className="border border-slate-600 px-4 py-3">
                      {testCase.passed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 text-green-400"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Passed
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 text-red-400"
                        >
                          <XCircle className="w-5 h-5" />
                          Failed
                        </motion.div>
                      )}
                    </td>
                    <td className="border border-slate-600 px-4 py-3 font-mono text-slate-300">
                      {testCase.expected}
                    </td>
                    <td className="border border-slate-600 px-4 py-3 font-mono text-slate-300">
                      {testCase.stdout || 'null'}
                    </td>
                    <td className="border border-slate-600 px-4 py-3 text-slate-300">
                      {testCase.memory}
                    </td>
                    <td className="border border-slate-600 px-4 py-3 text-slate-300">
                      {testCase.time}
                    </td>
                  </motion.tr>
                ))}
              </tbody>s
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubmissionResults;
