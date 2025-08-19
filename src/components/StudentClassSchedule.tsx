import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, Users, ChevronLeft, ChevronRight, Download, Printer as Print } from 'lucide-react';
import type { ClassSchedule, Subject, ClassGroup } from '@/types';

interface StudentClassScheduleProps {
  studentClassGroup: string; // e.g., "4KA21"
}

const StudentClassSchedule: React.FC<StudentClassScheduleProps> = ({ studentClassGroup }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Sample data for the student's class group
  const classGroup: ClassGroup = {
    id: '1',
    code: studentClassGroup,
    year: 4,
    program: 'KA',
    section: '21',
    totalStudents: 35,
    academicYear: '2023/2024',
    advisor: 'Dr. Sarah Johnson'
  };

  const subjects: Subject[] = [
    {
      id: '1',
      code: 'CS401',
      name: 'Advanced Data Structures',
      credits: 3,
      semester: 7,
      lecturer: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      code: 'CS402',
      name: 'Software Engineering',
      credits: 3,
      semester: 7,
      lecturer: 'Prof. Michael Chen'
    },
    {
      id: '3',
      code: 'MATH401',
      name: 'Discrete Mathematics',
      credits: 2,
      semester: 7,
      lecturer: 'Dr. Emily Rodriguez'
    },
    {
      id: '4',
      code: 'ENG401',
      name: 'Technical Writing',
      credits: 2,
      semester: 7,
      lecturer: 'Prof. James Wilson'
    },
    {
      id: '5',
      code: 'CS403',
      name: 'Database Systems',
      credits: 3,
      semester: 7,
      lecturer: 'Dr. Lisa Park'
    }
  ];

  const schedules: ClassSchedule[] = [
    {
      id: '1',
      classGroupId: '1',
      subjectId: '1',
      day: 'Monday',
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
      day: 'Monday',
      startTime: '10:30',
      endTime: '12:30',
      room: 'A102',
      lecturer: 'Prof. Michael Chen',
      semester: 'Semester 7'
    },
    {
      id: '3',
      classGroupId: '1',
      subjectId: '3',
      day: 'Tuesday',
      startTime: '08:00',
      endTime: '10:00',
      room: 'B302',
      lecturer: 'Dr. Emily Rodriguez',
      semester: 'Semester 7'
    },
    {
      id: '4',
      classGroupId: '1',
      subjectId: '4',
      day: 'Tuesday',
      startTime: '13:00',
      endTime: '15:00',
      room: 'C201',
      lecturer: 'Prof. James Wilson',
      semester: 'Semester 7'
    },
    {
      id: '5',
      classGroupId: '1',
      subjectId: '5',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '12:00',
      room: 'B105',
      lecturer: 'Dr. Lisa Park',
      semester: 'Semester 7'
    },
    {
      id: '6',
      classGroupId: '1',
      subjectId: '1',
      day: 'Thursday',
      startTime: '08:00',
      endTime: '10:00',
      room: 'B231',
      lecturer: 'Dr. Sarah Johnson',
      semester: 'Semester 7'
    },
    {
      id: '7',
      classGroupId: '1',
      subjectId: '2',
      day: 'Friday',
      startTime: '13:00',
      endTime: '15:00',
      room: 'A102',
      lecturer: 'Prof. Michael Chen',
      semester: 'Semester 7'
    }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getSubjectById = (id: string) => {
    return subjects.find(s => s.id === id);
  };

  const getScheduleForDayAndTime = (day: string, time: string) => {
    return schedules.find(schedule => {
      const scheduleStart = schedule.startTime;
      const scheduleEnd = schedule.endTime;
      return schedule.day === day && time >= scheduleStart && time < scheduleEnd;
    });
  };

  const getSchedulesForDay = (day: string) => {
    return schedules.filter(schedule => schedule.day === day).sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  };

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
          <p className="text-gray-600 mt-1">Your weekly schedule for class {studentClassGroup}</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Print className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Class Info */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{classGroup.code}</h2>
            <p className="text-purple-100 mt-1">
              {classGroup.program} Program • Year {classGroup.year} • Academic Year {classGroup.academicYear}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm font-medium">Class Advisor</p>
              <p className="text-lg font-bold">{classGroup.advisor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{subjects.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{totalCredits}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Class Size</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{classGroup.totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
            <Users className="w-8 h-8 text-indigo-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Hours</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{schedules.length * 2}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Schedule Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Time</th>
                    {days.map(day => (
                      <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50">
                        {time}
                      </td>
                      {days.map(day => {
                        const schedule = getScheduleForDayAndTime(day, time);
                        const subject = schedule ? getSubjectById(schedule.subjectId) : null;
                        
                        return (
                          <td key={`${day}-${time}`} className="px-2 py-3 text-center border-l border-gray-200">
                            {schedule && subject ? (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs">
                                <div className="font-medium text-blue-900">{subject.code}</div>
                                <div className="text-blue-700">{schedule.room}</div>
                              </div>
                            ) : (
                              <div className="h-12"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Daily Schedule List */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
            <div className="space-y-3">
              {getSchedulesForDay('Monday').map((schedule) => {
                const subject = getSubjectById(schedule.subjectId);
                return (
                  <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{subject?.code}</h4>
                      <span className="text-sm text-gray-500">{schedule.startTime} - {schedule.endTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{subject?.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{schedule.room}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{schedule.lecturer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject List</h3>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{subject.code}</div>
                    <div className="text-sm text-gray-500">{subject.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{subject.credits} credits</div>
                    <div className="text-xs text-gray-500">{subject.lecturer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentClassSchedule;