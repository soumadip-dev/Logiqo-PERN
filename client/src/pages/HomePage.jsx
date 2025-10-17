import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useProblemStore } from '../store/useProblemStore';
import { Loader } from 'lucide-react';

const HomePage = () => {
  const { allProblems: problems, isLoadingAllProblems, fetchAllProblems } = useProblemStore();

  useEffect(() => {
    fetchAllProblems();
  }, [fetchAllProblems]);

  if (isLoadingAllProblems) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
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
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
      <Navbar />
      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold z-10 text-center text-amber-50">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Logiqo
              </span>
            </h1>
            <p className="mt-4 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10">
              <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent font-semibold">
                Logiqo
              </span>
              is a platform for sharing and solving coding problems. Join our community of
              developers and enhance your problem-solving skills.
            </p>
            {problems && problems.length > 0 ? (
              problems.map(problem => (
                <h1 key={problem.id} className="text-lg font-semibold text-red-500">
                  {problem.title}
                </h1>
              ))
            ) : (
              <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
                No problems found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
