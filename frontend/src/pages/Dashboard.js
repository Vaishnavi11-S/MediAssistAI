import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaCalendarCheck, FaRobot, FaChartLine, FaArrowRight, FaBell, FaSearch, FaStethoscope, FaTint, FaHospital, FaFileMedical, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [healthScore, setHealthScore] = useState(85);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Appointment with Dr. Smith tomorrow at 10:00 AM', time: '2 hours ago', read: false },
    { id: 2, message: 'Your health report is ready to view', time: '5 hours ago', read: false },
    { id: 3, message: 'Don\'t forget to take your evening medication', time: '1 day ago', read: true },
  ]);

 const handleSearch = (e) => {
  e.preventDefault();

  const query = searchQuery.toLowerCase();

  if (query.includes("symptom")) {
    navigate("/symptom-checker");
  } else if (query.includes("chat")) {
    navigate("/ai-chatbot");
  } else if (query.includes("hospital")) {
    navigate("/hospitals");
  } else if (query.includes("appointment")) {
    navigate("/appointments");
  } else if (query.includes("report")) {
    navigate("/medical-reports");
  } else if (query.includes("health")) {
    navigate("/health-tips");
  } else {
    alert("No result found");
  }
};

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const healthData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Health Score',
        data: [75, 78, 82, 80, 85, 88, 85],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const activityData = {
    labels: ['Symptom Checks', 'Appointments', 'Reports', 'Health Tips'],
    datasets: [
      {
        data: [12, 5, 3, 20],
        backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const quickActions = [
    { icon: FaRobot, label: 'AI Chatbot', path: '/ai-chatbot', color: 'from-blue-500 to-blue-600' },
    { icon: FaStethoscope, label: 'Symptom Checker', path: '/symptom-checker', color: 'from-green-500 to-green-600' },
    { icon: FaCalendarCheck, label: 'Book Appointment', path: '/appointments', color: 'from-purple-500 to-purple-600' },
    { icon: FaHospital, label: 'Find Hospital', path: '/hospitals', color: 'from-orange-500 to-orange-600' },
    { icon: FaFileMedical, label: 'Medical Reports', path: '/medical-reports', color: 'from-red-500 to-red-600' },
    { icon: FaLightbulb, label: 'Health Tips', path: '/health-tips', color: 'from-yellow-500 to-yellow-600' },
  ];

  const recentAssessments = [
    { id: 1, date: '2024-01-15', symptoms: 'Fever, headache', urgency: 'Medium' },
    { id: 2, date: '2024-01-10', symptoms: 'Sore throat', urgency: 'Low' },
    { id: 3, date: '2024-01-05', symptoms: 'Stomach pain', urgency: 'High' },
  ];

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Smith', date: '2024-01-20', time: '10:00 AM', hospital: 'City Hospital' },
    { id: 2, doctor: 'Dr. Johnson', date: '2024-01-25', time: '2:30 PM', hospital: 'Medical Center' },
  ];

  const healthTip = {
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily to maintain optimal health and cognitive function.',
    icon: FaTint,
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
       <main className="flex-1 lg:ml-72 p-4 lg:p-8">
       <div className="max-w-7xl mx-auto flex gap-8">
      <div className="hidden xl:block w-72">
  <div className="sticky top-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">

    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
      Health Overview
    </h2>

    {[
      { icon:"❤️", title:"Heart Rate", value:"72 BPM"},
      { icon:"🩸", title:"Blood Pressure", value:"120/80"},
      { icon:"🌡️", title:"Temperature", value:"98.6°F"},
      { icon:"💧", title:"Water Intake", value:"5/8 Glasses"},
      { icon:"😴", title:"Sleep", value:"7h 20m"},
      { icon:"🚶", title:"Steps", value:"4520"},
      { icon:"📅", title:"Appointment", value:"Today 4 PM"},
      { icon:"💊", title:"Medicine", value:"Vitamin D"}
    ].map((item,index)=>(
      <div
        key={index}
        className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-slate-700 mb-3"
      >
        <span className="text-2xl">{item.icon}</span>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.title}
          </p>

          <p className="font-semibold text-gray-900 dark:text-white">
            {item.value}
          </p>
        </div>

      </div>
    ))}

  </div>
</div>

<div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's your health overview for today
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition w-48 md:w-64 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition relative"
                >
                  <FaBell className="text-gray-600 dark:text-gray-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-gray-500 dark:text-gray-400 text-center">No notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-4 border-b border-gray-100 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition ${
                              !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                            }`}
                          >
                            <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                      <button
                        onClick={() => navigate('/notifications')}
                        className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                className={`p-6 bg-gradient-to-br ${action.color} rounded-2xl text-white shadow-lg hover:shadow-xl transition`}
              >
                <action.icon className="text-3xl mb-3" />
                <p className="font-semibold">{action.label}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 dark:text-gray-400 font-medium">Health Score</h3>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <FaHeartbeat className="text-green-600 dark:text-green-400 text-xl" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{healthScore}</p>
              <p className="text-green-600 text-sm font-medium">+5 from last week</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 dark:text-gray-400 font-medium">Assessments</h3>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaRobot className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">12</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">This month</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 dark:text-gray-400 font-medium">Appointments</h3>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FaCalendarCheck className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">2</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Upcoming</p>
            </div>
          </motion.div>

          {/* Charts Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Trend</h3>
              <Line data={healthData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Overview</h3>
              <Doughnut data={activityData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Assessments</h3>
                <button onClick={() => navigate('/symptom-checker')} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{assessment.symptoms}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{assessment.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assessment.urgency === 'High' ? 'bg-red-100 text-red-600' :
                      assessment.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {assessment.urgency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h3>
                <button onClick={() => navigate('/appointments')} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.hospital}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{appointment.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Health Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 shadow-lg text-white"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <healthTip.icon className="text-2xl" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold mb-2">{healthTip.title}</h3>
                <p className="text-white/90">{healthTip.description}</p>
              </div>
              <button onClick={() => navigate('/health-tips')} className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
                <span>More Tips</span>
                <FaArrowRight />
              </button>
            </div>
           </motion.div>
               </div>

      </div>

    </main>

  </div>
  );
};

export default Dashboard;