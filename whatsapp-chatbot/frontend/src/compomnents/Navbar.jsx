import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth.jsx';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold tracking-tight">JanSahayak</h1>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <NavLink to="/admin/dashboard" label="Dashboard" />
                    <NavLink to="/admin/issues" label="Issues" />
                    <NavLink to="/admin/employees" label="Employees" />
                    <NavLink to="/admin/departments" label="Departments" />
                    <NavLink to="/admin/settings" label="Settings" />
                  </>
                )}
                {user.role === 'employee' && (
                  <>
                    <NavLink to="/employee/issues" label="My Issues" />
                    <NavLink to="/employee/profile" label="Profile" />
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" label="Login" />
            )}
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <MobileLink to="/admin/dashboard" label="Dashboard" />
                    <MobileLink to="/admin/issues" label="Issues" />
                    <MobileLink to="/admin/employees" label="Employees" />
                    <MobileLink to="/admin/departments" label="Departments" />
                    <MobileLink to="/admin/settings" label="Settings" />
                  </>
                )}
                {user.role === 'employee' && (
                  <>
                    <MobileLink to="/employee/issues" label="My Issues" />
                    <MobileLink to="/employee/profile" label="Profile" />
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <MobileLink to="/login" label="Login" />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable desktop nav link
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="hover:bg-blue-700 px-4 py-2 rounded transition"
    >
      {label}
    </Link>
  );
}

// Reusable mobile nav link
function MobileLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 hover:bg-blue-700 rounded"
    >
      {label}
    </Link>
  );
}
