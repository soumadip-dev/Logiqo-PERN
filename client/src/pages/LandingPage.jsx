import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Rocket,
  Zap,
  Target,
  Award,
  ArrowRight,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  CheckCircle2,
  Users,
  BarChart3,
  Shield,
  Play,
  Code2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const LandingPage = () => {
  const { authUser } = useAuthStore();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (authUser) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-12, 12, -12],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Live Code Editor',
      description: 'Practice with instant feedback across multiple programming languages',
      color: 'from-blue-500 to-cyan-600',
      gradient: 'group-hover:from-blue-400 group-hover:to-cyan-500',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Interview Prep',
      description: 'Master patterns asked by top tech companies like FAANG',
      color: 'from-orange-500 to-amber-600',
      gradient: 'group-hover:from-orange-400 group-hover:to-amber-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Structured Path',
      description: 'Follow curated learning paths from beginner to expert level',
      color: 'from-indigo-500 to-blue-600',
      gradient: 'group-hover:from-indigo-400 group-hover:to-blue-500',
    },
  ];

  const stats = [
    { value: '850+', label: 'DSA Problems', icon: <Target className="w-5 h-5" /> },
    { value: '60+', label: 'Topics', icon: <Zap className="w-5 h-5" /> },
    { value: '32k+', label: 'Learners', icon: <Sparkles className="w-5 h-5" /> },
    { value: '99%', label: 'Success', icon: <Award className="w-5 h-5" /> },
  ];

  const benefits = [
    'Master all major data structures and algorithms',
    'Learn optimal time and space complexity analysis',
    'Prepare for interviews at FAANG and top startups',
    'Get personalized learning paths based on goals',
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer @ Google',
      content:
        'Exploring the Logiqo platform was a great experience. Its adaptive challenges and personalised roadmap make learning efficient and enjoyable for all skill levels.',
      image: '👩‍💻',
    },
    {
      name: 'Raj Kumar',
      role: 'SDE @ Amazon',
      content:
        'Logiqo stands out for its structured learning path and real-world coding challenges. It pushes you to think deeply and sharpen your problem-solving skills.',
      image: '👨‍💼',
    },
    {
      name: 'Emily Zhang',
      role: 'ML Engineer @ Meta',
      content:
        'Thanks to Logiqo, I improved my technical foundation and landed a full-time role. The platform truly supports growth and career advancement.',
      image: '👩‍🔬',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
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
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 py-4 backdrop-blur-sm border-b border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
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
          
          {authUser ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-violet-500/50 hover:ring-violet-400 transition-all shadow-lg shadow-violet-500/25"
            >
              <img
                src={authUser.image}
                alt={authUser.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25"
            >
              Get Started
            </motion.button>
          )}
        </div>
      </motion.header>
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/30 text-violet-300 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
          >
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Now with AI-powered learning paths</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent mb-2">
              Master DSA,
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ace Interviews
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Your personalized journey to becoming a data structures and algorithms expert. Built for
            developers who want to level up.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 60px -10px rgba(139, 92, 246, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center space-x-3 shadow-2xl shadow-violet-500/30"
            >
              <span>Start Free Trial</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-4 rounded-full border border-slate-700 text-slate-300 hover:text-white font-medium backdrop-blur-sm transition-all flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map(stat => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-slate-800/60 transition-all group"
              >
                <div className="flex items-center justify-center mb-3 text-violet-400 group-hover:text-violet-300 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-wider">
              Features
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Succeed
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powerful tools and resources designed to accelerate your DSA learning journey
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(feature => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 hover:bg-slate-800/70 transition-all h-full">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-5 shadow-lg ${feature.gradient} transition-all`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
              Why Logiqo?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Learn Smarter,{' '}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Not Harder
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Our platform combines AI-powered personalization with expertly crafted content to give
              you the most effective learning experience.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-3 group"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-300 text-lg group-hover:text-white transition-colors">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
                  <span className="text-slate-400 text-sm">Problem of the Day</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                    Medium
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white">Two Sum Problem</h4>
                <p className="text-slate-400 text-sm">
                  Given an array of integers, return indices of two numbers that add up to a
                  target...
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-slate-400">82% Solved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-slate-400">+50 XP</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white py-3 rounded-xl font-medium mt-4 shadow-lg shadow-violet-500/30"
                >
                  Solve Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-16">
          <span className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Developers
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 mt-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Logiqo"
                    className="w-full h-full object-contain"
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML =
                        '<div class="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div>';
                    }}
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Logiqo
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Master DSA, ace interviews, and transform your tech career.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-violet-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800">
            <div className="text-slate-500 text-sm mb-4 md:mb-0">
              © 2025 Logiqo. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
                className="text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;