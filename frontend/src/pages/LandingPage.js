import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStethoscope, FaHeartbeat, FaHospital, FaCalendarCheck, FaRobot, FaShieldAlt, FaUserMd, FaClock, FaGlobe, FaArrowRight, FaUsers, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaFileMedical, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, assessments: 0 });

  useEffect(() => {
    // Animate stats
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users < 10000 ? prev.users + 100 : 10000,
        assessments: prev.assessments < 50000 ? prev.assessments + 500 : 50000
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: FaRobot, title: 'AI Symptom Checker', description: 'Get instant health guidance powered by advanced AI' },
    { icon: FaFileMedical, title: 'Report Summarizer', description: 'Upload medical reports for easy-to-understand summaries' },
    { icon: FaHospital, title: 'Hospital Finder', description: 'Find nearby hospitals with real-time information' },
    { icon: FaCalendarCheck, title: 'Appointment Booking', description: 'Book appointments with healthcare providers' },
    { icon: FaLightbulb, title: 'Health Tips', description: 'Daily personalized health recommendations' },
    { icon: FaExclamationTriangle, title: 'Emergency Guidance', description: 'Quick access to emergency information' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FaStethoscope className="text-2xl text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">MediAssist AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Home</Link>
              <Link to="#features" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Features</Link>
              <Link to="/ai-chatbot" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">AI Assistant</Link>
              <Link to="/hospitals" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 transition">Hospitals</Link>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                MediAssist AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your 24/7 Intelligent Healthcare Companion
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Get instant health guidance, symptom analysis, and personalized recommendations powered by advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Start Health Check</span>
                  <FaArrowRight />
                </button>
                <button
                  onClick={() => navigate('/ai-chatbot')}
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition border border-gray-300 dark:border-slate-600"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <FaHeartbeat className="text-8xl mx-auto mb-4 animate-pulse-slow" />
                  <p className="text-2xl font-semibold">AI-Powered Healthcare</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { icon: FaUsers, label: 'Users', value: stats.users.toLocaleString() },
              { icon: FaClock, label: '24/7 Support', value: 'Always' },
              { icon: FaRobot, label: 'AI Guidance', value: 'Instant' },
              { icon: FaGlobe, label: 'Languages', value: '3+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg"
              >
                <stat.icon className="text-3xl text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for intelligent healthcare management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gray-50 dark:bg-slate-700 rounded-2xl hover:shadow-xl transition card-hover"
              >
                <feature.icon className="text-4xl text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust MediAssist AI for their healthcare needs
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-gray-100 transition font-semibold text-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaStethoscope className="text-2xl" />
                <span className="text-xl font-bold">MediAssist AI</span>
              </div>
              <p className="text-gray-400">
                Your intelligent healthcare companion for better health decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link to="/ai-chatbot" className="hover:text-white transition">AI Assistant</Link></li>
                <li><Link to="/hospitals" className="hover:text-white transition">Hospitals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/emergency" className="hover:text-white transition">Emergency</Link></li>
                <li><Link to="/health-tips" className="hover:text-white transition">Health Tips</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaFacebook /></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaTwitter /></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaInstagram /></a>
                <a href="#" className="text-gray-400 hover:text-white transition text-xl"><FaLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediAssist AI. All rights reserved.</p>
            <p className="mt-2 text-sm">
              Disclaimer: This AI provides educational guidance only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
