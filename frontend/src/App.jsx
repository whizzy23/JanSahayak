import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Dashboard from './pages/admin/Dashboard';
import Issues from './pages/admin/Issues';
import Employees from './pages/admin/Employees';
import Departments from './pages/admin/Departments';
import EmployeeIssues from './pages/employee/Issues';
import Profile from './pages/employee/Profile';
import NotFound from './pages/NotFound';

function App() {
  // Component to handle root route redirection
  const RootRedirect = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    }

    if (user.role === 'employee') {
      return <Navigate to="/employee/issues" />;
    }

    return <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Root Route */}
              <Route path="/" element={<RootRedirect />} />

              {/* Common Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/issues"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Issues />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/employees"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/departments"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Departments />
                  </ProtectedRoute>
                }
              />

              {/* Employee Routes */}
              <Route
                path="/employee/issues"
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeeIssues />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee/profile"
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;