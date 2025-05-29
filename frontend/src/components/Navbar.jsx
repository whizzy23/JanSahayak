import { Link } from "react-router-dom";
import logo from "/assets/logo.png";
import { useEffect, useState } from "react";

const Navbar = ({ onLogout, userRole }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={`fixed w-full z-10 transition-all duration-300 ${
        scrolled 
          ? 'bg-blue-600/80 backdrop-blur-sm' 
          : 'bg-blue-600/60 backdrop-blur-sm'
      }`}
      style={{
        borderRadius: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        margin: '0.25rem',
        width: 'calc(100% - 0.5rem)'
      }}
    >
      <div className="max-w-7x mx-8 rem px-0 sm:px-0 lg:px-0">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center pt-2">
            <Link to="/" className="flex items-center space-x-1 md:flex">
              <img
                src={logo}
                alt="JanSahayak Logo"
                className="h-14 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-3xl font-semibold text-white pb-2 ml-2">JanSahayak</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {userRole === "admin" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 flex items-center gap-1"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/issues"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 flex items-center gap-1"
                  >
                    Issues
                  </Link>
                  <Link
                    to="/admin/users"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 flex items-center gap-1"
                  >
                    Users
                  </Link>
                </>
              )}

              {userRole === "employee" && (
                <>
                  <Link
                    to="/employee/issues"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 flex items-center gap-1"
                  >
                    My Issues
                  </Link>
                  <Link
                    to="/employee/profile"
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-105 flex items-center gap-1"
                  >
                    Profile
                  </Link>
                </>
              )}
            </div>
            <div className="ml-6">
              <Link
                to="/logout"
                onClick={onLogout}
                className="bg-black/80 hover:bg-black text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium border-2 border-white/20 hover:border-white/40 hover:shadow-xl hover:scale-105 hover:shadow-black/30 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
