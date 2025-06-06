import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { TicketProvider } from './context/TicketContext';
import { NotificationProvider } from './context/NotificationContext';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import TicketsPage from './pages/TicketsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TeamPage from './pages/TeamPage';
import ProjectsPage from './pages/ProjectsPage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return null;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    } />
    
    <Route path="/tasks" element={
      <ProtectedRoute>
        <TasksPage />
      </ProtectedRoute>
    } />
    
    <Route path="/tickets" element={
      <ProtectedRoute>
        <TicketsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/analytics" element={
      <ProtectedRoute>
        <AnalyticsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/team" element={
      <ProtectedRoute>
        <TeamPage />
      </ProtectedRoute>
    } />
    
    <Route path="/projects" element={
      <ProtectedRoute>
        {/* <div className="p-8">
          <h1 className="text-2xl font-bold">Projects Page</h1>
          <p className="mt-4">Projects management functionality coming soon.</p>
        </div> */}
        <ProjectsPage />
      </ProtectedRoute>
    } />
    
    <Route path="/settings" element={
      <ProtectedRoute>
        <div className="p-8">
          <h1 className="text-2xl font-bold">Settings Page</h1>
          <p className="mt-4">Settings functionality coming soon.</p>
        </div>
      </ProtectedRoute>
    } />
    
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <TicketProvider>
            <NotificationProvider>
              <AppLayout>
                <AppRoutes />
              </AppLayout>
            </NotificationProvider>
          </TicketProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;