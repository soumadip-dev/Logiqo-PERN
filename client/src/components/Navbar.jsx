import { User, Code, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <nav>
      <div>
        {/* Logo Section */}
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
          <span>Logiqo</span>
        </Link>

        {/* User Profile and Dropdown */}
        <div>
          <div>
            <label tabIndex={0}>
              <div>
                <img
                  src={authUser?.image || 'https://avatar.iran.liara.run/public/boy'}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul tabIndex={0}>
              {/* User Info */}
              <li>
                <p>{authUser?.name}</p>
                <hr />
              </li>
              {/* Profile Link */}
              <li>
                <Link to="/profile">
                  <User />
                  My Profile
                </Link>
              </li>
              {/* Admin Option */}
              {authUser?.role === 'ADMIN' && (
                <li>
                  <Link to="/add-problem">
                    <Code />
                    Add Problem
                  </Link>
                </li>
              )}
              {/* Logout */}
              <li>
                <LogoutButton>
                  <LogOut />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
