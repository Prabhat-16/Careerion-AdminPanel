import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import AdminUsersPage from './pages/AdminUsersPage';
import JobsPage from './pages/JobsPage';
import CompaniesPage from './pages/CompaniesPage';
import ApplicationsPage from './pages/ApplicationsPage';
import CareerAnalyticsPage from './pages/CareerAnalyticsPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout Wrapper for Protected Routes
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
        <Route path="/dashboard" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
        <Route path="/users" element={<LayoutWrapper><UsersPage /></LayoutWrapper>} />
        <Route path="/admin-users" element={<LayoutWrapper><AdminUsersPage /></LayoutWrapper>} />
        <Route path="/jobs" element={<LayoutWrapper><JobsPage /></LayoutWrapper>} />
        <Route path="/companies" element={<LayoutWrapper><CompaniesPage /></LayoutWrapper>} />
        <Route path="/applications" element={<LayoutWrapper><ApplicationsPage /></LayoutWrapper>} />
        <Route path="/analytics" element={<LayoutWrapper><CareerAnalyticsPage /></LayoutWrapper>} />
        <Route path="/settings" element={<LayoutWrapper><SettingsPage /></LayoutWrapper>} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
