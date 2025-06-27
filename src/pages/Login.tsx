import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Shield, Smartphone, ArrowRight } from 'lucide-react';
import anime from 'animejs';
import { useAuth } from '../context/AuthContext';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Login: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { isAuthenticated, login } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate form on mount
    anime({
      targets: '.login-form',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarNumber.length === 12) {
      setStep('otp');
      setError('');
      
      // Animate transition
      anime({
        targets: '.form-content',
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
      });
    } else {
      setError('Please enter a valid 12-digit Aadhaar number');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(aadhaarNumber, otp);
      if (!success) {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    return formatted;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <BackgroundAnimation />
      
      <div className="login-form max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden opacity-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
          <Shield className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">VoteSecure Login</h1>
          <p className="text-blue-100 mt-2">Authenticate with your Aadhaar</p>
        </div>

        <div className="p-6">
          {step === 'aadhaar' && (
            <div className="form-content">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Aadhaar Number</h2>
              
              <form onSubmit={handleAadhaarSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    value={formatAadhaar(aadhaarNumber)}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\s/g, ''))}
                    maxLength={14}
                    placeholder="1234 5678 9012"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          )}

          {step === 'otp' && (
            <div className="form-content">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter OTP</h2>
              <p className="text-gray-600 mb-6 flex items-center">
                <Smartphone className="h-4 w-4 mr-2" />
                Sent to your registered mobile number
              </p>
              
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6-Digit OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength={6}
                    placeholder="123456"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">For demo: use 123456</p>
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep('aadhaar')}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;