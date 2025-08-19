// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'academic_admin' | 'international_admin';
  studentId?: string;
  country?: string;
  program?: string;
  year?: string;
  gpa?: number;
  avatar: string;
  department?: string;
  position?: string;
  classGroup?: string;
}

// Class and Academic types
export interface ClassGroup {
  id: string;
  code: string;
  year: number;
  program: string;
  section: string;
  totalStudents: number;
  academicYear: string;
  advisor: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  lecturer: string;
  description?: string;
}

export interface ClassSchedule {
  id: string;
  classGroupId: string;
  subjectId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  lecturer: string;
  semester: string;
}

export interface StudentClassInfo {
  studentId: string;
  classGroupId: string;
  enrollmentDate: string;
  status: 'active' | 'transferred' | 'graduated';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  grade?: string;
  progress: number;
  semester: string;
  students?: number;
  room?: string;
  classGroup?: string;
}

// Document and Calendar types
export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending' | 'approved' | 'rejected';
  expiryDate?: string;
  uploadDate: string;
  studentId?: string;
  studentName?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'academic' | 'personal' | 'deadline' | 'immigration' | 'orientation' | 'meeting';
  location?: string;
  studentId?: string;
  studentName?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
  userId?: string;
}

// Student and Financial types
export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  country: string;
  program: string;
  year: string;
  gpa: number;
  avatar: string;
  status: 'active' | 'inactive' | 'graduated';
  visaStatus: 'valid' | 'expiring' | 'expired';
  enrollmentDate: string;
  classGroup?: string;
  classGroup?: string;
}

export interface FinancialAid {
  id: string;
  studentId: string;
  studentName: string;
  type: 'scholarship' | 'grant' | 'loan' | 'work_study';
  amount: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  semester: string;
  description: string;
  disbursementDate?: string;
}

export interface VisaStatus {
  id: string;
  studentId: string;
  visaType: string;
  status: 'valid' | 'expiring' | 'expired' | 'processing';
  issueDate: string;
  expiryDate: string;
  i20Status: 'valid' | 'expiring' | 'expired';
  sevisStatus: 'active' | 'inactive';
  workAuthorization: string;
}

// Lab types for Gunadarma system
export interface LabInfo {
  id: string;
  name: string;
  code: string;
  type: 'computer' | 'language' | 'science' | 'engineering';
  capacity: number;
  location: string;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  supervisor: string;
  operatingHours: {
    start: string;
    end: string;
  };
}

export interface LabSchedule {
  id: string;
  labId: string;
  subject: string;
  classGroup: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  instructor: string;
  activity: string;
}

// Dummy export to ensure module is not empty at runtime
export const DUMMY_EXPORT = true;