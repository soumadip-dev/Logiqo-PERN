import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useProblemStore } from '../store/useProblemStore';
import { Loader } from 'lucide-react';
import ProblemsTable from '../components/ProblemsTable';

const HomePage = () => {
  const { allProblems: problems, isLoadingAllProblems, fetchAllProblems } = useProblemStore();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to refresh problems list
  const refreshProblems = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    fetchAllProblems();
  }, [fetchAllProblems, refreshTrigger]); // Add refreshTrigger as dependency

  if (isLoadingAllProblems) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen bg-slate-950 text-white"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="w-10 h-10" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <Navbar />

      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl font-extrabold z-10 text-center text-amber-50"
            >
              Welcome to{' '}
              <motion.span
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: '100% 50%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Logiqo
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10"
            >
              <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent font-semibold">
                Logiqo{' '}
              </span>
              is a platform for solving coding problems. Join our community of developers and
              enhance your problem-solving skills.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {problems && problems.length > 0 ? (
                <ProblemsTable problems={problems} onProblemDeleted={refreshProblems} />
              ) : (
                <motion.p
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed"
                >
                  No problems found
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
