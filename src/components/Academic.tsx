import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CreditCard,
  Calendar,
  BookOpen,
  Award,
  Eye,
  X
} from 'lucide-react';
import type { User } from '@/types';

interface AcademicProps {
  user: User;
}

interface KRSItem {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  lecturer: string;
  schedule: string;
  room: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface Grade {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  semester: string;
}

interface ExamCard {
  id: string;
  type: 'UTS' | 'UAS' | 'Ujian Utama';
  title: string;
  subjectCount: number;
  status: 'active' | 'completed';
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  room: string;
  seat: string;
}

interface ExamSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  room: string;
  seat: string;
}

interface Payment {
  id: string;
  semester: string;
  type: 'SPP' | 'Praktikum' | 'Wisuda' | 'Lainnya';
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
}

const Academic: React.FC<AcademicProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'krs' | 'grades' | 'exams' | 'payment'>('krs');
  const [selectedSemester, setSelectedSemester] = useState('7');
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedExamType, setSelectedExamType] = useState<'UTS' | 'UAS' | 'Ujian Utama' | null>(null);

  // data krs
  const allKrsData: Record<string, KRSItem[]> = {
    '1': [
      {
        id: '1',
        courseCode: 'CS101',
        courseName: 'Introduction to Programming',
        credits: 3,
        lecturer: 'Dr. John Smith',
        schedule: 'Monday 08:00-10:00',
        room: 'A101',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'MATH101',
        courseName: 'Calculus I',
        credits: 3,
        lecturer: 'Prof. Jane Doe',
        schedule: 'Tuesday 10:00-12:00',
        room: 'B201',
        status: 'approved'
      }
    ],
    '2': [
      {
        id: '1',
        courseCode: 'CS102',
        courseName: 'Data Structures',
        credits: 3,
        lecturer: 'Dr. Alice Johnson',
        schedule: 'Wednesday 08:00-10:00',
        room: 'A102',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'MATH102',
        courseName: 'Calculus II',
        credits: 3,
        lecturer: 'Prof. Bob Wilson',
        schedule: 'Thursday 10:00-12:00',
        room: 'B202',
        status: 'approved'
      }
    ],
    '3': [
      {
        id: '1',
        courseCode: 'CS201',
        courseName: 'Object Oriented Programming',
        credits: 3,
        lecturer: 'Dr. Carol Brown',
        schedule: 'Monday 13:00-15:00',
        room: 'A201',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS202',
        courseName: 'Computer Networks',
        credits: 3,
        lecturer: 'Prof. David Lee',
        schedule: 'Tuesday 13:00-15:00',
        room: 'B301',
        status: 'approved'
      }
    ],
    '4': [
      {
        id: '1',
        courseCode: 'CS301',
        courseName: 'Database Systems',
        credits: 3,
        lecturer: 'Dr. Emma Davis',
        schedule: 'Wednesday 13:00-15:00',
        room: 'A301',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS302',
        courseName: 'Operating Systems',
        credits: 3,
        lecturer: 'Prof. Frank Miller',
        schedule: 'Thursday 13:00-15:00',
        room: 'B401',
        status: 'approved'
      }
    ],
    '5': [
      {
        id: '1',
        courseCode: 'CS401',
        courseName: 'Software Engineering',
        credits: 3,
        lecturer: 'Dr. Grace Taylor',
        schedule: 'Monday 15:00-17:00',
        room: 'A401',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS402',
        courseName: 'Computer Graphics',
        credits: 3,
        lecturer: 'Prof. Henry Wilson',
        schedule: 'Tuesday 15:00-17:00',
        room: 'B501',
        status: 'approved'
      }
    ],
    '6': [
      {
        id: '1',
        courseCode: 'CS501',
        courseName: 'Artificial Intelligence',
        credits: 3,
        lecturer: 'Dr. Ivy Chen',
        schedule: 'Wednesday 15:00-17:00',
        room: 'A501',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS502',
        courseName: 'Machine Learning',
        credits: 3,
        lecturer: 'Prof. Jack Anderson',
        schedule: 'Thursday 15:00-17:00',
        room: 'B601',
        status: 'approved'
      }
    ],
    '7': [
      {
        id: '1',
        courseCode: 'CS401',
        courseName: 'Advanced Data Structures',
        credits: 3,
        lecturer: 'Dr. Sarah Johnson',
        schedule: 'Tuesday 08:00-10:00',
        room: 'B231',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS402',
        courseName: 'Software Engineering',
        credits: 3,
        lecturer: 'Prof. Michael Chen',
        schedule: 'Wednesday 10:00-12:00',
        room: 'A102',
        status: 'approved'
      },
      {
        id: '3',
        courseCode: 'MATH401',
        courseName: 'Discrete Mathematics',
        credits: 2,
        lecturer: 'Dr. Emily Rodriguez',
        schedule: 'Thursday 13:00-15:00',
        room: 'B302',
        status: 'pending'
      }
    ],
    '8': [
      {
        id: '1',
        courseCode: 'CS601',
        courseName: 'Final Project',
        credits: 6,
        lecturer: 'Dr. Lisa Wang',
        schedule: 'Monday 08:00-12:00',
        room: 'A601',
        status: 'approved'
      },
      {
        id: '2',
        courseCode: 'CS602',
        courseName: 'Internship',
        credits: 4,
        lecturer: 'Prof. Mark Thompson',
        schedule: 'External',
        room: 'External',
        status: 'approved'
      }
    ]
  };

  // get krs
  const currentKrsItems = allKrsData[selectedSemester] || [];

  const grades: Grade[] = [
    {
      id: '1',
      courseCode: 'CS301',
      courseName: 'Database Systems',
      credits: 3,
      grade: 'A',
      gradePoints: 4.0, 
      semester: 'Semester 6'
    },
    {
      id: '2',
      courseCode: 'CS302',
      courseName: 'Web Programming',
      credits: 3,
      grade: 'A-',
      gradePoints: 3.7,
      semester: 'Semester 6'
    },
    {
      id: '3',
      courseCode: 'MATH301',
      courseName: 'Statistics',
      credits: 2,
      grade: 'B+',
      gradePoints: 3.3,
      semester: 'Semester 6'
    }
  ];

  const examCards: ExamCard[] = [
    {
      id: '1',
      type: 'UTS',
      title: 'Midterm Exams',
      subjectCount: 3,
      status: 'active',
      courseCode: 'Multiple',
      courseName: 'Midterm Examinations',
      date: '2024-03-15 - 2024-03-18',
      time: 'Various',
      room: 'Various',
      seat: 'A-15'
    },
    {
      id: '2',
      type: 'UAS',
      title: 'Final Exams',
      subjectCount: 3,
      status: 'active',
      courseCode: 'Multiple',
      courseName: 'Final Examinations',
      date: '2024-05-20 - 2024-05-24',
      time: 'Various',
      room: 'Various',
      seat: 'A-15'
    },
    {
      id: '3',
      type: 'Ujian Utama',
      title: 'Main Exams',
      subjectCount: 2,
      status: 'active',
      courseCode: 'Multiple',
      courseName: 'Main Examinations',
      date: '2024-06-10 - 2024-06-12',
      time: 'Various',
      room: 'Various',
      seat: 'A-15'
    }
  ];

  const examSchedules: Record<string, ExamSchedule[]> = {
    'UTS': [
      {
        id: '1',
        courseCode: 'CS401',
        courseName: 'Advanced Data Structures',
        date: '2024-03-15',
        time: '08:00-10:00',
        room: 'B231',
        seat: 'A-15'
      },
      {
        id: '2',
        courseCode: 'CS402',
        courseName: 'Software Engineering',
        date: '2024-03-16',
        time: '10:00-12:00',
        room: 'A102',
        seat: 'A-15'
      },
      {
        id: '3',
        courseCode: 'MATH401',
        courseName: 'Discrete Mathematics',
        date: '2024-03-18',
        time: '13:00-15:00',
        room: 'B302',
        seat: 'A-15'
      }
    ],
    'UAS': [
      {
        id: '4',
        courseCode: 'CS401',
        courseName: 'Advanced Data Structures',
        date: '2024-05-20',
        time: '08:00-10:00',
        room: 'B231',
        seat: 'A-15'
      },
      {
        id: '5',
        courseCode: 'CS402',
        courseName: 'Software Engineering',
        date: '2024-05-22',
        time: '10:00-12:00',
        room: 'A102',
        seat: 'A-15'
      },
      {
        id: '6',
        courseCode: 'MATH401',
        courseName: 'Discrete Mathematics',
        date: '2024-05-24',
        time: '13:00-15:00',
        room: 'B302',
        seat: 'A-15'
      }
    ],
    'Ujian Utama': [
      {
        id: '7',
        courseCode: 'ENG401',
        courseName: 'Technical Writing',
        date: '2024-06-10',
        time: '08:00-10:00',
        room: 'C201',
        seat: 'A-15'
      },
      {
        id: '8',
        courseCode: 'CS403',
        courseName: 'Database Systems',
        date: '2024-06-12',
        time: '10:00-12:00',
        room: 'B105',
        seat: 'A-15'
      }
    ]
  };

  const handleDownloadExamCard = (examType: 'UTS' | 'UAS' | 'Ujian Utama') => {
    const schedules = examSchedules[examType];
    const examContent = `
EXAM CARD - ${examType.toUpperCase()}
${user.name} - ${user.studentId}
Semester 7 - Academic Year 2023/2024

${schedules.map((exam, index) => 
  `${index + 1}. ${exam.courseCode} - ${exam.courseName}
     Date: ${new Date(exam.date).toLocaleDateString('en-US')}
     Time: ${exam.time}
     Room: ${exam.room}`
).join('\n\n')}

Print Date: ${new Date().toLocaleDateString('en-US')}
    `;
    
    const blob = new Blob([examContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExamCard_${examType}_${user.studentId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewExamSchedule = (examType: 'UTS' | 'UAS' | 'Ujian Utama') => {
    setSelectedExamType(examType);
    setShowExamModal(true);
  };

  const payments: Payment[] = [
    {
      id: '1',
      semester: 'Semester 7',
      type: 'SPP',
      amount: 4500000,
      dueDate: '2024-02-15',
      status: 'paid',
      paidDate: '2024-02-10'
    },
    {
      id: '2',
      semester: 'Semester 7',
      type: 'Praktikum',
      amount: 750000,
      dueDate: '2024-03-01',
      status: 'pending'
    },
    {
      id: '3',
      semester: 'Semester 8',
      type: 'SPP',
      amount: 4500000,
      dueDate: '2024-07-15',
      status: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'approved':
      case 'paid':
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'rejected':
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const calculateGPA = () => {
    const totalPoints = grades.reduce((sum, grade) => sum + (grade.gradePoints * grade.credits), 0);
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const handlePrintKRS = () => {
    const printContent = `
COURSE SELECTION SHEET
${user.name} - ${user.studentId}
Semester 7 - Academic Year 2023/2024

${currentKrsItems.map((item, index) => 
  `${index + 1}. ${item.courseCode} - ${item.courseName} (${item.credits} SKS)
     Lecturer: ${item.lecturer}
     Schedule: ${item.schedule}
     Room: ${item.room}
     Status: ${item.status}`
).join('\n\n')}

Total Credits: ${currentKrsItems.reduce((sum, item) => sum + item.credits, 0)}
Print Date: ${new Date().toLocaleDateString('en-US')}
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<pre>${printContent}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadKRS = () => {
    const krsContent = `
COURSE SELECTION SHEET
${user.name} - ${user.studentId}
Semester 7 - Academic Year 2023/2024

${currentKrsItems.map((item, index) => 
  `${index + 1}. ${item.courseCode} - ${item.courseName} (${item.credits} SKS)
     Lecturer: ${item.lecturer}
     Schedule: ${item.schedule}
     Room: ${item.room}
     Status: ${item.status}`
).join('\n\n')}

Total Credits: ${currentKrsItems.reduce((sum, item) => sum + item.credits, 0)}
Print Date: ${new Date().toLocaleDateString('en-US')}
    `;
    
    const blob = new Blob([krsContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CourseSelection_${user.studentId}_Semester7.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const tabs = [
    { id: 'krs', name: 'Course Selection', icon: FileText },
    { id: 'grades', name: 'Grades Summary', icon: Award },
    { id: 'exams', name: 'Exam Cards', icon: Calendar },
    { id: 'payment', name: 'Tuition Fees', icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic</h1>
          <p className="text-gray-600 mt-1">Manage your academic information and records</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* KRS Tab */}
          {activeTab === 'krs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Course Selection Sheet</h3>
                <div className="flex space-x-3">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </select>
                  <button 
                    onClick={handleDownloadKRS}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Course Selection</span>
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-purple-900">Semester:</span>
                    <span className="ml-2 text-purple-800">Semester {selectedSemester}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-900">Total Credits:</span>
                    <span className="ml-2 text-purple-800">{currentKrsItems.reduce((sum, item) => sum + item.credits, 0)} Credits</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-900">Status:</span>
                    <span className="ml-2 text-purple-800">Active</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Taken</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentKrsItems.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.courseCode}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.courseName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.schedule}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            item.courseCode.includes('401') || item.courseCode.includes('402') ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {item.courseCode.includes('401') || item.courseCode.includes('402') ? 'Mandatory' : 'Elective'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                        Total Credits:
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">
                        {currentKrsItems.reduce((sum, item) => sum + item.credits, 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Grades Summary</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Download Transcript</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cumulative GPA</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{calculateGPA()}</p>
                    </div>
                    <Award className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Credits</p>
                      <p className="text-2xl font-bold text-green-600 mt-1">{grades.reduce((sum, g) => sum + g.credits, 0)}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Courses</p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">{grades.length}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quality Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{grade.courseCode}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{grade.courseName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            grade.courseCode.includes('301') || grade.courseCode.includes('302') ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {grade.courseCode.includes('301') || grade.courseCode.includes('302') ? 'Mandatory' : 'Elective'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{grade.credits}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                            {grade.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{(grade.gradePoints * grade.credits).toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{grade.semester}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={2} className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                        Total:
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">
                        {grades.length} Courses
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">
                        {grades.reduce((sum, g) => sum + g.credits, 0)} Credits
                      </td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">
                        {grades.reduce((sum, g) => sum + (g.gradePoints * g.credits), 0).toFixed(1)} Points
                      </td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Exam Cards Tab */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Exam Cards</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examCards.map((card) => (
                  <div key={card.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-600">{card.type}</span>
                      </div>
                      <span className={getStatusBadge(card.status)}>
                        {card.status === 'active' ? 'Active' : 'Completed'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{card.title}</p>
                        <p className="text-sm text-gray-600">{card.subjectCount} subjects</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500">Period</p>
                          <p className="font-medium">{card.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Time</p>
                          <p className="font-medium">{card.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Room</p>
                          <p className="font-medium">{card.room}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => handleViewExamSchedule(card.type)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Schedule</span>
                      </button>
                      <button 
                        onClick={() => handleDownloadExamCard(card.type)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Card</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Tuition Fees</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{payment.semester}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{new Date(payment.dueDate).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadge(payment.status)}>
                            {payment.status === 'paid' ? 'Paid' : 
                             payment.status === 'pending' ? 'Pending' : 'Overdue'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            <Download className="w-4 h-4" />
                            <span>Download Form</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exam Schedule Modal */}
      {showExamModal && selectedExamType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{selectedExamType} Schedule</h2>
              <button 
                onClick={() => setShowExamModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examSchedules[selectedExamType].map((exam, index) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{exam.courseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{new Date(exam.date).toLocaleDateString('en-US')}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{exam.time}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{exam.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowExamModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => handleDownloadExamCard(selectedExamType)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download {selectedExamType} Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academic;