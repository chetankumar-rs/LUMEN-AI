import React, { useState, useEffect } from 'react';
import Chatbot from '../../chatbot1';
import { Home, Award, DollarSign, Briefcase, Users, FileText, CheckSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const HomeLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Home loan details information
  const loanDetails = {
    title: "Home Loans",
    description: "Our home loans provide competitive interest rates and flexible terms to help you purchase your dream home or refinance your existing mortgage.",
    features: [
      "Loan amounts up to $2,000,000",
      "Fixed rates starting at 4.5% APR",
      "Adjustable rates starting at 4.0% APR",
      "Terms from 10 to 30 years",
      "Low down payment options available",
      "No prepayment penalties"
    ],
    eligibility: [
      "Minimum credit score of 620 (conventional) or 580 (FHA)",
      "Debt-to-income ratio below 43%",
      "Steady employment history (2+ years)",
      "Down payment (typically 3-20% depending on loan type)",
      "Property must meet appraisal standards",
      "Must be a primary residence, secondary home, or investment property"
    ]
  };

  // Application steps with added icons
  const applicationSteps = [
    {
      title: "Step 1: Pre-Qualification",
      description: "Get an estimate of how much you may be able to borrow based on your financial information.",
      icon: <Home size={24} />,
      requirements: [
        "Basic personal information",
        "Estimated annual income",
        "Estimated monthly debts",
        "Desired loan amount and property value",
        "Estimated credit score range"
      ]
    },
    {
      title: "Step 2: Personal Information",
      description: "Provide your complete personal details needed for the formal application process.",
      icon: <Users size={24} />,
      requirements: [
        "Full legal name",
        "Social Security Number",
        "Date of birth",
        "Current address and housing history (2 years)",
        "Phone number and email address",
        "Marital status and dependents"
      ]
    },
    {
      title: "Step 3: Employment & Income",
      description: "Share your employment history and income sources to verify your ability to repay the loan.",
      icon: <Briefcase size={24} />,
      requirements: [
        "Current employer information (name, address, phone)",
        "Employment history (2+ years)",
        "Current income information",
        "Additional income sources (if applicable)",
        "Self-employment details (if applicable)"
      ]
    },
    {
      title: "Step 4: Property Information",
      description: "Provide details about the property you're looking to purchase or refinance.",
      icon: <Home size={24} />,
      requirements: [
        "Property address",
        "Property type (single-family, condo, etc.)",
        "Purchase price or estimated value",
        "Down payment amount and source",
        "Use of property (primary residence, investment, etc.)",
        "Homeowners insurance information"
      ]
    },
    {
      title: "Step 5: Financial Information",
      description: "Detail your assets and liabilities to complete the financial picture.",
      icon: <DollarSign size={24} />,
      requirements: [
        "Bank account statements (2-3 months)",
        "Retirement and investment accounts",
        "Current mortgage or rent payment information",
        "Other outstanding debts (credit cards, auto loans, student loans)",
        "Gift letter (if using gift funds for down payment)"
      ]
    },
    {
      title: "Step 6: Documentation Upload",
      description: "Upload supporting documents to verify your application information.",
      icon: <FileText size={24} />,
      requirements: [
        "Recent pay stubs (last 30 days)",
        "W-2s and tax returns (last 2 years)",
        "Bank statements (last 2-3 months)",
        "Investment account statements",
        "Photo ID",
        "Purchase agreement (for home purchases)"
      ]
    },
    {
      title: "Step 7: Review & Submit",
      description: "Review all information for accuracy before submitting your application.",
      icon: <CheckSquare size={24} />,
      requirements: [
        "Verify all personal and property information",
        "Review disclosures and loan terms",
        "Sign application documents electronically",
        "Pay application fee (if applicable)",
        "Submit for underwriting review"
      ]
    }
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Loan Details Section with Mixed Gradient Background (green, purple, blue) */}
        <div className="bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 text-white p-8 relative overflow-hidden">
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
                    index === activeStep ? 'bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 text-white scale-110 animate-pulse' : 
                    index < activeStep ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white' : 'bg-gray-200 text-gray-600'
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
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active step details with card effect */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 text-white rounded-lg mr-4">
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
                    <div className="flex-shrink-0 w-5 h-5 mt-1 mr-3 bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs">
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
                    ? 'bg-gradient-to-r from-green-500 via-purple-500 to-blue-500 hover:from-green-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-md' 
                    : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-md'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Home loan application process complete! In a real app, you would be directed to start your application.');
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

export default HomeLoanStepsComponent;