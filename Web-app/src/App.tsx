import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboars';
import NurseDashboard from './components/dashboards/NurseDashboard';
import FamilyDashboard from './components/dashboards/FamilyDashboard';
import CardRoomDashboard from './components/dashboards/CardRoomDashboars';
import ItemsList from './components/ItemsList';

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'nurse':
      return <NurseDashboard />;
    case 'family':
      return <FamilyDashboard />;
    case 'card_room':
      return <CardRoomDashboard />;
    default:
      return <div>Unknown role</div>;
  }
};

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<DashboardRouter />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;