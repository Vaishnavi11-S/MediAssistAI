import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarCheck, FaRobot, FaHospital, FaChartLine, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 10234,
    totalAssessments: 45678,
    totalAppointments: 1234,
    activeUsers: 8567,
  });

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [1200, 1900, 2300, 2800, 3200, 3800],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const assessmentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Assessments',
        data: [450, 520, 480, 600, 550, 380, 420],
        backgroundColor: '#10B981',
        borderRadius: 8,
      },
    ],
  };

  const appointmentData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: [800, 300, 134],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Completed symptom assessment', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Booked appointment', time: '5 minutes ago' },
    { id: 3, user: 'Bob Johnson', action: 'Uploaded medical report', time: '10 minutes ago' },
    { id: 4, user: 'Alice Brown', action: 'Used AI chatbot', time: '15 minutes ago' },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="text-white text-xl" />
        </div>
        <div className={`flex items-center space-x-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <FaArrowUp /> : <FaArrowDown />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of platform analytics and user activity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          trend={12}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Assessments"
          value={stats.totalAssessments}
          icon={FaRobot}
          trend={8}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={FaCalendarCheck}
          trend={15}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={FaChartLine}
          trend={5}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <Line data={userGrowthData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Assessments</h3>
          <Bar data={assessmentData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Appointment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appointment Status</h3>
          <Doughnut data={appointmentData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
