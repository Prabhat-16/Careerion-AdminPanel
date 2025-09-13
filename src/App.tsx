import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';

// Test component to verify routing
const TestPage = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>
      Test Page
    </Typography>
    <Typography>If you can see this, routing is working!</Typography>
  </Box>
);

// Wrapper component to handle the layout
const LayoutWrapper = () => (
  <Layout>
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Outlet />
    </Box>
  </Layout>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        
        {/* Layout routes */}
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<Navigate to="/test" replace />} />
          <Route path="dashboard" element={<TestPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
