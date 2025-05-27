import { Link } from 'react-router-dom';

const Navbar = ({ onLogout, userRole }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              JanSahayak
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {userRole === 'admin' && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/issues"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Issues
                </Link>
                <Link
                  to="/admin/employees"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Employees
                </Link>
              </>
            )}

            {userRole === 'employee' && (
              <>
                <Link
                  to="/employee/dashboard"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/employee/issues"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  My Issues
                </Link>
                <Link
                  to="/employee/profile"
                  className="hover:bg-blue-700 px-3 py-2 rounded transition"
                >
                  Profile
                </Link>
              </>
            )}

            <button
              onClick={onLogout}
              className="hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
