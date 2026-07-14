import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Private Pages
import Dashboard from './pages/Dashboard';
import SymptomChecker from './pages/SymptomChecker';
import MedicalReports from './pages/MedicalReports';
import Appointments from './pages/Appointments';
import HospitalFinder from './pages/HospitalFinder';
import HealthTips from './pages/HealthTips';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AIChatbot from './pages/AIChatbot';
import HealthTracking from './pages/HealthTracking';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import HospitalManagement from './pages/admin/HospitalManagement';
import FeedbackManagement from './pages/admin/FeedbackManagement';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/symptom-checker" element={
                <ProtectedRoute>
                  <SymptomChecker />
                </ProtectedRoute>
              } />
              <Route path="/medical-reports" element={
                <ProtectedRoute>
                  <MedicalReports />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="/hospitals" element={
                <ProtectedRoute>
                  <HospitalFinder />
                </ProtectedRoute>
              } />
              <Route path="/health-tips" element={
                <ProtectedRoute>
                  <HealthTips />
                </ProtectedRoute>
              } />
              <Route path="/emergency" element={
                <ProtectedRoute>
                  <Emergency />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/ai-chatbot" element={
                <ProtectedRoute>
                  <AIChatbot />
                </ProtectedRoute>
              } />
              <Route path="/health-tracking" element={
                <ProtectedRoute>
                  <HealthTracking />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } />
              <Route path="/admin/appointments" element={
                <AdminRoute>
                  <AppointmentManagement />
                </AdminRoute>
              } />
              <Route path="/admin/hospitals" element={
                <AdminRoute>
                  <HospitalManagement />
                </AdminRoute>
              } />
              <Route path="/admin/feedback" element={
                <AdminRoute>
                  <FeedbackManagement />
                </AdminRoute>
              } />

              {/* Default Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
