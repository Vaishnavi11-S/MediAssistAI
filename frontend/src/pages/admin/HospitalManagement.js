import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const HospitalManagement = () => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'City General Hospital', address: '123 Main Street, Downtown', phone: '+1 234 567 8900', rating: 4.5, status: 'Active' },
    { id: 2, name: 'Medical Center Plus', address: '456 Oak Avenue, Midtown', phone: '+1 234 567 8901', rating: 4.2, status: 'Active' },
    { id: 3, name: 'Specialty Care Hospital', address: '789 Pine Road, Uptown', phone: '+1 234 567 8902', rating: 4.8, status: 'Active' },
    { id: 4, name: 'Community Health Clinic', address: '321 Elm Street, Eastside', phone: '+1 234 567 8903', rating: 4.0, status: 'Inactive' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      setHospitals(hospitals.filter(h => h.id !== id));
    }
  };

  const handleEdit = (hospital) => {
    setEditingHospital(hospital);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Hospital Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage hospital listings and information
          </p>
        </div>
        <button
          onClick={() => {
            setEditingHospital(null);
            setShowModal(true);
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
        >
          <FaPlus />
          <span>Add Hospital</span>
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
          />
        </div>
      </motion.div>

      {/* Hospitals Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <FaHospital className="text-primary-600 dark:text-primary-400 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{hospital.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{hospital.rating}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                hospital.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {hospital.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">{hospital.address}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{hospital.phone}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(hospital)}
                className="flex-1 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition flex items-center justify-center space-x-2"
              >
                <FaEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(hospital.id)}
                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {editingHospital ? 'Edit Hospital' : 'Add Hospital'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hospital Name
                </label>
                <input
                  type="text"
                  defaultValue={editingHospital?.name}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={editingHospital?.address}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  defaultValue={editingHospital?.phone}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <button className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">
                {editingHospital ? 'Update Hospital' : 'Add Hospital'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HospitalManagement;
