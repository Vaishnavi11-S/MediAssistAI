import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaStar, FaClock, FaSearch, FaDirections } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const HospitalFinder = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main Street, Downtown',
      phone: '+1 234 567 8900',
      rating: 4.5,
      distance: '2.5 km',
      isOpen: true,
      specialties: ['Emergency', 'Cardiology', 'Neurology'],
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      name: 'Medical Center Plus',
      address: '456 Oak Avenue, Midtown',
      phone: '+1 234 567 8901',
      rating: 4.2,
      distance: '3.8 km',
      isOpen: true,
      specialties: ['Orthopedics', 'Pediatrics', 'Dermatology'],
      coordinates: { lat: 40.7138, lng: -74.0070 }
    },
    {
      id: 3,
      name: 'Specialty Care Hospital',
      address: '789 Pine Road, Uptown',
      phone: '+1 234 567 8902',
      rating: 4.8,
      distance: '5.2 km',
      isOpen: false,
      specialties: ['Oncology', 'Radiology', 'Surgery'],
      coordinates: { lat: 40.7148, lng: -74.0080 }
    },
    {
      id: 4,
      name: 'Community Health Clinic',
      address: '321 Elm Street, Eastside',
      phone: '+1 234 567 8903',
      rating: 4.0,
      distance: '1.8 km',
      isOpen: true,
      specialties: ['General Medicine', 'Family Practice'],
      coordinates: { lat: 40.7158, lng: -74.0090 }
    },
  ];

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDirections = (hospital) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`, '_blank');
  };

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
              Hospital Finder
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find nearby hospitals and healthcare facilities
            </p>
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
                placeholder="Search hospitals by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white text-lg"
              />
            </div>
          </motion.div>

          {/* Hospitals Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredHospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                        <FaHospital className="text-primary-600 dark:text-primary-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{hospital.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          <FaStar className="text-yellow-400 text-sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{hospital.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hospital.isOpen
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {hospital.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start space-x-3 text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                      <span className="text-sm">{hospital.address}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <FaPhone className="flex-shrink-0" />
                      <span className="text-sm">{hospital.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <FaClock className="flex-shrink-0" />
                      <span className="text-sm">{hospital.distance} away</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => getDirections(hospital)}
                    className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition flex items-center justify-center space-x-2"
                  >
                    <FaDirections />
                    <span>Get Directions</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredHospitals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FaHospital className="text-4xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No hospitals found matching your search</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HospitalFinder;
