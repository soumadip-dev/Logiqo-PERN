// IMPORTING MODULES
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';

// APP COMPONENT
const App = () => {
  // Simulated auth state (replace with real auth logic)
  let authUser = null;

  return (
    <div className="flex flex-col  justify-start">
      <Routes>
        {/* HOME ROUTE - REQUIRES AUTHENTICATION */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={'/login'} />}
        />

        {/* LOGIN ROUTE - REDIRECT IF ALREADY LOGGED IN */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={'/'} />}
        />

        {/* SIGNUP ROUTE - REDIRECT IF ALREADY LOGGED IN */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />}
        />
      </Routes>
    </div>
  );
};

// EXPORTING APP COMPONENT
export default App;
