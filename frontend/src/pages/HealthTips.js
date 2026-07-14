import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaHeart, FaAppleAlt, FaRunning, FaBed, FaTint, FaBrain, FaLeaf } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const HealthTips = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dailyTip, setDailyTip] = useState({});

  const categories = [
    { id: 'all', name: 'All Tips', icon: FaLightbulb },
    { id: 'nutrition', name: 'Nutrition', icon: FaAppleAlt },
    { id: 'exercise', name: 'Exercise', icon: FaRunning },
    { id: 'sleep', name: 'Sleep', icon: FaBed },
    { id: 'hydration', name: 'Hydration', icon: FaTint },
    { id: 'mental', name: 'Mental Health', icon: FaBrain },
  ];

  const tips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Eat More Fiber',
      description: 'Include fruits, vegetables, whole grains, and legumes in your diet to improve digestion and maintain healthy weight.',
      icon: FaAppleAlt,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      category: 'exercise',
      title: '30 Minutes Daily',
      description: 'Aim for at least 30 minutes of moderate physical activity every day to boost your mood and energy levels.',
      icon: FaRunning,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      category: 'sleep',
      title: 'Quality Sleep',
      description: 'Aim for 7-9 hours of quality sleep each night. Maintain a consistent sleep schedule for better rest.',
      icon: FaBed,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 4,
      category: 'hydration',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily. Proper hydration is essential for optimal body function.',
      icon: FaTint,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 5,
      category: 'mental',
      title: 'Practice Mindfulness',
      description: 'Take 10 minutes daily for meditation or deep breathing exercises to reduce stress and improve mental clarity.',
      icon: FaBrain,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 6,
      category: 'nutrition',
      title: 'Reduce Sugar Intake',
      description: 'Limit added sugars in your diet. Choose natural sweeteners like fruits instead of processed sugars.',
      icon: FaLeaf,
      color: 'from-lime-500 to-green-600'
    },
  ];

  useEffect(() => {
    // Set daily tip
    const today = new Date().getDay();
    setDailyTip(tips[today % tips.length]);
  }, []);

  const filteredTips = selectedCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Health Tips
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Daily personalized health recommendations for a better life
            </p>
          </motion.div>

          {/* Daily Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-gradient-to-r ${dailyTip.color} rounded-2xl p-8 text-white mb-8`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                {dailyTip.icon && <dailyTip.icon className="text-3xl" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <FaLightbulb className="text-yellow-300" />
                  <span className="text-sm font-medium uppercase tracking-wide">Today's Health Tip</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{dailyTip.title}</h3>
                <p className="text-white/90">{dailyTip.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                <category.icon />
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Tips Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center mb-4`}>
                  <tip.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HealthTips;
