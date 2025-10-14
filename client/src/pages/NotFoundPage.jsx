import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Compass, AlertCircle, Sparkles, Rocket } from 'lucide-react';

const NotFoundPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const glitchVariants = {
    animate: {
      x: [-2, 2, -2, 2, 0],
      textShadow: [
        '2px 2px 0 rgba(139, 92, 246, 0.7), -2px -2px 0 rgba(59, 130, 246, 0.7)',
        '-2px -2px 0 rgba(139, 92, 246, 0.7), 2px 2px 0 rgba(59, 130, 246, 0.7)',
        '2px -2px 0 rgba(139, 92, 246, 0.7), -2px 2px 0 rgba(59, 130, 246, 0.7)',
        '0 0 0 rgba(139, 92, 246, 0.7), 0 0 0 rgba(59, 130, 246, 0.7)',
      ],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6 overflow-hidden relative">
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

      {/* Interactive Gradient Orb that follows mouse */}
      <motion.div
        animate={{
          x: mousePosition.x - window.innerWidth / 2,
          y: mousePosition.y - window.innerHeight / 2,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="fixed w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
        style={{ left: '50%', top: '50%' }}
      />

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
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -100, -200],
            x: Math.sin(i) * 100,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="fixed w-1 h-1 bg-violet-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
          }}
        />
      ))}

      {/* Logo in top left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 left-6 flex items-center space-x-3 z-20"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src="/logo.png"
            alt="Logiqo Logo"
            className="w-full h-full object-contain"
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML =
                '<div class="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>';
            }}
          />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Logiqo
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Floating 404 Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full blur-2xl opacity-30"
            />
            <div className="relative w-32 h-32 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-violet-400" />
            </div>
          </div>
        </motion.div>

        {/* 404 Text with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <motion.h1
            variants={glitchVariants}
            animate="animate"
            className="text-[150px] md:text-[200px] font-black leading-none bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: 'monospace' }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/30 text-violet-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
        >
          <Compass className="w-5 h-5" />
          <span className="font-medium">Page Not Found</span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! You've ventured into{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              uncharted territory
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have gone on its own learning journey. Let's get
            you back on track!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="/"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 60px -10px rgba(139, 92, 246, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-3 shadow-2xl shadow-violet-500/30"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.a>

          <motion.a
            href="/login"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 rounded-full border border-slate-700 text-slate-300 hover:text-white font-medium backdrop-blur-sm transition-all flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </motion.a>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-500 text-sm mt-8"
        >
          Error code: 404 | If you believe this is a mistake, please{' '}
          <a href="/contact" className="text-violet-400 hover:text-violet-300 transition-colors">
            contact support
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default NotFoundPage;
