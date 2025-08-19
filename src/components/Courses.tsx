import React, { useState } from 'react';
import {
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Search,
  AlertCircle
} from 'lucide-react';
import type { ClassSchedule, Subject, ClassGroup } from '@/types';

interface CoursesProps {
  userRole?: string;
}

const Courses: React.FC<CoursesProps> = ({ userRole = 'student' }) => {
  const [classInput, setClassInput] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  
  // Sample data for different class groups
  const classGroups: ClassGroup[] = [
    {
      id: '1',
      code: '4KA21',
      year: 4,
      program: 'KA',
      section: '21',
      totalStudents: 35,
      academicYear: '2023/2024',
      advisor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      code: '4KA20',
      year: 4,
      program: 'KA',
      section: '20',
      totalStudents: 32,
      academicYear: '2023/2024',
      advisor: 'Prof. Michael Chen'
    },
    {
      id: '3',
      code: '3SI15',
      year: 3,
      program: 'SI',
      section: '15',
      totalStudents: 38,
      academicYear: '2023/2024',
      advisor: 'Dr. Emily Rodriguez'
    }
  ];

  const subjects: Subject[] = [
    {
      id: '1',
      code: 'ALG401',
      name: 'Algoritma Lanjut',
      credits: 3,
      semester: 7,
      lecturer: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      code: 'SCI401',
      name: 'Sains Komputer',
      credits: 2,
      semester: 7,
      lecturer: 'Prof. Michael Chen'
    },
    {
      id: '3',
      code: 'MAT401',
      name: 'Matematika Diskrit',
      credits: 3,
      semester: 7,
      lecturer: 'Dr. Emily Rodriguez'
    },
    {
      id: '4',
      code: 'ENG401',
      name: 'Bahasa Inggris Teknik',
      credits: 2,
      semester: 7,
      lecturer: 'Prof. James Wilson'
    },
    {
      id: '5',
      code: 'DB401',
      name: 'Basis Data',
      credits: 3,
      semester: 7,
      lecturer: 'Dr. Lisa Park'
    }
  ];

  // Sample schedules for different classes
  const schedules: { [key: string]: ClassSchedule[] } = {
    '4KA21': [
      {
        id: '1',
        classGroupId: '1',
        subjectId: '1',
        day: 'Tuesday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'B231',
        lecturer: 'Dr. Sarah Johnson',
        semester: 'Semester 7'
      },
      {
        id: '2',
        classGroupId: '1',
        subjectId: '2',
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '12:00',
        room: 'A102',
        lecturer: 'Prof. Michael Chen',
        semester: 'Semester 7'
      },
      {
        id: '3',
        classGroupId: '1',
        subjectId: '3',
        day: 'Thursday',
        startTime: '13:00',
        endTime: '15:00',
        room: 'B302',
        lecturer: 'Dr. Emily Rodriguez',
        semester: 'Semester 7'
      }
    ],
    '4KA20': [
      {
        id: '4',
        classGroupId: '2',
        subjectId: '1',
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'B233',
        lecturer: 'Dr. Sarah Johnson',
        semester: 'Semester 7'
      },
      {
        id: '5',
        classGroupId: '2',
        subjectId: '4',
        day: 'Tuesday',
        startTime: '13:00',
        endTime: '15:00',
        room: 'C201',
        lecturer: 'Prof. James Wilson',
        semester: 'Semester 7'
      },
      {
        id: '6',
        classGroupId: '2',
        subjectId: '5',
        day: 'Friday',
        startTime: '10:00',
        endTime: '12:00',
        room: 'B105',
        lecturer: 'Dr. Lisa Park',
        semester: 'Semester 7'
      }
    ],
    '3SI15': [
      {
        id: '7',
        classGroupId: '3',
        subjectId: '2',
        day: 'Monday',
        startTime: '10:00',
        endTime: '12:00',
        room: 'A201',
        lecturer: 'Prof. Michael Chen',
        semester: 'Semester 5'
      },
      {
        id: '8',
        classGroupId: '3',
        subjectId: '3',
        day: 'Wednesday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'B401',
        lecturer: 'Dr. Emily Rodriguez',
        semester: 'Semester 5'
      }
    ]
  };

  const handleSearch = () => {
    const classCode = classInput.toUpperCase().trim();
    if (schedules[classCode]) {
      setSelectedClass(classCode);
    } else {
      setSelectedClass('');
    }
  };

  const getSubjectById = (id: string) => {
    return subjects.find(s => s.id === id);
  };

  const getClassGroupByCode = (code: string) => {
    return classGroups.find(c => c.code === code);
  };

  const currentSchedule = selectedClass ? schedules[selectedClass] || [] : [];
  const currentClassGroup = selectedClass ? getClassGroupByCode(selectedClass) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="text-gray-600 mt-1">
            Enter your class code to view the schedule
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="classInput" className="block text-sm font-medium text-gray-700 mb-2">
              Class Code
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="classInput"
                type="text"
                value={classInput}
                onChange={(e) => setClassInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter class code (e.g., 4KA21, 4KA20, 3SI15)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
            >
              Search Schedule
            </button>
          </div>
        </div>
        
        {/* Available Classes Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Available Classes:</strong> 4KA21, 4KA20, 3SI15
          </p>
        </div>
      </div>

      {/* Class Information */}
      {selectedClass && currentClassGroup && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{currentClassGroup.code}</h2>
              <p className="text-blue-100 mt-1">
                {currentClassGroup.program} Program • Year {currentClassGroup.year} • {currentClassGroup.totalStudents} Students
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm font-medium">Class Advisor</p>
                <p className="text-lg font-bold">{currentClassGroup.advisor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Table */}
      {selectedClass && currentSchedule.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Schedule for Class {selectedClass}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lecturer</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSchedule.map((schedule) => {
                  const subject = getSubjectById(schedule.subjectId);
                  return (
                    <tr key={schedule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{schedule.day}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-900">{schedule.startTime} - {schedule.endTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{subject?.code}</div>
                          <div className="text-sm text-gray-500">{subject?.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-purple-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{schedule.room}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-orange-500 mr-2" />
                          <span className="text-sm text-gray-900">{schedule.lecturer}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : selectedClass && currentSchedule.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedule Found</h3>
            <p className="text-gray-600">
              No schedule available for class {selectedClass}.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Courses;