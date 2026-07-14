import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaLock, FaMoon, FaGlobe, FaShieldAlt, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deleted successfully');
      logout();
    }
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FaMoon />
              <span>Appearance</span>
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toggle dark theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  isDark ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FaBell />
              <span>Notifications</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${
                    notifications ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Updates</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive email notifications</p>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${
                    emailUpdates ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                      emailUpdates ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FaGlobe />
              <span>Language</span>
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
              >
                <option value="en">English</option>
                <option value="ta">Tamil</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FaLock />
              <span>Security</span>
            </h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your password</p>
              </button>
              <button className="w-full p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add extra security to your account</p>
              </button>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <FaShieldAlt />
              <span>Privacy</span>
            </h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                <p className="font-medium text-gray-900 dark:text-white">Privacy Policy</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">View our privacy policy</p>
              </button>
              <button className="w-full p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-600 transition">
                <p className="font-medium text-gray-900 dark:text-white">Data Management</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your personal data</p>
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full p-4 bg-white dark:bg-slate-800 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition flex items-center space-x-3"
              >
                <FaSignOutAlt className="text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Logout</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sign out of your account</p>
                </div>
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full p-4 bg-white dark:bg-slate-800 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-900/30 transition flex items-center space-x-3"
              >
                <FaTrash className="text-red-500" />
                <div>
                  <p className="font-medium text-red-600 dark:text-red-400">Delete Account</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account</p>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
