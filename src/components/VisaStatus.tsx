import React, { useState } from 'react';
import { 
  Globe, 
  FileText, 
  ArrowRight,
  CheckCircle,
  Clock,
  Building,
  Plane,
  GraduationCap,
  Shield,
  BookOpen,
  Info,
  RefreshCw,
  UserCheck
} from 'lucide-react';

const VisaStatus: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<'visit' | 'vitas'>('visit');

  const visitVisaSteps = [
    {
      id: 1,
      title: 'Determine Study Program',
      description: 'Choose your study program and duration',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Apply for Visit Visa',
      description: '60–180 days, renewable up to 3 times',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Arrive in Indonesia',
      description: 'Enter Indonesia with valid visit visa',
      icon: Plane,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Extend Visa',
      description: 'Extend up to 3 times maximum',
      icon: RefreshCw,
      color: 'bg-orange-500'
    }
  ];

  const vitasSteps = [
    {
      id: 1,
      title: 'Determine Study Program',
      description: 'Choose your study program and duration',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Apply for VITAS',
      description: 'Apply for Student Visa (Study Permit)',
      icon: GraduationCap,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Arrive in Indonesia',
      description: 'Enter Indonesia with VITAS',
      icon: Plane,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Apply for SKTT',
      description: 'Apply for SKTT at Dukcapil',
      icon: UserCheck,
      color: 'bg-indigo-500'
    },
    {
      id: 5,
      title: 'Apply for STM',
      description: 'Apply for STM at Police',
      icon: Shield,
      color: 'bg-cyan-500'
    },
    {
      id: 6,
      title: 'Extend ITAS',
      description: 'Extend your residence permit',
      icon: RefreshCw,
      color: 'bg-orange-500'
    }
  ];

  const currentSteps = selectedPath === 'visit' ? visitVisaSteps : vitasSteps;

  const flowSteps = [
    {
      id: 1,
      title: 'Application Submission',
      description: 'Submit application to Gunadarma University',
      icon: FileText,
      color: 'bg-blue-500',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Document Verification',
      description: 'University verifies academic documents',
      icon: CheckCircle,
      color: 'bg-green-500',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Letter of Acceptance',
      description: 'Receive LOA from university',
      icon: Building,
      color: 'bg-purple-500',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Visa Application',
      description: 'Apply for student visa at embassy',
      icon: Globe,
      color: 'bg-indigo-500',
      status: 'current'
    },
    {
      id: 5,
      title: 'Visa Approval',
      description: 'Receive visa approval and stamp',
      icon: Shield,
      color: 'bg-emerald-500',
      status: 'pending'
    },
    {
      id: 6,
      title: 'Travel to Indonesia',
      description: 'Arrive in Indonesia with valid visa',
      icon: Plane,
      color: 'bg-cyan-500',
      status: 'pending'
    },
    {
      id: 7,
      title: 'Study Permit',
      description: 'Obtain study permit from immigration',
      icon: GraduationCap,
      color: 'bg-orange-500',
      status: 'pending'
    },
    {
      id: 8,
      title: 'Begin Studies',
      description: 'Start academic program at Gunadarma',
      icon: BookOpen,
      color: 'bg-pink-500',
      status: 'pending'
    }
  ];

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-purple-300 bg-purple-50 ring-2 ring-purple-200';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-purple-600" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-gray-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Visa & Immigration</h1>
        <p className="text-lg text-gray-600">Complete guide for international students at Gunadarma University</p>
      </div>

      {/* Flow Foreign Student */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">Flow Foreign Student</h2>
          <p className="text-gray-600">Step-by-step process for international students</p>
        </div>

        {/* Path Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSelectedPath('visit')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedPath === 'visit'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Path 1: Short-Term Visit Visa
            </button>
            <button
              onClick={() => setSelectedPath('vitas')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedPath === 'vitas'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Path 2: Student Visa (VITAS)
            </button>
          </div>
        </div>

        {/* Flow Steps */}
        <div className="relative">
          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              {currentSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center max-w-32">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {index < currentSteps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Layout - Vertical */}
          <div className="lg:hidden">
            <div className="space-y-6">
              {currentSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {index < currentSteps.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-300 mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Path Information */}
        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-purple-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                {selectedPath === 'visit' ? 'Short-Term Visit Visa Information' : 'Student Visa (VITAS) Information'}
              </h3>
              {selectedPath === 'visit' ? (
                <div className="text-purple-800 space-y-2">
                  <p>• Duration: 60–180 days per visa</p>
                  <p>• Renewable: Up to 3 times maximum</p>
                  <p>• Suitable for: Short-term programs, language courses, exchange programs</p>
                  <p>• Processing time: 3-7 working days</p>
                </div>
              ) : (
                <div className="text-purple-800 space-y-2">
                  <p>• Duration: Valid for entire study period</p>
                  <p>• Requires: Study permit and residence permit</p>
                  <p>• Suitable for: Degree programs, long-term studies</p>
                  <p>• Processing time: 14-30 working days</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        {/* Flow Steps - Grid Layout */}
      {/* Visa Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Visa Information</h2>
            <p className="text-gray-600 mt-1">Essential information about visa requirements and processes</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">What is a Visa?</h3>
            <p className="text-purple-800 leading-relaxed">
              A visa is a document that allows a person to enter a country and can be obtained at an embassy where the country has a Consulate General or foreign embassy.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">e-Visa Application Process</h3>
            <p className="text-blue-800 leading-relaxed">
              The e-Visa application must be submitted by the foreign national sponsor in Indonesia via the 
              <a href="https://visa-online.imigrasi.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 mx-1">
                visa-online.imigrasi.go.id
              </a>
              website.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Official Invitations</h3>
            <p className="text-amber-800 leading-relaxed">
              If there is an activity involving foreign guests, the OFFICIAL invitation that will be shown to immigration will be made by the Cooperation Team because the name of the inviter is the one responsible as the guarantor.
            </p>
          </div>
        </div>
      </div>

      {/* Application for New Study Permit */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application for a New Study Permit</h2>
            <p className="text-gray-600 mt-1">Required documents and procedures for new study permit applications</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-4">Required Documents:</h3>
          <ul className="space-y-3 text-green-800">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scan of Application for Study Permit for Foreign Students from Tertiary Education Institutions addressed to the Director of Institutional Directorate General of Higher Education, Research and Technology.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Information related to study programs and personal data.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scanned Letter of Acceptance at College (LOA).</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scans of Diplomas or Academic Transcripts.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Passport Scan Results.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span>Scanned Statements for:</span>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>- Will not work while studying in Indonesia.</li>
                  <li>- Do not participate in political activities.</li>
                  <li>- Comply with existing laws and regulations in Indonesia.</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scanned Statement Letter from guarantor or person in charge during study.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scanned Results of Statement of Financing Guarantee.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scan Results of Health Certificate.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>Scanned Passport size color photo.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Application for Extension of Study Permit */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application for Extension of Study Permit</h2>
            <p className="text-gray-600 mt-1">Required documents and procedures for study permit extensions</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold text-orange-900 mb-4">Required Documents:</h3>
            <ul className="space-y-3 text-orange-800">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Scan of Application for Study Permit Extension for Foreign Students from Higher Education addressed to the Director of Institutional Higher Education.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span>All Information and Documents used in the application for a New Permit, plus:</span>
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>- Scanned Academic Transcripts.</li>
                    <li>- KITAS and STM/SKLD scan results.</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default VisaStatus;