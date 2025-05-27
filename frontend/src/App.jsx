import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import { authService } from './services/authService';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/admin/Dashboard';
import Issues from './pages/admin/Issues';
import Employees from './pages/admin/Employees';
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
      <div className="flex flex-col min-h-screen">
        {isAuthenticated && (
          <Navbar onLogout={handleLogout} userRole={userRole} />
        )}
        <main className="flex-grow">
          <Routes>
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
              path="/admin/employees"
              element={
                <ProtectedRoute>
                  {userRole === 'admin' ? <Employees /> : <Navigate to="/auth" replace />}
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

            {/* Root Route */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/employee/issues'} replace />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;