import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start">
      <Routes>
        {/* Landing page as the root route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected home route */}
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

        {/* Auth routes - redirect to home if already authenticated */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />

        {/* 404 Not Found route - catches all undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
