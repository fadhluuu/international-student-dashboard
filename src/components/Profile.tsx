import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Book, 
  Award,
  Edit3,
  Camera,
  Globe,
  FileText,
  Shield,
  Settings
} from 'lucide-react';
import type { User } from '@/types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({
    firstName: 'Maria',
    lastName: 'Gonzalez',
    email: user.email,
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1999-06-15',
    nationality: 'Mexican',
    address: '123 University Ave, Apt 4B',
    city: 'College Town',
    state: 'CA',
    zipCode: '90210'
  });
  
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only JPG, PNG, or GIF files.');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }
      
      // In a real app, you would upload the file to a server
      // For now, we'll just show a success message
      alert('Profile picture updated successfully!');
    }
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setEditedPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePersonalInfo = () => {
    // In a real app, this would save to the backend
    alert('Personal information updated successfully!');
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset to original values
    setEditedPersonalInfo({
      firstName: 'Maria',
      lastName: 'Gonzalez',
      email: user.email,
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1999-06-15',
      nationality: 'Mexican',
      address: '123 University Ave, Apt 4B',
      city: 'College Town',
      state: 'CA',
      zipCode: '90210'
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: UserIcon },
    { id: 'academic', name: 'Academic', icon: Book },
    { id: 'immigration', name: 'Immigration', icon: Globe },
  ];

  const personalInfo = {
    ...editedPersonalInfo,
    emergencyContact: {
      name: 'Carlos Gonzalez',
      relationship: 'Father',
      phone: '+52 55 1234 5678',
      email: 'carlos.gonzalez@email.com'
    }
  };

  const academicInfo = {
    studentId: user.studentId,
    program: user.program,
    major: 'Computer Science',
    year: user.year,
    gpa: user.gpa,
    advisor: 'Dr. Sarah Johnson',
    advisorEmail: 'sarah.johnson@university.edu'
  };

  const immigrationInfo = {
    visaType: 'F-1',
    visaStatus: 'Active',
    visaExpiry: '2025-08-15',
    i20Number: 'N0123456789',
    sevisId: 'N0123456789',
    passportNumber: 'MX1234567',
    passportExpiry: '2026-05-12',
    workAuthorization: 'On-Campus Only'
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Information</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePersonalInfo}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <input
            type="text"
            value={personalInfo.nationality}
            onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isEditing ? 'bg-gray-50' : ''
            }`}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? 'bg-gray-50' : ''
              }`}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={personalInfo.city}
              onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? 'bg-gray-50' : ''
              }`}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={personalInfo.state}
              onChange={(e) => handlePersonalInfoChange('state', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? 'bg-gray-50' : ''
              }`}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
            <input
              type="text"
              value={personalInfo.zipCode}
              onChange={(e) => handlePersonalInfoChange('zipCode', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                !isEditing ? 'bg-gray-50' : ''
              }`}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
          <input
            type="text"
            value={academicInfo.studentId}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
          <input
            type="text"
            value={academicInfo.program}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
          <input
            type="text"
            value={academicInfo.major}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
          <input
            type="text"
            value="Faculty of Computer Science and Information Technology"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Study Location</label>
          <input
            type="text"
            value="Depok"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <input
            type="text"
            value="4KA21"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
      </div>

    </div>
  );

  const renderImmigrationInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Type</label>
          <input
            type="text"
            value={immigrationInfo.visaType}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Status</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={immigrationInfo.visaStatus}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Visa Expiry</label>
          <input
            type="date"
            value={immigrationInfo.visaExpiry}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">I-20 Number</label>
          <input
            type="text"
            value={immigrationInfo.i20Number}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SEVIS ID</label>
          <input
            type="text"
            value={immigrationInfo.sevisId}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            readOnly
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Passport Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passport Number</label>
            <input
              type="text"
              value={immigrationInfo.passportNumber}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passport Expiry</label>
            <input
              type="date"
              value={immigrationInfo.passportExpiry}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'academic':
        return renderAcademicInfo();
      case 'immigration':
        return renderImmigrationInfo();
      case 'emergency':
        return (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Emergency Contacts</h3>
            <p className="text-gray-600">Manage your emergency contact information</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings</h3>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
            />
            <button 
              onClick={() => document.getElementById('profile-picture-upload')?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors duration-200"
              title="Change profile picture"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              type="file"
              id="profile-picture-upload"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-purple-100">{user.studentId} • {user.program}</p>
            <p className="text-purple-100">{user.year} • From {user.country}</p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
            </div>
            
            {renderTabContent()}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;