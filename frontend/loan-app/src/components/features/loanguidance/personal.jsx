import React, { useState, useEffect } from 'react';
import Chatbot from '../../chatbot1';
import { Home, Clipboard, Calculator, FileCheck, User, Building, FileText, CheckSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const MortgageLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mortgage loan details information
  const loanDetails = {
    title: "Mortgage Loans",
    description: "Finance your dream home with our competitive mortgage loans designed to provide flexible options and favorable terms for homebuyers at every stage.",
    features: [
      "Loan amounts from $50,000 up to $2,000,000",
      "Competitive interest rates starting at 3.25% (fixed) and 2.75% (variable)",
      "Repayment terms from 10 to 30 years",
      "Down payment options as low as 3.5%",
      "No prepayment penalties on most loan options",
      "Rate lock options available up to 90 days",
      "Specialized programs for first-time homebuyers",
      "Home renovation loan options available"
    ],
    eligibility: [
      "Credit score of 620+ (conventional loans)",
      "Debt-to-income ratio under 43%",
      "Stable employment and income history (2+ years preferred)",
      "Sufficient funds for down payment and closing costs",
      "Property must meet appraisal requirements",
      "Property must be primary residence (for certain loan programs)",
      "Maximum loan-to-value ratio requirements vary by program",
      "US citizenship or permanent residency status"
    ]
  };

  // Application steps with icons
  const applicationSteps = [
    {
      title: "Step 1: Personal Information",
      description: "Provide your basic personal and contact information.",
      icon: <User size={24} />,
      requirements: [
        "Full legal name",
        "Social Security Number",
        "Date of birth",
        "Current address and previous addresses (last 2 years)",
        "Phone number and email address",
        "Citizenship status",
        "Marital status",
        "Number of dependents"
      ]
    },
    {
      title: "Step 2: Employment & Income",
      description: "Share details about your employment history and sources of income.",
      icon: <Building size={24} />,
      requirements: [
        "Current employer name and contact information",
        "Position/title and length of employment",
        "Previous employers (if less than 2 years at current job)",
        "Gross monthly income",
        "Additional income sources (if applicable)",
        "Self-employment information (if applicable)",
        "Recent pay stubs",
        "Last 2 years of W-2 forms or tax returns"
      ]
    },
    {
      title: "Step 3: Property Information",
      description: "Tell us about the property you wish to purchase or refinance.",
      icon: <Home size={24} />,
      requirements: [
        "Property address",
        "Property type (single-family, condo, townhouse, etc.)",
        "Estimated property value",
        "Year built",
        "Intended use (primary residence, second home, investment)",
        "HOA information (if applicable)",
        "Purchase agreement (for purchases)",
        "Current mortgage information (for refinances)"
      ]
    },
    {
      title: "Step 4: Loan Preferences",
      description: "Specify the details of the mortgage loan you're seeking.",
      icon: <Calculator size={24} />,
      requirements: [
        "Requested loan amount",
        "Down payment amount",
        "Loan term preference (15, 20, or 30 years)",
        "Loan type (conventional, FHA, VA, etc.)",
        "Interest rate preference (fixed or adjustable)",
        "Mortgage points preferences",
        "Escrow account preferences",
        "Special program eligibility (first-time homebuyer, etc.)"
      ]
    },
    {
      title: "Step 5: Assets & Liabilities",
      description: "Provide information about your financial accounts and existing debts.",
      icon: <Clipboard size={24} />,
      requirements: [
        "Bank account information (checking and savings)",
        "Investment account information",
        "Retirement account information",
        "Other assets (vehicles, other properties)",
        "Outstanding debts (credit cards, loans, etc.)",
        "Monthly debt payments",
        "Bankruptcy or foreclosure history (if applicable)",
        "Source of down payment funds"
      ]
    },
    {
      title: "Step 6: Documentation Upload",
      description: "Upload the required documents to support your mortgage application.",
      icon: <FileText size={24} />,
      requirements: [
        "Government-issued photo ID",
        "Recent pay stubs (last 30 days)",
        "W-2 forms (last 2 years)",
        "Federal tax returns (last 2 years)",
        "Bank statements (last 2-3 months)",
        "Investment account statements",
        "Purchase agreement (for purchases)",
        "Additional documents based on your situation"
      ]
    },
    {
      title: "Step 7: Review & Submit",
      description: "Review all information and submit your mortgage application.",
      icon: <FileCheck size={24} />,
      requirements: [
        "Review all personal and financial information",
        "Verify property details",
        "E-sign disclosures and authorizations",
        "Review Loan Estimate",
        "Acknowledge receipt of other required disclosures",
        "Authorize credit check",
        "Submit application for processing",
        "Schedule follow-up consultation with mortgage advisor"
      ]
    }
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Loan Details Section with Gradient Background */}
        <div className="bg-gradient-to-r from-green-700 to-teal-600 text-white p-8 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-white animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Home size={32} className="mr-3 animate-bounce" style={{ animationDuration: '3s' }} />
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
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Mortgage Application Process</h2>
          
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
                    index === activeStep ? 'bg-gradient-to-r from-green-600 to-teal-500 text-white scale-110 animate-pulse' : 
                    index < activeStep ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < activeStep ? <Check size={24} /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${index === activeStep ? 'text-green-700' : 'text-gray-600'}`}>
                      {step.title.split(':')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-2 mb-8 rounded-full bg-gray-200 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-500 ease-in-out"
                style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active step details with card effect */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg mr-4">
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
                    <div className="flex-shrink-0 w-5 h-5 mt-1 mr-3 bg-gradient-to-r from-green-600 to-teal-500 rounded-full flex items-center justify-center text-white text-xs">
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
                    ? 'bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-md' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Mortgage loan application process complete! In a real app, you would be directed to start your application.');
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

export default MortgageLoanStepsComponent;