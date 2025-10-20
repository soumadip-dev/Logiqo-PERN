import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import ProfileSubmission from '../components/ProfileSubmission';
import ProblemSolvedByUser from '../components/ProblemSolvedByUser';
import PlaylistProfile from '../components/PlaylistProfile';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { authUser } = useAuthStore();

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
          className="absolute -top-40 -right-40 w-64 h-64 md:w-96 md:h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 pt-4 sm:pt-6 lg:pt-8 px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header with back button */}
        <div className="flex flex-row justify-between items-center w-full mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to={'/app'}
              className="p-1.5 sm:p-2 hover:bg-slate-600/50 rounded-lg sm:rounded-xl transition-all duration-200 text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              Profile
            </motion.h1>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-600/30 overflow-hidden"
          >
            <div className="p-4 sm:p-6 md:p-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 p-0.5 sm:p-1">
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                      {authUser.image ? (
                        <img
                          src={authUser?.image || 'https://avatar.iran.liara.run/public/boy'}
                          alt={authUser.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                          {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="text-center sm:text-left mt-2 sm:mt-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white break-words">
                    {authUser.name}
                  </h2>
                </div>
              </div>

              <div className="border-t border-slate-600/40 my-4 sm:my-6"></div>

              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Email */}
                <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-md sm:rounded-lg">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="text-blue-400 font-medium text-sm sm:text-base">Email</div>
                  </div>
                  <div className="text-white text-xs sm:text-sm break-all pl-9 sm:pl-11">
                    {authUser.email}
                  </div>
                </div>

                {/* User ID */}
                <div className="bg-slate-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-600/30">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-md sm:rounded-lg">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    </div>
                    <div className="text-green-400 font-medium text-sm sm:text-base">User ID</div>
                  </div>
                  <div className="text-white text-xs sm:text-sm break-all pl-9 sm:pl-11">
                    {authUser.id}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8">
          <ProfileSubmission />
          <ProblemSolvedByUser />
          <PlaylistProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
