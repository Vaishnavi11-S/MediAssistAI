import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaRobot,
  FaFileMedical,
  FaCalendarCheck,
  FaHospital,
  FaLightbulb,
  FaExclamationTriangle,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaStethoscope
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FaRobot, label: 'AI Chatbot', path: '/ai-chatbot' },
    { icon: FaStethoscope, label: 'Symptom Checker', path: '/symptom-checker' },
    { icon: FaFileMedical, label: 'Medical Reports', path: '/medical-reports' },
    { icon: FaCalendarCheck, label: 'Appointments', path: '/appointments' },
    { icon: FaHospital, label: 'Hospitals', path: '/hospitals' },
    { icon: FaLightbulb, label: 'Health Tips', path: '/health-tips' },
    { icon: FaExclamationTriangle, label: 'Emergency', path: '/emergency' },
  ];

  const bottomItems = [
    { icon: FaUser, label: 'Profile', path: '/profile' },
    { icon: FaCog, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
  className={`hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-white dark:bg-slate-800 shadow-xl z-50 flex-col ${
    isDark ? 'dark' : ''
  }`}
>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <FaStethoscope className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">MediAssist AI</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Healthcare Companion</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
            {bottomItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
            >
              {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
              <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
