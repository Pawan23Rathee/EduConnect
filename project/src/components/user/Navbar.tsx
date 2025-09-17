import React from 'react';
import { Menu, User, Bell, Upload } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../Page/LoginPage';
import SignupPage from '../../Page/SignupPage';

interface NavbarProps {
  onMenuClick: () => void;
  onModeSwitch: () => void;
  isCreatorMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onModeSwitch, isCreatorMode }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Vi</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              VideoIndia
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-2">
          <button onClick={onModeSwitch} className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">{isCreatorMode ? 'User Mode' : 'Creator Studio'}</span>
          </button>

          <ThemeToggle />

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-gray-300">{user.name}</span>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600">Logout</button>
            </div>
          ) : (
            <div className="flex space-x-2">
             <Link to="/login">Login</Link>
<Link to="/signup">Signup</Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
