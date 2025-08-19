import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar, 
  User, 
  HelpCircle,
  Settings,
  GraduationCap,
  Users,
  Globe,
  Shield,
  BarChart3,
  UserCheck,
  Award
} from 'lucide-react';
import type { User as UserType } from '@/types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: UserType;
  language: 'en' | 'id';
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, user, language }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', icon: LayoutDashboard, label: language === 'id' ? 'Beranda' : 'Dashboard' },
    ];

    if (user.role === 'student') {
      return [
        ...baseItems,
        { id: 'courses', icon: BookOpen, label: language === 'id' ? 'Mata Kuliah' : 'Classes' },
        { id: 'academic', icon: Award, label: language === 'id' ? 'Akademik' : 'Academic' },
        { id: 'documents', icon: FileText, label: language === 'id' ? 'Dokumen' : 'Documents' },
        { id: 'visa-immigration', icon: Globe, label: language === 'id' ? 'Visa & Imigrasi' : 'Visa & Immigration' },
        { id: 'profile', icon: User, label: language === 'id' ? 'Profil' : 'Profile' },
        { id: 'support', icon: HelpCircle, label: language === 'id' ? 'Bantuan' : 'Support' },
      ];
    } else if (user.role === 'academic_admin') {
      return [
        ...baseItems,
        { id: 'students', icon: Users, label: language === 'id' ? 'Mahasiswa' : 'Students' },
        { id: 'courses', icon: BookOpen, label: language === 'id' ? 'Mata Kuliah' : 'Classes' },
        { id: 'grades', icon: BarChart3, label: language === 'id' ? 'Nilai' : 'Grades' },
      ];
    } else if (user.role === 'international_admin') {
      return [
        ...baseItems,
        { id: 'students', icon: Users, label: language === 'id' ? 'Mahasiswa Asing' : 'International Students' },
        { id: 'document-management', icon: FileText, label: language === 'id' ? 'Manajemen Dokumen' : 'Document Management' },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const getRoleLabel = () => {
    switch (user.role) {
      case 'student':
        return language === 'id' ? 'Mahasiswa Asing' : 'International Students';
      case 'academic_admin':
        return language === 'id' ? 'Admin Akademik' : 'Academic Admin';
      case 'international_admin':
        return language === 'id' ? 'Layanan Internasional' : 'International Services';
      default:
        return language === 'id' ? 'Portal' : 'Portal';
    }
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'student':
        return GraduationCap;
      case 'academic_admin':
        return Shield;
      case 'international_admin':
        return Globe;
      default:
        return GraduationCap;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <RoleIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Gunadarma</h1>
            <p className="text-sm text-gray-500">{getRoleLabel()}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          v1.0.0 - {getRoleLabel()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;