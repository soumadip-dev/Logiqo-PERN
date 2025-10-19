// Navbar.js
import { User, Code, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden ">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-purple-300 transition-all duration-300">
              Logiqo
            </div>
          </Link>

          {/* User Profile and Dropdown */}
          <div className="flex items-center" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 border border-transparent hover:border-slate-600/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 p-0.5">
                  <img
                    src={authUser?.image || 'https://avatar.iran.liara.run/public/boy'}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-xl rounded-lg shadow-lg border border-slate-700/50 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 p-0.5">
                        <img
                          src={authUser?.image || 'https://avatar.iran.liara.run/public/boy'}
                          alt="User Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{authUser?.name}</p>
                        <p className="text-slate-400 text-xs">{authUser?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <Link
                    to="/app/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200"
                  >
                    <User className="w-4 h-4 text-violet-400" />
                    <span>My Profile</span>
                  </Link>

                  {/* Admin Option */}
                  {authUser?.role === 'ADMIN' && (
                    <Link
                      to="/app/add-problem"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200"
                    >
                      <Code className="w-4 h-4 text-purple-400" />
                      <span>Add Problem</span>
                    </Link>
                  )}

                  {/* Logout Button */}
                  <div className="border-t border-slate-700/50">
                    <LogoutButton
                      className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200 w-full text-left"
                      onLogout={() => setIsDropdownOpen(false)}
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Logout</span>
                    </LogoutButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
