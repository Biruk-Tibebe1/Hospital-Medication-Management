import React, { useState } from 'react';
import { Heart, Shield, Users, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const { login, loading, error } = useAuth();

  const demoAccounts = [
    { role: 'doctor', email: 'doctor@hospital.com', label: 'Doctor', icon: Heart, color: 'bg-blue-500' },
    { role: 'nurse', email: 'nurse@hospital.com', label: 'Nurse', icon: Shield, color: 'bg-green-500' },
    { role: 'family', email: 'family@hospital.com', label: 'Family', icon: Users, color: 'bg-purple-500' },
    { role: 'card_room', email: 'cardroom@hospital.com', label: 'Card Room', icon: Activity, color: 'bg-orange-500' },
    { role: 'admin', email: 'admin@hospital.com', label: 'Administrator', icon: Shield, color: 'bg-red-500' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      // Error is handled in the AuthContext
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <Heart className="h-12 w-12 text-blue-200 mr-3" />
            <h1 className="text-3xl font-bold">MedTracker Pro</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-6">
            Professional Hospital Medication Management System
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Streamline medication administration, enhance patient safety, and improve healthcare outcomes with our comprehensive management platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-200 mr-3" />
              <span>HIPAA Compliant & Secure</span>
            </div>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-blue-200 mr-3" />
              <span>Real-time Medication Tracking</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-200 mr-3" />
              <span>Multi-Role Access Control</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-800">MedTracker Pro</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Demo Account Cards */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Accounts (Click to auto-fill):</h3>
            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <button
                    key={account.role}
                    onClick={() => handleDemoLogin(account.email)}
                    className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className={`${account.color} p-2 rounded-lg mr-3`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{account.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;