import React, { useState } from 'react';
import { 
  Bell,
  Megaphone,
  Calendar, 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Settings,
  Monitor,
  Wifi,
  User as UserIcon
} from 'lucide-react';
import type { User } from '@/types';

interface DashboardProps {
  user: User;
  announcements?: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, announcements: globalAnnouncements }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Use global announcements if provided, otherwise use default
  const announcements = globalAnnouncements || [
    {
      id: '1',
      title: 'Course Registration Open',
      message: 'Fall 2024 course registration is now open for international students. Registration deadline is March 15, 2024.',
      type: 'info',
      date: '2024-02-10',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Visa Renewal Reminder',
      message: 'Students with visas expiring in the next 60 days should schedule renewal appointments immediately.',
      type: 'warning',
      date: '2024-02-08',
      priority: 'urgent'
    },
    {
      id: '3',
      title: 'International Student Orientation',
      message: 'New international student orientation will be held on February 25, 2024. All new students must attend.',
      type: 'info',
      date: '2024-02-05',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Scholarship Applications Available',
      message: 'International Merit Scholarship applications are now open. Apply before March 30, 2024.',
      type: 'success',
      date: '2024-02-01',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Health Insurance Update',
      message: 'All international students must update their health insurance information by February 20, 2024.',
      type: 'warning',
      date: '2024-01-28',
      priority: 'high'
    }
  ];

  const calendarEvents = [
    {
      id: '1',
      title: 'Midterm Exam - Data Structures',
      date: '2024-02-15',
      time: '2:00 PM',
      type: 'exam',
      location: 'CS Building Room 301'
    },
    {
      id: '2',
      title: 'International Student Orientation',
      date: '2024-02-20',
      time: '10:00 AM',
      type: 'event',
      location: 'Student Center'
    },
    {
      id: '3',
      title: 'Academic Advisor Meeting',
      date: '2024-02-22',
      time: '3:30 PM',
      type: 'meeting',
      location: 'Dean Office'
    },
    {
      id: '4',
      title: 'Visa Renewal Appointment',
      date: '2024-02-25',
      time: '9:00 AM',
      type: 'immigration',
      location: 'Immigration Office'
    },
    {
      id: '5',
      title: 'Final Project Presentation',
      date: '2024-02-28',
      time: '1:00 PM',
      type: 'academic',
      location: 'CS Building Room 205'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Midterm Exam - Data Structures',
      date: '2024-02-15',
      time: '2:00 PM',
      type: 'exam',
      location: 'CS Building Room 301'
    },
    {
      title: 'International Student Orientation',
      date: '2024-02-20',
      time: '10:00 AM',
      type: 'event',
      location: 'Student Center'
    },
    {
      title: 'Academic Advisor Meeting',
      date: '2024-02-22',
      time: '3:30 PM',
      type: 'meeting',
      location: 'Dean Office'
    }
  ];

  const labInfo = [
    {
      id: '1',
      name: 'Computer Lab A1',
      code: 'LAB-A1',
      type: 'computer',
      location: 'Building A, Floor 1',
      capacity: 40,
      supervisor: 'Dr. Ahmad Susanto',
      status: 'available',
      currentActivity: 'Available for practice sessions'
    },
    {
      id: '2',
      name: 'Language Lab C1',
      code: 'LAB-C1',
      type: 'language',
      location: 'Building C, Floor 1',
      capacity: 30,
      supervisor: 'Ms. Sarah Johnson',
      status: 'occupied',
      currentActivity: 'English Practice Session - Class 3SI15'
    },
    {
      id: '3',
      name: 'Engineering Lab D1',
      code: 'LAB-D1',
      type: 'engineering',
      location: 'Building D, Floor 1',
      capacity: 25,
      supervisor: 'Prof. Budi Hartono',
      status: 'maintenance',
      currentActivity: 'Under maintenance until 3:00 PM'
    },
    {
      id: '4',
      name: 'Computer Lab B2',
      code: 'LAB-B2',
      type: 'computer',
      location: 'Building B, Floor 2',
      capacity: 35,
      supervisor: 'Dr. Lisa Chen',
      status: 'available',
      currentActivity: 'Available for programming practice'
    }
  ];

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <Bell className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAnnouncementStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (priority) {
      case 'urgent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'high':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'event':
        return <Users className="w-4 h-4 text-blue-600" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'immigration':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'academic':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 border-red-200';
      case 'event':
        return 'bg-blue-100 border-blue-200';
      case 'meeting':
        return 'bg-green-100 border-green-200';
      case 'immigration':
        return 'bg-purple-100 border-purple-200';
      case 'academic':
        return 'bg-indigo-100 border-indigo-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getLabTypeIcon = (type: string) => {
    switch (type) {
      case 'computer':
        return <Monitor className="w-5 h-5 text-blue-600" />;
      case 'language':
        return <Wifi className="w-5 h-5 text-green-600" />;
      case 'engineering':
        return <Settings className="w-5 h-5 text-purple-600" />;
      default:
        return <Monitor className="w-5 h-5 text-gray-600" />;
    }
  };

  const getLabStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'occupied':
        return <Users className="w-4 h-4 text-orange-600" />;
      case 'maintenance':
        return <Settings className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLabStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'occupied':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'maintenance':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(event => event.date === dateString);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements - Left Side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-purple-600" />
                <span>Announcements</span>
              </h3>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {announcements.map((announcement) => (
                <div key={announcement.id} className={`p-4 rounded-lg border ${getAnnouncementStyle(announcement.type)}`}>
                  <div className="flex items-start space-x-3">
                    {getAnnouncementIcon(announcement.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={getPriorityBadge(announcement.priority)}>
                            {announcement.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{announcement.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar - Right Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="p-1 text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-8"></div>;
                  }

                  const dayEvents = getEventsForDate(day);
                  const isTodayDate = isToday(day);

                  return (
                    <div
                      key={day}
                      className={`h-8 flex items-center justify-center text-sm rounded transition-colors duration-200 ${
                        isTodayDate 
                          ? 'bg-purple-600 text-white font-medium' 
                          : dayEvents.length > 0
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;