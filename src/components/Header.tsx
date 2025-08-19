import React, { useState } from 'react';
import { Search, ChevronDown, LogOut, Languages } from 'lucide-react';
import type { User, Notification } from '@/types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  language: 'en' | 'id';
  onLanguageChange: (language: 'en' | 'id') => void;
  onViewChange?: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, language, onLanguageChange, onViewChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Visa Renewal Reminder',
      message: 'Your F-1 visa expires in 30 days. Please schedule an appointment.',
      type: 'warning',
      date: '2024-01-15',
      read: false
    },
    {
      id: '2',
      title: 'Course Registration Open',
      message: 'Fall 2024 course registration is now open for international students.',
      type: 'info',
      date: '2024-01-14',
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleLabel = () => {
    switch (user.role) {
      case 'student':
        return 'Student';
      case 'academic_admin':
        return 'Academic Administrator';
      case 'international_admin':
        return 'International Student Advisor';
      default:
        return 'User';
    }
  };

  const getDisplayId = () => {
    if (user.role === 'student') {
      return user.studentId;
    }
    return user.department;
  };

  const getLanguageLabel = (lang: 'en' | 'id') => {
    return lang === 'en' ? 'English' : 'Bahasa Indonesia';
  };

  const getSearchPlaceholder = () => {
    if (language === 'id') {
      return user.role === 'student' 
        ? "Cari kelas, dokumen, atau sumber daya..."
        : "Cari mahasiswa, dokumen, atau laporan...";
    }
    return user.role === 'student' 
      ? "Search classes, documents, or resources..."
      : "Search students, documents, or reports...";
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ID'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    onLanguageChange('en');
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                    language === 'en' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {language === 'en' && <span className="ml-auto text-purple-600">✓</span>}
                </button>
                <button
                  onClick={() => {
                    onLanguageChange('id');
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                    language === 'id' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">🇮🇩</span>
                  <span>Bahasa Indonesia</span>
                  {language === 'id' && <span className="ml-auto text-purple-600">✓</span>}
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 border-l border-gray-200 pl-4 hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{getDisplayId()}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{getRoleLabel()}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="py-2">
                  <button 
                    onClick={() => onViewChange?.('profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => onViewChange?.('support')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Help & Support
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;