import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vote, User, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Election</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/vote"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/vote')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Vote className="h-4 w-4" />
                  <span>Vote</span>
                </Link>
                <Link
                  to="/results"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/results')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Results</span>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;