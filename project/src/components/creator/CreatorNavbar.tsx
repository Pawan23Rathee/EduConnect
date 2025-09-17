import React from 'react';
import { BarChart3, Upload, User, Bell, Settings } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';

interface CreatorNavbarProps {
  onModeSwitch: () => void;
}

const CreatorNavbar: React.FC<CreatorNavbarProps> = ({ onModeSwitch }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Creator Studio
              </h1>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Switch to User Mode */}
            <button
              onClick={onModeSwitch}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full transition-all duration-200 transform hover:scale-105"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">User Mode</span>
            </button>

            {/* Upload */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <Upload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <ThemeToggle />

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                Creator
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CreatorNavbar;