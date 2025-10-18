import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory, Calendar } from 'lucide-react';

const SubmissionsList = ({ submissions, isLoading }) => {
  // Helper function to safely parse JSON strings
  const safeParse = data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return []; // Return empty array instead of nothing
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = memoryData => {
    if (!memoryData) return 0; // Handle null/undefined
    const memoryArray = safeParse(memoryData)
      .map(m => parseFloat(m.split(' ')[0]))
      .filter(m => !isNaN(m)); // Filter out NaN values
    if (memoryArray.length === 0) return 0;
    return memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length;
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = timeData => {
    if (!timeData) return 0; // Handle null/undefined
    const timeArray = safeParse(timeData)
      .map(t => parseFloat(t.split(' ')[0]))
      .filter(t => !isNaN(t)); // Filter out NaN values
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="text-slate-500">No submissions yet</div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission, index) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 rounded-2xl shadow-lg transition-all duration-300 border border-slate-700/50 backdrop-blur-sm p-6"
          >
            <div className="p-0">
              <div className="flex items-center justify-between">
                {/* Left Section: Status and Language */}
                <div className="flex items-center gap-4">
                  {submission.status === 'Accepted' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-semibold">Accepted</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <XCircle className="w-6 h-6" />
                      <span className="font-semibold">{submission.status}</span>
                    </motion.div>
                  )}
                  <div className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-sm font-medium border border-slate-600/50">
                    {submission.language}
                  </div>
                </div>

                {/* Right Section: Runtime, Memory, and Date */}
                <div className="flex items-center gap-6 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-slate-300 font-medium">{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Memory className="w-4 h-4" />
                    <span className="text-slate-300 font-medium">{avgMemory.toFixed(0)} KB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-slate-300 font-medium">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;
