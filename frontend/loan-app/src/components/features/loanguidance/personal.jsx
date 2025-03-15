import React, { useState } from 'react';

const PersonalLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Loan details information
  const loanDetails = {
    title: "Personal Loans",
    description: "Our personal loans offer competitive rates with flexible repayment options to help you meet your financial goals.",
    features: [
      "Loan amounts from $1,000 to $50,000",
      "APR starting at 6.99% (rates based on creditworthiness)",
      "Repayment terms from 12 to 60 months",
      "No prepayment penalties",
      "Fast approval and funding within 1-3 business days"
    ],
    eligibility: [
      "Must be at least 18 years old",
      "Valid government-issued ID",
      "Proof of steady income",
      "Credit score of 650 or higher recommended",
      "Active checking account for deposits"
    ]
  };

  // Application steps
  const applicationSteps = [
    {
      title: "Step 1: Complete Personal Information",
      description: "Provide your full name, contact information, and address details for identification and communication purposes.",
      requirements: [
        "Full legal name",
        "Email address",
        "Phone number",
        "Current home address",
        "Date of birth"
      ]
    },
    {
      title: "Step 2: Specify Loan Requirements",
      description: "Tell us how much you'd like to borrow and what you're planning to use the funds for.",
      requirements: [
        "Loan amount (between $1,000 - $50,000)",
        "Purpose of the loan",
        "Preferred repayment term"
      ]
    },
    {
      title: "Step 3: Financial Information",
      description: "Share your employment status and income details to help us assess your repayment capacity.",
      requirements: [
        "Employment status",
        "Current employer",
        "Length of employment",
        "Monthly income",
        "Estimated credit score range"
      ]
    },
    {
      title: "Step 4: Verification Documents",
      description: "Upload the required documents to verify your identity and financial information.",
      requirements: [
        "Government-issued photo ID (driver's license, passport)",
        "Proof of income (recent pay stubs, tax returns)",
        "Proof of address (utility bill, lease agreement)",
        "Bank statements from the last 3 months"
      ]
    },
    {
      title: "Step 5: Review & Submit",
      description: "Review all your information for accuracy before submitting your application.",
      requirements: [
        "Confirm all personal details",
        "Review loan terms and conditions",
        "Accept terms of service and privacy policy",
        "Submit application for review"
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
        <div className="bg-blue-600 text-white p-6">
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
          
          {/* Steps progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {applicationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleStepClick(index)}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    index === activeStep ? 'bg-blue-600 text-white' : 
                    index < activeStep ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden md:block">{step.title.split(':')[0]}</span>
                </div>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600" 
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
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Application process complete! In a real app, you would be directed to start your application.');
                  }
                }}
              >
                {activeStep < applicationSteps.length - 1 ? 'Next Step' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanStepsComponent;