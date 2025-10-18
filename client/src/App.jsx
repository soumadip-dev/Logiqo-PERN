import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddProblem from './pages/AddProblem';
import ProblemPage from './pages/ProblemPage';
// import Layout from './Layout/Layout';
import NotFoundPage from './pages/NotFoundPage';
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start">
      <Toaster />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/app" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/app" />} />

        {/* Protected Routes under /app */}
        <Route path="/app" element={!authUser && <Navigate to="/login" />}>
          <Route index element={<HomePage />} />
          <Route
            path="problem/:id"
            element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
          />
          <Route
            path="add-problem"
            element={authUser?.role === 'ADMIN' ? <AddProblem /> : <Navigate to="/app" />}
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
