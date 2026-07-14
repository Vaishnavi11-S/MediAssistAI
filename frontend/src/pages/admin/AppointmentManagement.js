import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaSearch, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, user: 'John Doe', doctor: 'Dr. Sarah Johnson', hospital: 'City Hospital', date: '2024-01-20', time: '10:00 AM', status: 'Pending' },
    { id: 2, user: 'Jane Smith', doctor: 'Dr. Michael Chen', hospital: 'Medical Center', date: '2024-01-25', time: '2:30 PM', status: 'Confirmed' },
    { id: 3, user: 'Bob Johnson', doctor: 'Dr. Emily Davis', hospital: 'Health Clinic', date: '2024-01-18', time: '11:00 AM', status: 'Completed' },
    { id: 4, user: 'Alice Brown', doctor: 'Dr. James Wilson', hospital: 'Specialty Hospital', date: '2024-01-15', time: '3:00 PM', status: 'Cancelled' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'Confirmed' } : a
    ));
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(a => 
      a.id === id ? { ...a, status: 'Cancelled' } : a
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'Completed': return 'bg-blue-100 text-blue-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Appointment Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and monitor all appointments
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
            placeholder="Search appointments..."
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
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </motion.div>

      {/* Appointments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {appointment.user}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {appointment.doctor}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {appointment.hospital}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {appointment.date} at {appointment.time}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(appointment.id)}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
                          >
                            <FaCheck className="text-green-500" />
                          </button>
                          <button
                            onClick={() => handleReject(appointment.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                          >
                            <FaTimes className="text-red-500" />
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition">
                        <FaEye className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentManagement;
