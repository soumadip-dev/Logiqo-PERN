import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

// Zod validation schema
const signUpSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .regex(/^[A-Za-z\s]+$/, 'Name should contain only letters and spaces'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/^(?=.*\d)/, 'Password must contain at least one number')
    .regex(
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
      'Password must contain at least one special character'
    ),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      await signup(data);
      console.log('SignUp data:', data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
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

      {/* Sign Up Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 p-8 sm:p-10"
      >
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <Link
              to="/"
              className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
            >
              <img src="/logo.png" alt="Logiqo Logo" className="w-full h-full object-contain" />
            </Link>
          </div>
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2"
          >
            Logiqo
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
          <p className="text-slate-400">Join us and start your coding journey today</p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 pl-12 border-2 border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none transition-colors bg-slate-900/50 text-white placeholder-slate-500"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                >
                  <span>•</span>
                  <span>{errors.name.message}</span>
                </motion.span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 pl-12 border-2 border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none transition-colors bg-slate-900/50 text-white placeholder-slate-500"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                >
                  <span>•</span>
                  <span>{errors.email.message}</span>
                </motion.span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none transition-colors bg-slate-900/50 text-white placeholder-slate-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center space-x-1"
                >
                  <span>•</span>
                  <span>{errors.password.message}</span>
                </motion.span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSigningUp}
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningUp ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
