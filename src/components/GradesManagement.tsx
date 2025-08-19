import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Save,
  X,
  BookOpen,
  TrendingUp,
  Users,
  BarChart3,
  Download,
  Upload
} from 'lucide-react';
import type { Student } from '@/types';

interface GradesManagementProps {
  allStudents: Student[];
  onStudentsUpdate?: (students: Student[]) => void;
}

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoints: number;
  semester: string;
  year: string;
}

const GradesManagement: React.FC<GradesManagementProps> = ({ allStudents, onStudentsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentGrades, setShowStudentGrades] = useState(false);
  const [showEditGradeModal, setShowEditGradeModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const handleExportGrades = () => {
    const headers = ['Student ID', 'Student Name', 'Course Code', 'Course Name', 'Credits', 'Grade', 'Grade Points', 'Semester'];
    const rows = allStudents.flatMap(student => {
      const studentGrades = getGradesForStudent(student.studentId);
      return studentGrades.map(grade => [
        grade.studentId,
        grade.studentName,
        grade.courseCode,
        grade.courseName,
        grade.credits.toString(),
        grade.grade,
        grade.gradePoints.toString(),
        grade.semester
      ]);
    });
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Sample grades data for each student
  const getGradesForStudent = (studentId: string): Grade[] => {
    const gradesByStudent: { [key: string]: Grade[] } = {
      'STU2024001': [
        {
          id: '1',
          studentId: 'STU2024001',
          studentName: 'Maria Gonzalez',
          courseCode: 'CS401',
          courseName: 'Advanced Data Structures',
          credits: 3,
          grade: 'A',
          gradePoints: 4.0,
          semester: 'Semester 7',
          year: '2023'
        },
        {
          id: '2',
          studentId: 'STU2024001',
          studentName: 'Maria Gonzalez',
          courseCode: 'CS402',
          courseName: 'Software Engineering',
          credits: 3,
          grade: 'A-',
          gradePoints: 3.7,
          semester: 'Semester 7',
          year: '2023'
        }
      ],
      'STU2024002': [
        {
          id: '3',
          studentId: 'STU2024002',
          studentName: 'Chen Wei',
          courseCode: 'BUS301',
          courseName: 'Business Strategy',
          credits: 3,
          grade: 'A',
          gradePoints: 4.0,
          semester: 'Semester 8',
          year: '2023'
        },
        {
          id: '4',
          studentId: 'STU2024002',
          studentName: 'Chen Wei',
          courseCode: 'BUS302',
          courseName: 'Marketing Management',
          credits: 3,
          grade: 'A-',
          gradePoints: 3.7,
          semester: 'Semester 8',
          year: '2023'
        }
      ],
      'STU2024003': [
        {
          id: '5',
          studentId: 'STU2024003',
          studentName: 'Priya Sharma',
          courseCode: 'ENG201',
          courseName: 'Engineering Mathematics',
          credits: 4,
          grade: 'B+',
          gradePoints: 3.3,
          semester: 'Semester 5',
          year: '2023'
        }
      ]
    };
    return gradesByStudent[studentId] || [];
  };

  const handleViewStudentGrades = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentGrades(true);
  };

  const handleEditGrade = (grade: Grade) => {
    setEditingGrade(grade);
    setShowEditGradeModal(true);
  };

  const handleSaveGrade = () => {
    // In a real app, this would save to the backend
    setShowEditGradeModal(false);
    setEditingGrade(null);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allGrades = allStudents.flatMap(student => getGradesForStudent(student.studentId));
  const stats = {
    totalStudents: allStudents.length,
    totalGrades: allGrades.length,
    averageGPA: allGrades.length > 0 ? (allGrades.reduce((sum, grade) => sum + grade.gradePoints, 0) / allGrades.length).toFixed(2) : '0.00',
    aGrades: allGrades.filter(g => g.grade.startsWith('A')).length,
    pendingGrades: 5 // Mock pending grades
  };

  if (showStudentGrades && selectedStudent) {
    const studentGrades = getGradesForStudent(selectedStudent.studentId);
    
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowStudentGrades(false)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <span>← Back to Students</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedStudent.name} - Grades</h1>
            <p className="text-gray-600">{selectedStudent.studentId} • {selectedStudent.program}</p>
          </div>
        </div>

        {/* Student Grades Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Course Grades ({studentGrades.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{grade.courseCode}</div>
                      <div className="text-sm text-gray-500">{grade.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.gradePoints}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.semester}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEditGrade(grade)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Grade"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Grade Modal */}
        {showEditGradeModal && editingGrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit Grade</h2>
                <button 
                  onClick={() => setShowEditGradeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input
                    type="text"
                    value={`${editingGrade.courseCode} - ${editingGrade.courseName}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                  <select
                    value={editingGrade.grade}
                    onChange={(e) => setEditingGrade(prev => prev ? { ...prev, grade: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A">A (4.0)</option>
                    <option value="A-">A- (3.7)</option>
                    <option value="B+">B+ (3.3)</option>
                    <option value="B">B (3.0)</option>
                    <option value="B-">B- (2.7)</option>
                    <option value="C+">C+ (2.3)</option>
                    <option value="C">C (2.0)</option>
                    <option value="C-">C- (1.7)</option>
                    <option value="D+">D+ (1.3)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  onClick={() => setShowEditGradeModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveGrade}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Grade</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grades Management</h1>
          <p className="text-gray-600 mt-1">Select a student to view and manage their grades</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={handleExportGrades}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Grades</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalGrades}</p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average GPA</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.averageGPA}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">A Grades</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{stats.aGrades}</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Students ({filteredStudents.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => {
            const studentGrades = getGradesForStudent(student.studentId);
            const studentGPA = studentGrades.length > 0 
              ? (studentGrades.reduce((sum, grade) => sum + grade.gradePoints, 0) / studentGrades.length).toFixed(2)
              : '0.00';
            
            return (
              <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{student.studentId}</span>
                        <span>{student.program}</span>
                        <span>{student.country}</span>
                        <span className="font-medium">GPA: {studentGPA}</span>
                        <span>{studentGrades.length} courses</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewStudentGrades(student)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Grades
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GradesManagement;