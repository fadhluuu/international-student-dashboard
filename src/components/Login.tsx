import React, { useState } from 'react';
import { GraduationCap, User, Shield, Globe, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo users for each role
  const demoUsers = {
    student: {
      id: '1',
      name: 'Maria Gonzalez',
      email: 'maria.gonzalez@university.edu',
      role: 'student' as const,
      studentId: 'STU2024001',
      country: 'Mexico',
      program: 'Computer Science',
      year: 'Junior',
      gpa: 3.7,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    academic_admin: {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'academic_admin' as const,
      department: 'Academic Affairs',
      position: 'Academic Administrator',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    international_admin: {
      id: '3',
      name: 'James Wilson',
      email: 'james.wilson@university.edu',
      role: 'international_admin' as const,
      department: 'International Student Services',
      position: 'International Student Advisor',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Default to student login for demo
      const user = demoUsers.student;
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role: keyof typeof demoUsers) => {
    setEmail(demoUsers[role].email);
    setPassword('demo123');
    // Auto login with selected role
    setTimeout(() => {
      onLogin(demoUsers[role]);
    }, 100);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <User className="w-5 h-5" />;
      case 'academic_admin':
        return <Shield className="w-5 h-5" />;
      case 'international_admin':
        return <Globe className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'student':
        return 'Mahasiswa Asing';
      case 'academic_admin':
        return 'Admin Akademik';
      case 'international_admin':
        return 'Admin Internasional';
      default:
        return 'Student';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Gunadarma University</h1>
          <p className="text-gray-600 mt-1">International Student Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Quick Demo Login:</p>
            <div className="space-y-2">
              {Object.entries(demoUsers).map(([role, user]) => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role as keyof typeof demoUsers)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-purple-300 rounded-lg text-sm text-purple-700 hover:bg-purple-50 transition-colors duration-200"
                >
                  {getRoleIcon(role)}
                  <span>Login as {getRoleLabel(role)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;