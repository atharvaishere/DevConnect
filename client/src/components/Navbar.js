import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-secondary">
          DevConnect
        </Link>
        <div className="flex space-x-4 items-center">
          <Link
            to="/projects"
            className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
          >
            Projects
          </Link>
          <Link
            to="/search"
            className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
          >
            Search
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
              >
                Profile
              </Link>
              <Link
                to="/project/create"
                className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
              >
                Create Project
              </Link>
              <button
                onClick={handleLogout}
                className="backdrop-blur-md bg-accent/80 border border-white/30 shadow-md px-4 py-2 rounded-xl text-white hover:bg-accent/100 transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 shadow-md px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition font-semibold"
              >
                Signup
              </Link>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-5 text-2xl rounded-full bg-white/40 dark:bg-gray-700/40 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-md transition-all duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;