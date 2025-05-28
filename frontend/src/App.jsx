import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import ProtectedRoute from './hoc/ProtectedRoute';
import { authService } from './services/authService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/admin/Dashboard';
import Issues from './pages/admin/Issues';
import Users from './pages/admin/Users';
import EmployeeIssues from './pages/employee/Issues';
import Profile from './pages/employee/Profile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    if (authenticated) {
      setUserRole(authService.getRole());
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setUserRole(authService.getRole());
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        {isAuthenticated && (
          <Navbar onLogout={handleLogout} userRole={userRole} />
        )}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/employee/issues'} replace />
                ) : (
                  <Auth onAuthSuccess={handleAuthSuccess} />
                )
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  {userRole === 'admin' ? <Dashboard /> : <Navigate to="/auth" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/issues"
              element={
                <ProtectedRoute>
                  {userRole === 'admin' ? <Issues /> : <Navigate to="/auth" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  {userRole === 'admin' ? <Users /> : <Navigate to="/auth" replace />}
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/issues"
              element={
                <ProtectedRoute>
                  {userRole === 'employee' ? <EmployeeIssues /> : <Navigate to="/auth" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/profile"
              element={
                <ProtectedRoute>
                  {userRole === 'employee' ? <Profile /> : <Navigate to="/auth" replace />}
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;