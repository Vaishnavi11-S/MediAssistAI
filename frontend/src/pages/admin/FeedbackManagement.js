import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaSearch, FaTrash, FaReply } from 'react-icons/fa';

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent service! The AI symptom checker was very helpful.', date: '2024-01-15', status: 'Reviewed' },
    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great app but would like more hospital options.', date: '2024-01-14', status: 'Pending' },
    { id: 3, user: 'Bob Johnson', rating: 3, comment: 'Good concept but needs improvement in response time.', date: '2024-01-13', status: 'Pending' },
    { id: 4, user: 'Alice Brown', rating: 5, comment: 'Life-saving app! Helped me identify emergency symptoms.', date: '2024-01-12', status: 'Reviewed' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = 
      feedback.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    }
  };

  const handleMarkReviewed = (id) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, status: 'Reviewed' } : f
    ));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Feedback Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and manage user feedback
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
        </select>
      </motion.div>

      {/* Feedback List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                  {feedback.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{feedback.user}</h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{feedback.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                feedback.status === 'Reviewed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {feedback.status}
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.comment}</p>

            <div className="flex items-center space-x-2">
              {feedback.status === 'Pending' && (
                <button
                  onClick={() => handleMarkReviewed(feedback.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition"
                >
                  <FaReply />
                  <span>Mark as Reviewed</span>
                </button>
              )}
              <button
                onClick={() => handleDelete(feedback.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {filteredFeedbacks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FaStar className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No feedback found</p>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackManagement;
