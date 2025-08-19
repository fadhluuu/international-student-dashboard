import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Calendar,
  Filter,
  Search,
  Plus,
  X,
  Save,
  Trash2
} from 'lucide-react';
import type { Document, User } from '@/types';

interface DocumentsProps {
  user: User;
  onDocumentUpdate?: (documents: Document[]) => void;
}

const Documents: React.FC<DocumentsProps> = ({ user, onDocumentUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'I-20 Form',
      type: 'Immigration',
      status: 'valid',
      expiryDate: '2024-08-15',
      uploadDate: '2023-08-15',
      studentId: user.studentId || '',
      studentName: user.name
    },
    {
      id: '2',
      name: 'F-1 Visa',
      type: 'Immigration',
      status: 'expiring',
      expiryDate: '2024-03-20',
      uploadDate: '2023-03-20',
      studentId: user.studentId || '',
      studentName: user.name
    },
    {
      id: '3',
      name: 'Official Transcript',
      type: 'Academic',
      status: 'valid',
      uploadDate: '2024-01-10',
      studentId: user.studentId || '',
      studentName: user.name
    },
    {
      id: '4',
      name: 'Passport',
      type: 'Identity',
      status: 'valid',
      expiryDate: '2026-05-12',
      uploadDate: '2023-01-15',
      studentId: user.studentId || '',
      studentName: user.name
    },
    {
      id: '5',
      name: 'Health Insurance Card',
      type: 'Health',
      status: 'expiring',
      expiryDate: '2024-02-28',
      uploadDate: '2023-02-28',
      studentId: user.studentId || '',
      studentName: user.name
    },
    {
      id: '6',
      name: 'Bank Statement',
      type: 'Financial',
      status: 'expired',
      expiryDate: '2024-01-01',
      uploadDate: '2023-12-01',
      studentId: user.studentId || '',
      studentName: user.name
    }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [editingDocument, setEditingDocument] = useState<Partial<Document>>({});

  // Notify parent component when documents change
  React.useEffect(() => {
    if (onDocumentUpdate) {
      onDocumentUpdate(documents);
    }
  }, [documents, onDocumentUpdate]);

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'Immigration', name: 'Immigration' },
    { id: 'Academic', name: 'Academic' },
    { id: 'Identity', name: 'Identity' },
    { id: 'Health', name: 'Health' },
    { id: 'Financial', name: 'Financial' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only PDF, JPG, or PNG files.');
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        return;
      }
      
      setUploadingFile(file);
      setEditingDocument({
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        type: 'Immigration',
        status: 'valid',
        uploadDate: new Date().toISOString().split('T')[0],
        studentId: user.studentId || '',
        studentName: user.name
      });
      setShowAddModal(true);
    }
  };

  // CRUD Functions
  const handleAddDocument = () => {
    setEditingDocument({
      name: '',
      type: 'Immigration',
      status: 'valid',
      uploadDate: new Date().toISOString().split('T')[0],
      studentId: user.studentId || '',
      studentName: user.name
    });
    setShowAddModal(true);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  const handleDeleteDocument = (documentId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(d => d.id !== documentId));
    }
  };

  const handleSaveDocument = () => {
    if (!editingDocument.name?.trim()) {
      alert('Please enter a document name.');
      return;
    }
    
    const newDocument: Document = {
      ...editingDocument as Document,
      id: Date.now().toString(),
      studentId: user.studentId || '',
      studentName: user.name
    };
    setDocuments(prev => [...prev, newDocument]);
    setShowAddModal(false);
    setEditingDocument({});
    setUploadingFile(null);
  };

  const handleDownloadDocument = (document: Document) => {
    // Simulate document download
    alert(`Downloading ${document.name}...`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const fakeEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(fakeEvent);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'expiring':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
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

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === selectedCategory);

  const statusCounts = {
    total: documents.length,
    valid: documents.filter(d => d.status === 'valid').length,
    expiring: documents.filter(d => d.status === 'expiring').length,
    expired: documents.filter(d => d.status === 'expired').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Center</h1>
          <p className="text-gray-600 mt-1">Manage your important documents and track expiry dates</p>
        </div>
        <button 
          onClick={handleAddDocument}
          className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statusCounts.total}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valid</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{statusCounts.valid}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{statusCounts.expiring}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{statusCounts.expired}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Documents' : `${selectedCategory} Documents`}
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(document.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{document.name}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {document.type}
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </span>
                      {document.expiryDate && (
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Expires: {new Date(document.expiryDate).toLocaleDateString()}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getStatusBadge(document.status)}>
                    {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleViewDocument(document)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title="View Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDownloadDocument(document)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      title="Download Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(document.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete Document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors duration-200 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Document</h3>
        <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Choose Files
          </button>
          <span className="text-sm text-gray-500">Supported: PDF, JPG, PNG (Max 10MB)</span>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Document</h2>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setUploadingFile(null);
                  setEditingDocument({});
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Name</label>
                <input
                  type="text"
                  value={editingDocument.name || ''}
                  onChange={(e) => setEditingDocument(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter document name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select
                  value={editingDocument.type || ''}
                  onChange={(e) => setEditingDocument(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Immigration">Immigration</option>
                  <option value="Academic">Academic</option>
                  <option value="Identity">Identity</option>
                  <option value="Health">Health</option>
                  <option value="Financial">Financial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingDocument.status || ''}
                  onChange={(e) => setEditingDocument(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="valid">Valid</option>
                  <option value="expiring">Expiring</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={editingDocument.expiryDate || ''}
                  onChange={(e) => setEditingDocument(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {uploadingFile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected File</label>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadingFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadingFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!uploadingFile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                    onClick={() => document.getElementById('modal-file-upload')?.click()}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    <input
                      id="modal-file-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setUploadingFile(null);
                  setEditingDocument({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDocument}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
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

export default Documents;