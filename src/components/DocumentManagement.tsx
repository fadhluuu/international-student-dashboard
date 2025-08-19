import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Eye, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  X
} from 'lucide-react';
import type { Document, Student } from '@/types';

interface DocumentManagementProps {
  allStudents: Student[];
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({ allStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Sample documents from all international students
  const [allDocuments] = useState<Document[]>([
    // Maria Gonzalez documents
    {
      id: '1',
      name: 'I-20 Form',
      type: 'Immigration',
      status: 'valid',
      expiryDate: '2024-08-15',
      uploadDate: '2023-08-15',
      studentId: 'STU2024001',
      studentName: 'Maria Gonzalez'
    },
    {
      id: '2',
      name: 'F-1 Visa',
      type: 'Immigration',
      status: 'valid',
      expiryDate: '2025-08-15',
      uploadDate: '2023-08-15',
      studentId: 'STU2024001',
      studentName: 'Maria Gonzalez'
    },
    {
      id: '3',
      name: 'Passport',
      type: 'Identity',
      status: 'valid',
      expiryDate: '2026-05-12',
      uploadDate: '2023-01-15',
      studentId: 'STU2024001',
      studentName: 'Maria Gonzalez'
    },
    // Chen Wei documents
    {
      id: '4',
      name: 'I-20 Form',
      type: 'Immigration',
      status: 'expiring',
      expiryDate: '2024-03-20',
      uploadDate: '2022-03-20',
      studentId: 'STU2024002',
      studentName: 'Chen Wei'
    },
    {
      id: '5',
      name: 'F-1 Visa',
      type: 'Immigration',
      status: 'expiring',
      expiryDate: '2024-03-20',
      uploadDate: '2022-03-20',
      studentId: 'STU2024002',
      studentName: 'Chen Wei'
    },
    {
      id: '6',
      name: 'Health Insurance Card',
      type: 'Health',
      status: 'valid',
      expiryDate: '2024-12-31',
      uploadDate: '2024-01-01',
      studentId: 'STU2024002',
      studentName: 'Chen Wei'
    },
    // Priya Sharma documents
    {
      id: '7',
      name: 'I-20 Form',
      type: 'Immigration',
      status: 'valid',
      expiryDate: '2026-08-15',
      uploadDate: '2023-08-15',
      studentId: 'STU2024003',
      studentName: 'Priya Sharma'
    },
    {
      id: '8',
      name: 'Bank Statement',
      type: 'Financial',
      status: 'expired',
      expiryDate: '2024-01-01',
      uploadDate: '2023-12-01',
      studentId: 'STU2024003',
      studentName: 'Priya Sharma'
    },
    {
      id: '9',
      name: 'Official Transcript',
      type: 'Academic',
      status: 'valid',
      uploadDate: '2023-08-10',
      studentId: 'STU2024003',
      studentName: 'Priya Sharma'
    },
    // Ahmed Hassan documents
    {
      id: '10',
      name: 'Passport',
      type: 'Identity',
      status: 'valid',
      expiryDate: '2027-12-15',
      uploadDate: '2024-01-15',
      studentId: 'STU2024004',
      studentName: 'Ahmed Hassan'
    },
    {
      id: '11',
      name: 'F-1 Visa',
      type: 'Immigration',
      status: 'valid',
      expiryDate: '2026-01-01',
      uploadDate: '2024-01-01',
      studentId: 'STU2024004',
      studentName: 'Ahmed Hassan'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expiring':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'valid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'expiring':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'expired':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  const handleDownloadDocument = (document: Document) => {
    // Create a mock download
    const content = `Document: ${document.name}
Student: ${document.studentName}
Student ID: ${document.studentId}
Type: ${document.type}
Status: ${document.status}
Upload Date: ${document.uploadDate}
${document.expiryDate ? `Expiry Date: ${document.expiryDate}` : ''}

This is a mock document download.
Generated on: ${new Date().toLocaleString()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${document.name}_${document.studentName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleApproveDocument = (documentId: string) => {
    if (window.confirm('Are you sure you want to approve this document?')) {
      // In a real app, this would update the document status in the backend
      alert('Document approved successfully!');
      // You could update local state here if needed
    }
  };

  const handleFlagDocument = (documentId: string) => {
    const reason = window.prompt('Please provide a reason for flagging this document:');
    if (reason) {
      // In a real app, this would flag the document in the backend
      alert(`Document flagged successfully. Reason: ${reason}`);
      // You could update local state here if needed
    }
  };

  const handleExportDocuments = () => {
    const headers = ['Student ID', 'Student Name', 'Document Name', 'Type', 'Status', 'Upload Date', 'Expiry Date'];
    const rows = filteredDocuments.map(doc => [
      doc.studentId || '',
      doc.studentName || '',
      doc.name,
      doc.type,
      doc.status,
      doc.uploadDate,
      doc.expiryDate || 'N/A'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `documents_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Filter only international students
  const internationalStudents = allStudents.filter(student => 
    student.country !== 'Indonesia'
  );

  const filteredDocuments = allDocuments.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (document.studentName && document.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStudent = selectedStudent === 'all' || document.studentId === selectedStudent;
    const matchesType = selectedType === 'all' || document.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || document.status === selectedStatus;
    
    return matchesSearch && matchesStudent && matchesType && matchesStatus;
  });

  const stats = {
    total: allDocuments.length,
    valid: allDocuments.filter(d => d.status === 'valid').length,
    expiring: allDocuments.filter(d => d.status === 'expiring').length,
    expired: allDocuments.filter(d => d.status === 'expired').length
  };

  const documentTypes = ['Immigration', 'Academic', 'Identity', 'Health', 'Financial'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all international student documents</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.valid}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.expiring}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.expired}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents or students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Students</option>
            {internationalStudents.map(student => (
              <option key={student.id} value={student.studentId}>
                {student.name} ({student.studentId})
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {documentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="valid">Valid</option>
            <option value="expiring">Expiring</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Student Documents ({filteredDocuments.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((document) => {
                const student = allStudents.find(s => s.studentId === document.studentId);
                const daysUntilExpiry = document.expiryDate ? 
                  Math.ceil((new Date(document.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
                
                return (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={student?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                          alt={document.studentName || ''}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{document.studentName}</div>
                          <div className="text-sm text-gray-500">{document.studentId}</div>
                          <div className="text-xs text-gray-400">{student?.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">{document.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {document.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(document.status)}
                        <span className={getStatusBadge(document.status)}>
                          {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(document.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document.expiryDate ? (
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(document.expiryDate).toLocaleDateString()}
                          </div>
                          {daysUntilExpiry !== null && (
                            <div className={`text-xs ${
                              daysUntilExpiry < 30 ? 'text-red-600' :
                              daysUntilExpiry < 90 ? 'text-yellow-600' : 'text-gray-500'
                            }`}>
                              {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No expiry</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDocument(document)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadDocument(document)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
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

      {/* View Document Modal */}
      {showViewModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Document Details</h2>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(selectedDocument.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.name}</h3>
                  <span className={getStatusBadge(selectedDocument.status)}>
                    {selectedDocument.status.charAt(0).toUpperCase() + selectedDocument.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Student:</span>
                  <p className="font-medium">{selectedDocument.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Student ID:</span>
                  <p className="font-medium">{selectedDocument.studentId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Type:</span>
                  <p className="font-medium">{selectedDocument.type}</p>
                </div>
                <div>
                  <span className="text-gray-600">Upload Date:</span>
                  <p className="font-medium">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</p>
                </div>
                {selectedDocument.expiryDate && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Expiry Date:</span>
                    <p className="font-medium">{new Date(selectedDocument.expiryDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Document Preview</p>
                <p className="text-xs text-gray-500">{selectedDocument.name}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => handleDownloadDocument(selectedDocument)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;