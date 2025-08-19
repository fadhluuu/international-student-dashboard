import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  FileText,
  Users,
  Globe,
  BookOpen,
  CreditCard
} from 'lucide-react';

const Support: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'academic',
      title: 'Academic Support',
      icon: BookOpen,
      faqs: [
        {
          id: 'grades',
          question: 'How can I view my grades and GPA?',
          answer: 'You can view your grades by going to the "Academic" section and then clicking on the "Grades Summary" tab. Here you\'ll find your current GPA, course grades, and academic progress tracking.'
        },
        {
          id: 'courses',
          question: 'How do I check my class schedule?',
          answer: 'You can check your class schedule by going to the "Classes" section and entering your class code (e.g., 4KA21, 4KA20, 3SI15) to view your weekly schedule.'
        },
        {
          id: 'transcript',
          question: 'How can I request an official transcript?',
          answer: 'Official transcripts can be requested through the "Documents" section. Click on "Request Transcript" and follow the instructions. Processing typically takes 3-5 business days.'
        }
      ]
    },
    {
      id: 'visa',
      title: 'Visa & Immigration',
      icon: Globe,
      faqs: [
        {
          id: 'visa-info',
          question: 'How do I view my visa and immigration information?',
          answer: 'You can view all your visa and immigration information by going to the "Visa & Immigration" page. This section contains comprehensive information about visa processes and requirements.'
        },
        {
          id: 'visa-renewal',
          question: 'When should I renew my visa?',
          answer: 'You should begin the renewal process at least 60 days before your visa expires. The system will send you automatic reminders when renewal is due.'
        },
        {
          id: 'work-authorization',
          question: 'Can I work while studying?',
          answer: 'F-1 students can work on-campus up to 20 hours per week during academic sessions. For off-campus work, you need specific authorization like CPT or OPT.'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Documents & Records',
      icon: FileText,
      faqs: [
        {
          id: 'upload-docs',
          question: 'How do I upload required documents?',
          answer: 'Navigate to the "Documents" section and click "Upload Document".'
        },
        {
          id: 'doc-verification',
          question: 'How long does document verification take?',
          answer: 'Document verification typically takes 2-3 business days. You\'ll receive an email notification once your documents are reviewed.'
        },
        {
          id: 'missing-docs',
          question: 'What if I\'m missing required documents?',
          answer: 'Check the "Documents" section for a list of required documents. Contact the International Student Office if you need help obtaining any missing documents.'
        }
      ]
    },
    {
      id: 'financial',
      title: 'Financial Support',
      icon: CreditCard,
      faqs: [
        {
          id: 'tuition-payment',
          question: 'How do I pay my tuition fees?',
          answer: 'You can view and manage your tuition fees by going to the "Academic" section and clicking on the "Tuition Fees" tab.'
        },
        {
          id: 'financial-aid',
          question: 'How do I check my financial aid status?',
          answer: 'Contact the Financial Aid Office directly for information about your financial aid status and available opportunities for international students.'
        },
        {
          id: 'emergency-funds',
          question: 'What if I have a financial emergency?',
          answer: 'Contact the International Student Office immediately. We have emergency fund programs and can help connect you with resources and support.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: HelpCircle,
      faqs: [
        {
          id: 'login-issues',
          question: 'I can\'t log into my account',
          answer: 'Contact IT Support with your student ID for assistance with login issues.'
        },
        {
          id: 'system-requirements',
          question: 'What are the system requirements?',
          answer: 'This is a web-based dashboard that works on all modern browsers (Chrome, Firefox, Safari, Edge). Ensure JavaScript is enabled and your browser is up to date. Mobile support is not currently available.'
        },
        {
          id: 'mobile-access',
          question: 'Can I access the dashboard on my phone?',
          answer: 'Mobile support is not currently available. Please use a desktop or laptop computer to access the dashboard.'
        }
      ]
    }
  ];

  const contactInfo = [
    {
      title: 'International Student Office',
      description: 'General inquiries and support',
      icon: Users,
      contact: '+1 (555) 123-4567',
      email: 'international@university.edu',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      title: 'Academic Advising',
      description: 'Course and academic support',
      icon: BookOpen,
      contact: '+1 (555) 123-4568',
      email: 'advising@university.edu',
      hours: 'Mon-Fri: 9:00 AM - 4:00 PM'
    },
    {
      title: 'Technical Support',
      description: 'System and technical issues',
      icon: HelpCircle,
      contact: '+1 (555) 123-4569',
      email: 'support@university.edu',
      hours: '24/7 Online Support'
    },
    {
      title: 'Emergency Line',
      description: 'Urgent matters only',
      icon: Phone,
      contact: '+1 (555) 911-HELP',
      email: 'emergency@university.edu',
      hours: '24/7 Emergency Support'
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-1">Find answers to common questions and get help</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="p-6">
              {filteredFAQs.map((category) => (
                <div key={category.id} className="mb-8 last:mb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <category.icon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.faqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {expandedFAQ === faq.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <contact.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{contact.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{contact.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{contact.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-purple-700 hover:text-purple-900 transition-colors duration-200">
                → Student Handbook
              </a>
              <a href="#" className="block text-purple-700 hover:text-purple-900 transition-colors duration-200">
                → Immigration Guidelines
              </a>
              <a href="#" className="block text-purple-700 hover:text-purple-900 transition-colors duration-200">
                → Academic Calendar
              </a>
              <a href="#" className="block text-purple-700 hover:text-purple-900 transition-colors duration-200">
                → Campus Resources
              </a>
              <a href="#" className="block text-purple-700 hover:text-purple-900 transition-colors duration-200">
                → Emergency Procedures
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;