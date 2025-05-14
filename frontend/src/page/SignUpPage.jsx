// IMPORTING MODULES
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, HelpCircle, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import logo from '../assets/logo.png';
import AuthImagePattern from '../components/AuthImagePattern';

// DEFINING VALIDATION SCHEMA USING ZOD
const signUpSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      'Password must contain at least one letter and one number'
    ),
  name: z.string().min(3, 'Name must be at least 3 characters'),
});

// SIGNUP PAGE COMPONENT
const SignUpPage = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook form setup with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gray-900">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
          <div className="absolute top-3/4 left-3/4 w-40 h-40 rounded-full bg-purple-600 blur-3xl"></div>
        </div>

        <div className="w-full max-w-md space-y-8 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700 hover:shadow-primary/10 transition-all duration-500 relative z-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 overflow-hidden shadow-lg border border-gray-700 hover:rotate-6 hover:scale-105">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain filter transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent tracking-tight">
                Welcome
              </h1>
              <p className="text-gray-400 text-sm">
                Create your account to get started
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="form-control space-y-1.5">
              <label className="label">
                <span className="label-text font-medium text-gray-300 tracking-wide">
                  Name
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-primary">
                  <User className="h-5 w-5 text-gray-500 group-focus-within:text-primary" />
                </div>
                <input
                  type="text"
                  {...register('name')}
                  className={`input w-full pl-10 bg-gray-700/80 border-gray-600 text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'hover:border-gray-500'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fadeIn">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control space-y-1.5">
              <label className="label">
                <span className="label-text font-medium text-gray-300 tracking-wide">
                  Email
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-primary" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  className={`input w-full pl-10 bg-gray-700/80 border-gray-600 text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'hover:border-gray-500'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fadeIn">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control space-y-1.5">
              <label className="label">
                <span className="label-text font-medium text-gray-300 tracking-wide">
                  Password
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-primary" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`input w-full pl-10 bg-gray-700/80 border-gray-600 text-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-500 transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'hover:border-gray-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center transition-all duration-300 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-primary" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-primary" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1 animate-fadeIn">
                  <HelpCircle className="h-3.5 w-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-none transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-2 focus:ring-primary/50 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={'Welcome to our platform!'}
        subtitle={
          'Sign up to access our platform and start using our services.'
        }
      />
    </div>
  );
};

// EXPORTING SIGNUP COMPONENT
export default SignUpPage;
