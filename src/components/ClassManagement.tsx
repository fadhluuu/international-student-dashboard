import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Plus,
  Edit3,
  Trash2,
  Save,
  X
} from 'lucide-react';
import type { Student, ClassGroup, Subject, ClassSchedule } from '@/types';

interface ClassManagementProps {
  students: Student[];
}

const ClassManagement: React.FC<ClassManagementProps> = ({ students }) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'subjects' | 'schedules'>('groups');
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Partial<ClassGroup>>({});
  const [editingSubject, setEditingSubject] = useState<Partial<Subject>>({});
  const [editingSchedule, setEditingSchedule] = useState<Partial<ClassSchedule>>({});
  const [showViewStudentsModal, setShowViewStudentsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ClassGroup | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ClassSchedule | null>(null);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);

  // Sample data
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([
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
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
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
    }
  ]);

  const [schedules, setSchedules] = useState<ClassSchedule[]>([
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
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '12:00',
      room: 'A102',
      lecturer: 'Prof. Michael Chen',
      semester: 'Semester 7'
    }
  ]);

  const tabs = [
    { id: 'groups', name: 'Class Groups', icon: Users },
    { id: 'subjects', name: 'Subjects', icon: BookOpen },
    { id: 'schedules', name: 'Schedules', icon: Calendar }
  ];

  const handleAddClassGroup = () => {
    setEditingGroup({
      code: '',
      year: 1,
      program: '',
      section: '',
      totalStudents: 0,
      academicYear: '2023/2024',
      advisor: ''
    });
    setShowAddGroupModal(true);
  };

  const handleAddSubject = () => {
    setEditingSubject({
      code: '',
      name: '',
      credits: 0,
      semester: 1,
      lecturer: ''
    });
    setShowAddSubjectModal(true);
  };

  const handleAddSchedule = () => {
    setEditingSchedule({
      classGroupId: '',
      subjectId: '',
      day: 'Monday',
      startTime: '',
      endTime: '',
      room: '',
      lecturer: '',
      semester: ''
    });
    setShowAddScheduleModal(true);
  };

  const handleSaveGroup = () => {
    const newGroup: ClassGroup = {
      ...editingGroup as ClassGroup,
      id: Date.now().toString()
    };
    setClassGroups(prev => [...prev, newGroup]);
    setShowAddGroupModal(false);
    setEditingGroup({});
  };

  const handleSaveSubject = () => {
    const newSubject: Subject = {
      ...editingSubject as Subject,
      id: Date.now().toString()
    };
    setSubjects(prev => [...prev, newSubject]);
    setShowAddSubjectModal(false);
    setEditingSubject({});
  };

  const handleSaveSchedule = () => {
    const newSchedule: ClassSchedule = {
      ...editingSchedule as ClassSchedule,
      id: Date.now().toString()
    };
    setSchedules(prev => [...prev, newSchedule]);
    setShowAddScheduleModal(false);
    setEditingSchedule({});
  };

  const handleViewStudents = (group: ClassGroup) => {
    setSelectedGroup(group);
    setShowViewStudentsModal(true);
  };

  const handleEditGroup = (group: ClassGroup) => {
    setEditingGroup(group);
    setSelectedGroup(group);
    setShowEditGroupModal(true);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this class group?')) {
      setClassGroups(prev => prev.filter(g => g.id !== groupId));
    }
  };

  const handleUpdateGroup = () => {
    if (!selectedGroup) return;
    
    const updatedGroups = classGroups.map(g => 
      g.id === selectedGroup.id ? { ...editingGroup as ClassGroup } : g
    );
    setClassGroups(updatedGroups);
    setShowEditGroupModal(false);
    setEditingGroup({});
    setSelectedGroup(null);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setSelectedSubject(subject);
    setShowEditSubjectModal(true);
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(prev => prev.filter(s => s.id !== subjectId));
    }
  };

  const handleUpdateSubject = () => {
    if (!selectedSubject) return;
    
    const updatedSubjects = subjects.map(s => 
      s.id === selectedSubject.id ? { ...editingSubject as Subject } : s
    );
    setSubjects(updatedSubjects);
    setShowEditSubjectModal(false);
    setEditingSubject({});
    setSelectedSubject(null);
  };

  const handleEditSchedule = (schedule: ClassSchedule) => {
    setEditingSchedule(schedule);
    setSelectedSchedule(schedule);
    setShowEditScheduleModal(true);
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
    }
  };

  const handleUpdateSchedule = () => {
    if (!selectedSchedule) return;
    
    const updatedSchedules = schedules.map(s => 
      s.id === selectedSchedule.id ? { ...editingSchedule as ClassSchedule } : s
    );
    setSchedules(updatedSchedules);
    setShowEditScheduleModal(false);
    setEditingSchedule({});
    setSelectedSchedule(null);
  };

  // Get students for selected class group
  const getStudentsForGroup = (groupCode: string) => {
    return students.filter(student => student.classGroup === groupCode);
  };
  const getSubjectById = (id: string) => {
    return subjects.find(s => s.id === id);
  };

  const getClassGroupById = (id: string) => {
    return classGroups.find(g => g.id === id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-1">Manage class groups, subjects, and schedules</p>
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
          {/* Class Groups Tab */}
          {activeTab === 'groups' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Class Groups</h3>
                <button 
                  onClick={handleAddClassGroup}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Class Group</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classGroups.map((group) => (
                  <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{group.code}</h4>
                        <p className="text-sm text-gray-600">{group.program} Program</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditGroup(group)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Edit Class Group"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Class Group"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-medium">{group.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{group.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Advisor:</span>
                        <span className="font-medium">{group.advisor}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => handleViewStudents(group)}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Users className="w-4 h-4" />
                        <span>View Students</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects Tab */}
          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Subjects</h3>
                <button 
                  onClick={handleAddSubject}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Subject</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lecturer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{subject.code}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{subject.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{subject.credits}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{subject.semester}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{subject.lecturer}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditSubject(subject)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit Subject"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteSubject(subject.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Subject"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Schedules Tab */}
          {activeTab === 'schedules' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Class Schedules</h3>
                <button 
                  onClick={handleAddSchedule}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Schedule</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class Group</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lecturer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {schedules.map((schedule) => {
                      const subject = getSubjectById(schedule.subjectId);
                      const classGroup = getClassGroupById(schedule.classGroupId);
                      return (
                        <tr key={schedule.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {classGroup?.code}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div>
                              <div className="font-medium">{subject?.code}</div>
                              <div className="text-gray-500">{subject?.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{schedule.day}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {schedule.startTime} - {schedule.endTime}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{schedule.room}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{schedule.lecturer}</td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditSchedule(schedule)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit Schedule"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteSchedule(schedule.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete Schedule"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Class Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Class Group</h2>
              <button 
                onClick={() => setShowAddGroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Code</label>
                <input
                  type="text"
                  value={editingGroup.code || ''}
                  onChange={(e) => setEditingGroup(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4KA21"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                  <input
                    type="text"
                    value={editingGroup.program || ''}
                    onChange={(e) => setEditingGroup(prev => ({ ...prev, program: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., KA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={editingGroup.year || ''}
                    onChange={(e) => setEditingGroup(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Advisor</label>
                <input
                  type="text"
                  value={editingGroup.advisor || ''}
                  onChange={(e) => setEditingGroup(prev => ({ ...prev, advisor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowAddGroupModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Class Group</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Subject</h2>
              <button 
                onClick={() => setShowAddSubjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                <input
                  type="text"
                  value={editingSubject.code || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., CS401"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                <input
                  type="text"
                  value={editingSubject.name || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Advanced Data Structures"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    value={editingSubject.credits || ''}
                    onChange={(e) => setEditingSubject(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <input
                    type="number"
                    value={editingSubject.semester || ''}
                    onChange={(e) => setEditingSubject(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lecturer</label>
                <input
                  type="text"
                  value={editingSubject.lecturer || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, lecturer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowAddSubjectModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Subject</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Schedule</h2>
              <button 
                onClick={() => setShowAddScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Group</label>
                <select
                  value={editingSchedule.classGroupId || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, classGroupId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Class Group</option>
                  {classGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.code}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={editingSchedule.subjectId || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.code} - {subject.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={editingSchedule.day || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, day: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={editingSchedule.startTime || ''}
                    onChange={(e) => setEditingSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={editingSchedule.endTime || ''}
                    onChange={(e) => setEditingSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input
                  type="text"
                  value={editingSchedule.room || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., B231"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lecturer</label>
                <input
                  type="text"
                  value={editingSchedule.lecturer || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, lecturer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowAddScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveSchedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {showEditSubjectModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Subject</h2>
              <button 
                onClick={() => setShowEditSubjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Code</label>
                <input
                  type="text"
                  value={editingSubject.code || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., CS401"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                <input
                  type="text"
                  value={editingSubject.name || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Advanced Data Structures"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                  <input
                    type="number"
                    value={editingSubject.credits || ''}
                    onChange={(e) => setEditingSubject(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <input
                    type="number"
                    value={editingSubject.semester || ''}
                    onChange={(e) => setEditingSubject(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lecturer</label>
                <input
                  type="text"
                  value={editingSubject.lecturer || ''}
                  onChange={(e) => setEditingSubject(prev => ({ ...prev, lecturer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowEditSubjectModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateSubject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Subject</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {showEditScheduleModal && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Schedule</h2>
              <button 
                onClick={() => setShowEditScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Group</label>
                <select
                  value={editingSchedule.classGroupId || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, classGroupId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Class Group</option>
                  {classGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.code}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  value={editingSchedule.subjectId || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.code} - {subject.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={editingSchedule.day || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, day: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={editingSchedule.startTime || ''}
                    onChange={(e) => setEditingSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={editingSchedule.endTime || ''}
                    onChange={(e) => setEditingSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input
                  type="text"
                  value={editingSchedule.room || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, room: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., B231"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lecturer</label>
                <input
                  type="text"
                  value={editingSchedule.lecturer || ''}
                  onChange={(e) => setEditingSchedule(prev => ({ ...prev, lecturer: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowEditScheduleModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateSchedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Students Modal */}
      {showViewStudentsModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Students in Class {selectedGroup.code}
              </h2>
              <button 
                onClick={() => setShowViewStudentsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-purple-900">Class:</span>
                    <span className="ml-2 text-purple-800">{selectedGroup.code}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-900">Program:</span>
                    <span className="ml-2 text-purple-800">{selectedGroup.program}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-900">Total Students:</span>
                    <span className="ml-2 text-purple-800">{selectedGroup.totalStudents}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-900">Advisor:</span>
                    <span className="ml-2 text-purple-800">{selectedGroup.advisor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getStudentsForGroup(selectedGroup.code).map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.gpa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {getStudentsForGroup(selectedGroup.code).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No students found in this class group.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Group Modal */}
      {showEditGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Class Group</h2>
              <button 
                onClick={() => setShowEditGroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class Code</label>
                <input
                  type="text"
                  value={editingGroup.code || ''}
                  onChange={(e) => setEditingGroup(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4KA21"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
                  <input
                    type="text"
                    value={editingGroup.program || ''}
                    onChange={(e) => setEditingGroup(prev => ({ ...prev, program: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., KA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    value={editingGroup.year || ''}
                    onChange={(e) => setEditingGroup(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Advisor</label>
                <input
                  type="text"
                  value={editingGroup.advisor || ''}
                  onChange={(e) => setEditingGroup(prev => ({ ...prev, advisor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => setShowEditGroupModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Class Group</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;