import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaMapMarkerAlt, FaCalendar, FaEdit, FaSave } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { isDark } = useTheme();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
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
              Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal information and health details
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden mb-6"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-32" />
            <div className="px-6 pb-6">
              <div className="flex items-end -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
                    <span className="text-4xl font-bold text-primary-600">
                      {formData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition">
                    <FaCamera />
                  </button>
                </div>
                <div className="ml-6 mb-2 flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                  <span>{isEditing ? 'Save' : 'Edit'}</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Type
                  </label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allergies
                  </label>
                  <input
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="List any known allergies separated by commas"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medical History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Medical History</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <p className="font-medium text-gray-900 dark:text-white">Annual Checkup</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">January 15, 2024 • City Hospital</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <p className="font-medium text-gray-900 dark:text-white">Blood Test</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">December 10, 2023 • Medical Center</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <p className="font-medium text-gray-900 dark:text-white">Vaccination</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">November 5, 2023 • Health Clinic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
