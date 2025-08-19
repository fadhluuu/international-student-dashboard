import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Courses from './components/Courses';
import Documents from './components/Documents';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import Academic from './components/Academic';
import VisaStatus from './components/VisaStatus';
import StudentsManagement from './components/StudentsManagement';
import DocumentManagement from './components/DocumentManagement';
import GradesManagement from './components/GradesManagement';
import InternationalStudentsView from './components/InternationalStudentsView';
import Support from './components/Support';
import Settings from './components/Settings';
import ClassManagement from './components/ClassManagement';
import StudentClassSchedule from './components/StudentClassSchedule';
import type { User } from '@/types';

// Sample announcements data
const getInitialAnnouncements = () => {
  const stored = localStorage.getItem('globalAnnouncements');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored announcements:', e);
    }
  }
  return [
    {
      id: '1',
      title: 'Welcome to New Semester',
      content: 'Welcome back students! The new semester has officially started. Please check your course schedules and make sure all required materials are ready.',
      priority: 'high' as const,
      date: '2024-01-15',
      author: 'Academic Office'
    },
    {
      id: '2',
      title: 'Library Hours Extended',
      content: 'The university library will now be open until 10 PM on weekdays to support your studies during exam period.',
      priority: 'medium' as const,
      date: '2024-01-10',
      author: 'Library Administration'
    },
    {
      id: '3',
      title: 'International Student Orientation',
      content: 'All new international students are required to attend the orientation session on January 20th at 9 AM in the main auditorium.',
      priority: 'urgent' as const,
      date: '2024-01-08',
      author: 'International Office'
    }
  ];
};

const initialAnnouncements = [
  {
    id: '1',
    title: 'Welcome to New Semester',
    content: 'Welcome back students! The new semester has officially started. Please check your course schedules and make sure all required materials are ready.',
    priority: 'high' as const,
    date: '2024-01-15',
    author: 'Academic Office'
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    content: 'The university library will now be open until 10 PM on weekdays to support your studies during exam period.',
    priority: 'medium' as const,
    date: '2024-01-10',
    author: 'Library Administration'
  },
  {
    id: '3',
    title: 'International Student Orientation',
    content: 'All new international students are required to attend the orientation session on January 20th at 9 AM in the main auditorium.',
    priority: 'urgent' as const,
    date: '2024-01-08',
    author: 'International Office'
  }
];

// Global document state for sharing between student and admin views
const globalDocuments: Document[] = [];

// Student data arrays
const internationalStudentsData: Student[] = [
  {
    id: '1',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@university.edu',
    studentId: 'STU2024001',
    country: 'Mexico',
    program: 'Computer Science',
    year: 'Junior',
    gpa: 3.7,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    status: 'active',
    visaStatus: 'valid',
    enrollmentDate: '2022-08-15',
    classGroup: '4KA21'
  },
  {
    id: '2',
    name: 'Chen Wei',
    email: 'chen.wei@university.edu',
    studentId: 'STU2024002',
    country: 'China',
    program: 'Business Administration',
    year: 'Senior',
    gpa: 3.9,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    status: 'active',
    visaStatus: 'expiring',
    enrollmentDate: '2021-08-15',
    classGroup: '4KA20'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    studentId: 'STU2024003',
    country: 'India',
    program: 'Engineering',
    year: 'Sophomore',
    gpa: 3.5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    status: 'active',
    visaStatus: 'valid',
    enrollmentDate: '2023-08-15',
    classGroup: '3KA15'
  },
  {
    id: '4',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@university.edu',
    studentId: 'STU2024004',
    country: 'Egypt',
    program: 'Medicine',
    year: 'Freshman',
    gpa: 3.2,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    status: 'active',
    visaStatus: 'valid',
    enrollmentDate: '2024-08-15',
    classGroup: '2SI12'
  },
  {
    id: '5',
    name: 'Sophie Dubois',
    email: 'sophie.dubois@university.edu',
    studentId: 'STU2024005',
    country: 'France',
    program: 'Art History',
    year: 'Senior',
    gpa: 3.8,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    status: 'graduated',
    visaStatus: 'expired',
    enrollmentDate: '2021-08-15',
    classGroup: '4KA21'
  }
];


function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [allDocuments, setAllDocuments] = useState<Document[]>(globalDocuments);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [students, setStudents] = useState(internationalStudentsData);
  const [announcements, setAnnouncements] = useState(getInitialAnnouncements());

  // Save announcements to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('globalAnnouncements', JSON.stringify(announcements));
  }, [announcements]);

  const handleDocumentUpdate = (documents: Document[]) => {
    setAllDocuments(documents);
  };

  const handleStudentsUpdate = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
  };

  const handleAnnouncementUpdate = (updatedAnnouncements: typeof initialAnnouncements) => {
    setAnnouncements(updatedAnnouncements);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const handleLanguageChange = (newLanguage: 'en' | 'id') => {
    setLanguage(newLanguage);
  };

  // Both admin roles see only international students since this is an international student dashboard
  const allStudentsForAdmin = internationalStudentsData;

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Student views
    if (currentUser.role === 'student') {
      switch (currentView) {
        case 'dashboard':
          return <Dashboard user={currentUser} announcements={announcements} />;
        case 'courses':
          return <Courses userRole="student" />;
        case 'schedule':
          return <StudentClassSchedule studentClassGroup={currentUser.classGroup || '4KA21'} />;
        case 'academic':
          return <Academic user={currentUser} />;
        case 'documents':
          return <Documents user={currentUser} onDocumentUpdate={handleDocumentUpdate} />;
        case 'profile':
          return <Profile user={currentUser} />;
        case 'visa-immigration':
          return <VisaStatus />;
        case 'support':
          return <Support />;
        default:
          return <Dashboard user={currentUser} />;
      }
    }
    
    // Academic Admin views
    if (currentUser.role === 'academic_admin') {
      switch (currentView) {
        case 'dashboard':
          return <AdminDashboard user={currentUser} students={students} announcements={announcements} onAnnouncementUpdate={handleAnnouncementUpdate} />;
        case 'students':
          return <StudentsManagement user={currentUser} allStudents={students} onStudentsUpdate={handleStudentsUpdate} />;
        case 'courses':
          return <ClassManagement students={students} />;
        case 'grades':
          return <GradesManagement allStudents={students} onStudentsUpdate={handleStudentsUpdate} />;
        default:
          return <AdminDashboard user={currentUser} students={students} announcements={announcements} onAnnouncementUpdate={handleAnnouncementUpdate} />;
      }
    }

    // International Admin views
    if (currentUser.role === 'international_admin') {
      switch (currentView) {
        case 'dashboard':
          return <AdminDashboard user={currentUser} students={students} announcements={announcements} onAnnouncementUpdate={handleAnnouncementUpdate} />;
        case 'students':
          return <InternationalStudentsView user={currentUser} allStudents={students} />;
        case 'document-management':
          return <DocumentManagement allStudents={students} />;
        default:
          return <AdminDashboard user={currentUser} students={students} announcements={announcements} onAnnouncementUpdate={handleAnnouncementUpdate} />;
      }
    }

    return <Dashboard user={currentUser} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        user={currentUser}
        language={language}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          user={currentUser} 
          onLogout={handleLogout}
          language={language}
          onLanguageChange={handleLanguageChange}
          onViewChange={setCurrentView}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;