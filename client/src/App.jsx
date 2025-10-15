import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  let authUser = null;

  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-slate-950 text-white">
  //       <Loader className="w-10 h-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col justify-start">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
