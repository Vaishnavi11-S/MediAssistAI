import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWeight, FaHeartbeat, FaTint, FaThermometerHalf, FaPlus, FaTrash, FaChartLine } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  Title,
  Tooltip,
  Legend
);

const HealthTracking = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [selectedType, setSelectedType] = useState('WEIGHT');
  const [showAddModal, setShowAddModal] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({ value: '', unit: '', notes: '' });

  const metricTypes = [
    { type: 'WEIGHT', label: 'Weight', icon: FaWeight, unit: 'kg', color: '#3B82F6' },
    { type: 'BLOOD_PRESSURE', label: 'Blood Pressure', icon: FaHeartbeat, unit: 'mmHg', color: '#EF4444' },
    { type: 'HEART_RATE', label: 'Heart Rate', icon: FaHeartbeat, unit: 'bpm', color: '#10B981' },
    { type: 'BLOOD_SUGAR', label: 'Blood Sugar', icon: FaTint, unit: 'mg/dL', color: '#F59E0B' },
    { type: 'TEMPERATURE', label: 'Temperature', icon: FaThermometerHalf, unit: '°C', color: '#8B5CF6' },
  ];

  const selectedMetricType = metricTypes.find(m => m.type === selectedType);

  const filteredMetrics = metrics.filter(m => m.type === selectedType);

  const chartData = {
    labels: filteredMetrics.slice(0, 7).reverse().map(m => new Date(m.recordedAt).toLocaleDateString()),
    datasets: [
      {
        label: selectedMetricType?.label,
        data: filteredMetrics.slice(0, 7).reverse().map(m => m.value),
        borderColor: selectedMetricType?.color,
        backgroundColor: `${selectedMetricType?.color}20`,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const handleAddMetric = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health-metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({
          type: selectedType,
          value: parseFloat(newMetric.value),
          unit: selectedMetricType?.unit,
          notes: newMetric.notes,
        }),
      });
      if (response.ok) {
        fetchMetrics();
        setShowAddModal(false);
        setNewMetric({ value: '', unit: '', notes: '' });
      }
    } catch (error) {
      console.error('Error adding metric:', error);
    }
  };

  const handleDeleteMetric = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/health-metrics/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      fetchMetrics();
    } catch (error) {
      console.error('Error deleting metric:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health-metrics`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Health Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor your vital signs and health metrics</p>
          </motion.div>

          {/* Metric Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            {metricTypes.map((metric) => (
              <button
                key={metric.type}
                onClick={() => setSelectedType(metric.type)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedType === metric.type
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                }`}
              >
                <metric.icon className={`text-2xl mb-2 ${selectedType === metric.type ? 'text-primary-600' : 'text-gray-400'}`} />
                <p className="font-medium text-gray-900 dark:text-white text-sm">{metric.label}</p>
              </button>
            ))}
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedMetricType?.label} Trend
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition"
              >
                <FaPlus />
                <span>Add Entry</span>
              </button>
            </div>
            {filteredMetrics.length > 0 ? (
              <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data available. Add your first entry.</p>
            )}
          </motion.div>

          {/* Recent Entries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Entries</h3>
            <div className="space-y-3">
              {filteredMetrics.length > 0 ? (
                filteredMetrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {metric.value} {metric.unit}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(metric.recordedAt).toLocaleString()}
                      </p>
                      {metric.notes && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{metric.notes}</p>}
                    </div>
                    <button
                      onClick={() => handleDeleteMetric(metric.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No entries yet</p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Add Metric Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add {selectedMetricType?.label}</h3>
            <form onSubmit={handleAddMetric}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Value ({selectedMetricType?.unit})
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes (optional)</label>
                <textarea
                  value={newMetric.notes}
                  onChange={(e) => setNewMetric({ ...newMetric, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                  rows="3"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HealthTracking;
