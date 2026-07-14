import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPlus, FaSearch, FaFilter, FaClock, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

const Appointments = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [appointments, setAppointments] = useState({
    upcoming: [
      { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', hospital: 'City Hospital', date: '2024-01-20', time: '10:00 AM', status: 'Confirmed' },
      { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', hospital: 'Medical Center', date: '2024-01-25', time: '2:30 PM', status: 'Pending' },
    ],
    completed: [
      { id: 3, doctor: 'Dr. Emily Davis', specialty: 'General Physician', hospital: 'Health Clinic', date: '2024-01-05', time: '11:00 AM', status: 'Completed' },
    ],
    cancelled: [
      { id: 4, doctor: 'Dr. James Wilson', specialty: 'Neurologist', hospital: 'Specialty Hospital', date: '2024-01-02', time: '3:00 PM', status: 'Cancelled' },
    ]
  });

  const [bookingForm, setBookingForm] = useState({
    hospital: '',
    doctor: '',
    date: '',
    time: ''
  });

  const handleBookAppointment = () => {
    if (!bookingForm.hospital || !bookingForm.doctor || !bookingForm.date || !bookingForm.time) {
      toast.error('Please fill all fields');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctor: bookingForm.doctor,
      specialty: 'General Physician',
      hospital: bookingForm.hospital,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'Pending'
    };

    setAppointments({
      ...appointments,
      upcoming: [newAppointment, ...appointments.upcoming]
    });

    setShowBookingModal(false);
    setBookingForm({ hospital: '', doctor: '', date: '', time: '' });
    toast.success('Appointment booked successfully!');
  };

  const handleCancelAppointment = (id) => {
    const appointment = appointments.upcoming.find(a => a.id === id);
    setAppointments({
      ...appointments,
      upcoming: appointments.upcoming.filter(a => a.id !== id),
      cancelled: [appointment, ...appointments.cancelled]
    });
    toast.success('Appointment cancelled');
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
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <Sidebar />
      <main className="flex-1 lg:ml-72 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Appointments
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your healthcare appointments
              </p>
            </div>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
            >
              <FaPlus />
              <span>Book Appointment</span>
            </button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-slate-700"
          >
            {['upcoming', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition ${
                  activeTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-xs">
                  {appointments[tab].length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Appointments List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {appointments[activeTab].map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {appointment.doctor.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt />
                          <span>{appointment.hospital}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaClock />
                          <span>{appointment.date} at {appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeTab === 'upcoming' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}

            {appointments[activeTab].length === 0 && (
              <div className="text-center py-12">
                <FaCalendarCheck className="text-4xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No {activeTab} appointments</p>
              </div>
            )}
          </motion.div>

          {/* Booking Modal */}
          {showBookingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowBookingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Book Appointment
                  </h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hospital
                    </label>
                    <select
                      value={bookingForm.hospital}
                      onChange={(e) => setBookingForm({ ...bookingForm, hospital: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select Hospital</option>
                      <option value="City Hospital">City Hospital</option>
                      <option value="Medical Center">Medical Center</option>
                      <option value="Health Clinic">Health Clinic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Doctor
                    </label>
                    <select
                      value={bookingForm.doctor}
                      onChange={(e) => setBookingForm({ ...bookingForm, doctor: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select Doctor</option>
                      <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                      <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                      <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    >
                      <option value="">Select Time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-semibold"
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
