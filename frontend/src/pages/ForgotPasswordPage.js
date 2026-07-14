import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const ForgotPasswordPage = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Password reset link sent to your email!');
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 ${isDark ? 'dark' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
          <Link to="/login" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-6">
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <FaStethoscope className="text-3xl text-primary-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">MediAssist AI</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {submitted 
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive a reset link'
              }
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-3xl text-green-600 dark:text-green-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Try another email
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
