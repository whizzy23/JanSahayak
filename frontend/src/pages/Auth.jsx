import { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {isLogin ? (
          <>
            <Login onLoginSuccess={onAuthSuccess} />
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup onSignupSuccess={onAuthSuccess} />
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth; 