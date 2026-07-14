import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaPhone, FaHospital, FaAmbulance, FaHeartbeat, FaFirstAid, FaFireExtinguisher, FaShieldAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const Emergency = () => {
  const { isDark } = useTheme();
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const emergencyNumbers = [
    { number: '911', label: 'Emergency Services', icon: FaPhone, color: 'from-red-500 to-red-600' },
    { number: '112', label: 'European Emergency', icon: FaPhone, color: 'from-orange-500 to-orange-600' },
    { number: '108', label: 'Ambulance', icon: FaAmbulance, color: 'from-blue-500 to-blue-600' },
  ];

  const firstAidSteps = [
    {
      id: 1,
      title: 'CPR (Cardiopulmonary Resuscitation)',
      icon: FaHeartbeat,
      steps: [
        'Call emergency services immediately',
        'Place the person on their back on a firm surface',
        'Place the heel of your hand on the center of their chest',
        'Push hard and fast (100-120 compressions per minute)',
        'Continue until help arrives'
      ]
    },
    {
      id: 2,
      title: 'Choking',
      icon: FaFirstAid,
      steps: [
        'Stand behind the person and wrap your arms around their waist',
        'Make a fist with one hand and place it above their navel',
        'Grasp your fist with the other hand',
        'Perform quick, upward thrusts',
        'Continue until the object is dislodged'
      ]
    },
    {
      id: 3,
      title: 'Burns',
      icon: FaFireExtinguisher,
      steps: [
        'Cool the burn with running water for at least 10 minutes',
        'Remove any jewelry or clothing near the burn',
        'Cover the burn with a sterile, non-stick bandage',
        'Do not apply ice, butter, or ointments',
        'Seek medical attention for severe burns'
      ]
    },
    {
      id: 4,
      title: 'Bleeding',
      icon: FaShieldAlt,
      steps: [
        'Apply direct pressure to the wound with a clean cloth',
        'Elevate the injured area above heart level if possible',
        'Maintain pressure until bleeding stops',
        'Apply a bandage once bleeding stops',
        'Seek medical attention if bleeding is severe'
      ]
    }
  ];

  const emergencyConditions = [
    { name: 'Chest Pain', severity: 'Critical', action: 'Call 911 immediately' },
    { name: 'Difficulty Breathing', severity: 'Critical', action: 'Call 911 immediately' },
    { name: 'Severe Bleeding', severity: 'Critical', action: 'Apply pressure and call 911' },
    { name: 'Loss of Consciousness', severity: 'Critical', action: 'Call 911 immediately' },
    { name: 'Stroke Symptoms', severity: 'Critical', action: 'Call 911 immediately' },
    { name: 'Severe Allergic Reaction', severity: 'Critical', action: 'Use EpiPen and call 911' },
  ];

  const callEmergency = (number) => {
    window.location.href = `tel:${number}`;
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
            <div className="flex items-center space-x-3 mb-2">
              <FaExclamationTriangle className="text-red-500 text-3xl" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Emergency Guide
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Quick access to emergency information and first aid instructions
            </p>
          </motion.div>

          {/* Emergency Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Emergency Numbers</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyNumbers.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => callEmergency(item.number)}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white hover:shadow-xl transition`}
                >
                  <item.icon className="text-3xl mb-3" />
                  <p className="text-3xl font-bold mb-1">{item.number}</p>
                  <p className="text-white/90 text-sm">{item.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Critical Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Critical Conditions</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {emergencyConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{condition.name}</p>
                      <p className="text-sm text-red-600 dark:text-red-400">{condition.action}</p>
                    </div>
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                      {condition.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* First Aid Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">First Aid Instructions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {firstAidSteps.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <guide.icon className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {guide.title}
                    </h3>
                  </div>
                  <ol className="space-y-2">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-2 text-gray-600 dark:text-gray-400 text-sm">
                        <span className="w-5 h-5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-3">
              <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">Important Disclaimer</h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                  This emergency guide is for educational purposes only. In a real emergency, always call professional emergency services immediately. Do not rely solely on this information for life-threatening situations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
