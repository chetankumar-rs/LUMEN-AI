import React, { useState } from 'react';
import Chatbot from '../../chatbot1';
const HomeLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  // Application steps
  const applicationSteps = [
    {
      title: "Step 1: Pre-Qualification",
      description: "Get an estimate of how much you may be able to borrow based on your financial information.",
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Loan Details Section */}
        <div className="bg-green-700 text-white p-6">
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
                    index === activeStep ? 'bg-green-700 text-white' : 
                    index < activeStep ? 'bg-green-500 text-white' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title.split(':')[0]}</span>
                </div>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700" 
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
                    ? 'bg-green-700 hover:bg-green-800 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Home loan application process complete! In a real app, you would be directed to start your application.');
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

export default HomeLoanStepsComponent;