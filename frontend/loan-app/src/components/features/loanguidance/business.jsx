import React, { useState } from 'react';
import Chatbot from '../../chatbot1';
const BusinessLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  // Application steps
  const applicationSteps = [
    {
      title: "Step 1: Business Profile",
      description: "Provide basic information about your business to help us understand your needs.",
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Loan Details Section */}
        <div className="bg-indigo-700 text-white p-6">
          <h1 className="text-3xl font-bold mb-3">{loanDetails.title}</h1>
          <p className="mb-4">{loanDetails.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5 space-y-1">
                {loanDetails.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
              <ul className="list-disc pl-5 space-y-1">
                {loanDetails.eligibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Application Steps Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Application Process</h2>
          
          {/* Steps progress indicators */}
          <div className="overflow-x-auto mb-8">
            <div className="flex items-center min-w-max mb-2">
              {applicationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer mx-2"
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    index === activeStep ? 'bg-indigo-700 text-white' : 
                    index < activeStep ? 'bg-indigo-500 text-white' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title.split(':')[0]}</span>
                </div>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-700" 
                style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active step details */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">{applicationSteps[activeStep].title}</h3>
            <p className="text-gray-600 mb-4">{applicationSteps[activeStep].description}</p>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {applicationSteps[activeStep].requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                className={`px-4 py-2 rounded font-medium ${
                  activeStep > 0 ? 'bg-gray-300 hover:bg-gray-400 text-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
                disabled={activeStep === 0}
              >
                Previous Step
              </button>
              
              <button
                className={`px-4 py-2 rounded font-medium ${
                  activeStep < applicationSteps.length - 1 
                    ? 'bg-indigo-700 hover:bg-indigo-800 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Business loan application process complete! In a real app, you would be directed to start your application.');
                  }
                }}
              >
                {activeStep < applicationSteps.length - 1 ? 'Next Step' : 'Apply Now'}
              </button>
              <Chatbot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoanStepsComponent;