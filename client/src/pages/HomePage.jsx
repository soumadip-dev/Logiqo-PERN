import Navbar from '../components/Navbar';

const HomePage = () => {
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-amber-50">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Logiqo
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent font-semibold">
                Logiqo
              </span>{' '}
              is a platform for sharing and solving coding problems. Join our community of
              developers and enhance your problem-solving skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
