import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthCallback from './components/Map/AuthCallback';
import ErrorBoundary from './components/ErrorBoundary';
import HrDashboard from './pages/HRDashboard';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/hr-dashboard" element={<HrDashboard />} />
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
