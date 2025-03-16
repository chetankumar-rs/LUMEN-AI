import React, { useState, useEffect } from 'react';
import Chatbot from '../../chatbot1';
import { Building, Award, DollarSign, BarChart, Users, FileText, CheckSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const BusinessLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Business loan details information
  const loanDetails = {
    title: "Business Loans",
    description: "Fuel your business growth with our flexible business financing solutions designed to meet your specific needs and objectives.",
    features: [
      "Loan amounts from $25,000 to $5,000,000",
      "Interest rates starting at 5.75% (based on business profile and creditworthiness)",
      "Terms from 1 to 25 years (depending on loan type)",
      "SBA loan options available",
      "Line of credit options for flexible funding",
      "Equipment financing with up to 100% funding",
      "Commercial real estate loans with competitive terms"
    ],
    eligibility: [
      "Business operating for at least 2 years",
      "Minimum annual revenue of $100,000",
      "Business owner credit score of 650+ (preferred)",
      "Positive cash flow in most recent fiscal year",
      "No recent bankruptcies or tax liens",
      "Industry restrictions may apply",
      "Collateral may be required (depends on loan type)"
    ]
  };

  // Application steps with added icons
  const applicationSteps = [
    {
      title: "Step 1: Business Profile",
      description: "Provide basic information about your business to help us understand your needs.",
      icon: <Building size={24} />,
      requirements: [
        "Legal business name and DBA (if applicable)",
        "Business address and contact information",
        "Business structure (LLC, Corporation, Sole Proprietor, etc.)",
        "Industry and business type",
        "Date business established",
        "Number of employees",
        "Federal Tax ID/EIN"
      ]
    },
    {
      title: "Step 2: Ownership Information",
      description: "Provide details about the business owners and their stake in the company.",
      icon: <Users size={24} />,
      requirements: [
        "Owner name(s) and contact information",
        "Ownership percentage",
        "Social Security Numbers for all owners with 20%+ ownership",
        "Home address(es)",
        "Date(s) of birth",
        "Personal credit score range(s)",
        "Resume or business experience summary"
      ]
    },
    {
      title: "Step 3: Loan Request Details",
      description: "Specify your financing needs and how you plan to use the funds.",
      icon: <DollarSign size={24} />,
      requirements: [
        "Loan amount requested",
        "Loan purpose (expansion, equipment, working capital, etc.)",
        "Preferred loan term",
        "Collateral available (if any)",
        "Preferred repayment schedule",
        "Timeline for funding needs"
      ]
    },
    {
      title: "Step 4: Business Financial Information",
      description: "Share your business's financial performance and current obligations.",
      icon: <BarChart size={24} />,
      requirements: [
        "Annual revenue (past 2-3 years)",
        "Monthly average sales",
        "Business bank account information",
        "Current business debts and obligations",
        "Accounts receivable/payable aging summary",
        "Business tax returns (past 2-3 years)",
        "Year-to-date profit and loss statement",
        "Balance sheet"
      ]
    },
    {
      title: "Step 5: Additional Business Documents",
      description: "Upload supporting business documents to strengthen your application.",
      icon: <FileText size={24} />,
      requirements: [
        "Business licenses and permits",
        "Articles of incorporation or organization",
        "Business plan (for newer businesses)",
        "Commercial lease agreement (if applicable)",
        "Equipment quotes or purchase agreements (for equipment loans)",
        "Franchise agreement (for franchises)",
        "Business insurance information"
      ]
    },
    {
      title: "Step 6: Personal Financial Information",
      description: "Provide information about the personal finances of primary business owners.",
      icon: <Users size={24} />,
      requirements: [
        "Personal tax returns (past 2 years) for each owner",
        "Personal financial statement",
        "Personal bank statements (past 3 months)",
        "List of personal assets and liabilities",
        "Personal credit report authorization"
      ]
    },
    {
      title: "Step 7: Review & Submit",
      description: "Review all information and submit your application for underwriting.",
      icon: <CheckSquare size={24} />,
      requirements: [
        "Verify all business and personal information",
        "Review loan terms and conditions",
        "Sign required authorizations and disclosures",
        "Submit application for review",
        "Schedule follow-up consultation with a business loan specialist"
      ]
    }
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Loan Details Section with Gradient Background - Using mix of orange, blue and purple */}
        <div className="bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 text-white p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-white animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Award size={32} className="mr-3 animate-bounce" style={{ animationDuration: '3s' }} />
              <h1 className="text-4xl font-bold">{loanDetails.title}</h1>
            </div>
            <p className="mb-6 text-lg">{loanDetails.description}</p>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="transform transition-all duration-300 hover:scale-105">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Check size={20} className="mr-2" /> Features
                </h2>
                <ul className="space-y-2">
                  {loanDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-4 h-4 mr-2 mt-1 bg-white rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Check size={20} className="mr-2" /> Eligibility
                </h2>
                <ul className="space-y-2">
                  {loanDetails.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-4 h-4 mr-2 mt-1 bg-white rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Steps Section */}
        <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Application Process</h2>
          
          {/* Steps progress indicators with animations */}
          <div className="overflow-x-auto mb-10">
            <div className="flex justify-center min-w-max mb-6">
              {applicationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center cursor-pointer mx-3 transition-all duration-300 ${
                    index === activeStep ? 'transform scale-110' : 'opacity-70'
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md transition-all duration-500 ${
                    index === activeStep ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 text-white scale-110 animate-pulse' : 
                    index < activeStep ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < activeStep ? <Check size={24} /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${index === activeStep ? 'text-blue-700' : 'text-gray-600'}`}>
                      {step.title.split(':')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-2 mb-8 rounded-full bg-gray-200 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 transition-all duration-500 ease-in-out"
                style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active step details with card effect */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 text-white rounded-lg mr-4">
                {applicationSteps[activeStep].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{applicationSteps[activeStep].title}</h3>
                <p className="text-gray-600">{applicationSteps[activeStep].description}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-lg text-gray-800 mb-4">Requirements:</h4>
              <ul className="space-y-3 text-gray-700">
                {applicationSteps[activeStep].requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 mr-3 bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                      {index + 1}
                    </div>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between mt-10 items-center">
              <button
                className={`px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300 ${
                  activeStep > 0 ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 transform hover:-translate-x-1' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
                disabled={activeStep === 0}
              >
                <ChevronLeft size={18} className="mr-1" /> Previous
              </button>
              
              <div className="text-sm text-gray-500">
                Step {activeStep + 1} of {applicationSteps.length}
              </div>
              
              <button
                className={`px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300 transform hover:translate-x-1 ${
                  activeStep < applicationSteps.length - 1 
                    ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 hover:from-orange-600 hover:via-blue-700 hover:to-purple-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Business loan application process complete! In a real app, you would be directed to start your application.');
                  }
                }}
              >
                {activeStep < applicationSteps.length - 1 ? (
                  <>Next <ChevronRight size={18} className="ml-1" /></>
                ) : (
                  <>Apply Now <Check size={18} className="ml-1" /></>
                )}
              </button>
            </div>
          </div>
          
          {/* Chatbot position fixed at bottom right */}
          <div className="fixed bottom-6 right-6 z-50 animate-bounce" style={{ animationDuration: '2s' }}>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanStepsComponent;