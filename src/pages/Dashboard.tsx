import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Vote, BarChart3, User, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import anime from 'animejs';
import { useAuth } from '../context/AuthContext';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    anime({
      targets: '.dashboard-card',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Your secure voting dashboard
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-green-600 font-semibold">Verified</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Status</h3>
            <p className="text-gray-600">Your Aadhaar verification is complete</p>
          </div>

          <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${user?.hasVoted ? 'bg-green-100' : 'bg-yellow-100'}`}>
                {user?.hasVoted ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-yellow-600" />
                )}
              </div>
              <span className={`font-semibold ${user?.hasVoted ? 'text-green-600' : 'text-yellow-600'}`}>
                {user?.hasVoted ? 'Completed' : 'Pending'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Voting Status</h3>
            <p className="text-gray-600">
              {user?.hasVoted ? 'You have successfully cast your vote' : 'You haven\'t voted yet'}
            </p>
          </div>

          <div className="dashboard-card bg-white p-6 rounded-xl shadow-lg opacity-0">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-purple-600 font-semibold">Live</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Election Results</h3>
            <p className="text-gray-600">View real-time voting statistics</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {!user?.hasVoted && (
            <div className="dashboard-card bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white opacity-0">
              <Vote className="h-12 w-12 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
              <p className="text-blue-100 mb-6">
                Exercise your democratic right and make your voice heard in this election.
              </p>
              <Link
                to="/vote"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center group"
              >
                Vote Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          <div className="dashboard-card bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-xl text-white opacity-0">
            <BarChart3 className="h-12 w-12 mb-6" />
            <h2 className="text-2xl font-bold mb-4">View Results</h2>
            <p className="text-green-100 mb-6">
              Check the latest election results and detailed voting analytics.
            </p>
            <Link
              to="/results"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center group"
            >
              View Results
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="dashboard-card mt-8 bg-white p-6 rounded-xl shadow-lg opacity-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Aadhaar Number</label>
              <p className="text-gray-900">{user?.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              <p className="text-gray-900">{user?.phoneNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Voting Status</label>
              <p className={`font-semibold ${user?.hasVoted ? 'text-green-600' : 'text-yellow-600'}`}>
                {user?.hasVoted ? 'Vote Cast' : 'Not Voted'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;