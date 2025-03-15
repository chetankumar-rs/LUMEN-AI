import React, { useState } from 'react';
import Chatbot from './chatbot1';

const EducationLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Education loan details information
  const loanDetails = {
    title: "Education Loans",
    description: "Invest in your future with our education loans designed to help students and parents finance higher education expenses with competitive rates and flexible repayment options.",
    features: [
      "Loan amounts from $1,000 up to the full cost of education",
      "Competitive interest rates starting at 3.5% (fixed) and 1.25% (variable)",
      "Repayment terms from 5 to 20 years",
      "No origination fees or prepayment penalties",
      "Interest-only payments while in school",
      "Grace period of 6 months after graduation",
      "Co-signer release option after 24 consecutive on-time payments"
    ],
    eligibility: [
      "Enrolled at least half-time in an accredited institution",
      "US citizenship or permanent residency",
      "Satisfactory academic progress",
      "Credit score of 650+ (for student or co-signer)",
      "Debt-to-income ratio requirements",
      "No prior student loan defaults",
      "Co-signer may be required for undergraduate students"
    ]
  };

  // Application steps
  const applicationSteps = [
    {
      title: "Step 1: Student Information",
      description: "Provide basic information about the student applying for the loan.",
      requirements: [
        "Full legal name",
        "Social Security Number",
        "Date of birth",
        "Permanent address",
        "Phone number and email address",
        "Citizenship status",
        "Driver's license or state ID number"
      ]
    },
    {
      title: "Step 2: Academic Information",
      description: "Share details about your education plans and the school you'll be attending.",
      requirements: [
        "School name and location",
        "Degree and program of study",
        "Grade level (Freshman, Sophomore, etc.)",
        "Enrollment status (Full-time, Half-time)",
        "Expected graduation date",
        "Academic period for loan (semester/year)",
        "Student ID number (if available)"
      ]
    },
    {
      title: "Step 3: Loan Request",
      description: "Specify the loan amount and terms you're seeking.",
      requirements: [
        "Requested loan amount",
        "Academic period covered by loan",
        "Total cost of attendance",
        "Other financial aid received",
        "Preferred loan term",
        "Repayment option selection (immediate, interest-only, or deferred)",
        "Preferred interest rate type (fixed or variable)"
      ]
    },
    {
      title: "Step 4: Employment & Financial Information",
      description: "Provide details about your current employment and financial situation.",
      requirements: [
        "Employment status",
        "Current employer (if applicable)",
        "Gross monthly income",
        "Housing payment information (rent/mortgage)",
        "Other monthly debt obligations",
        "Years at current residence",
        "Years with current employer"
      ]
    },
    {
      title: "Step 5: Co-signer Information",
      description: "If applicable, provide information about your co-signer.",
      requirements: [
        "Co-signer's full legal name",
        "Social Security Number",
        "Date of birth",
        "Relationship to student",
        "Address and contact information",
        "Employment information",
        "Income and financial details"
      ]
    },
    {
      title: "Step 6: Documentation Upload",
      description: "Upload the required documents to support your application.",
      requirements: [
        "Government-issued photo ID",
        "Proof of enrollment or acceptance letter",
        "Recent pay stubs or proof of income",
        "Financial aid award letter",
        "Tuition bill or cost of attendance verification",
        "Co-signer documentation (if applicable)",
        "Any additional verification documents requested"
      ]
    },
    {
      title: "Step 7: Review & Submit",
      description: "Review all information for accuracy before submitting your application.",
      requirements: [
        "Verify personal and academic information",
        "Review loan terms and disclosures",
        "Accept terms and conditions",
        "Self-certification form completion",
        "e-Sign application documents",
        "Submit for credit decision"
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
        <div className="bg-purple-700 text-white p-6">
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
                    index === activeStep ? 'bg-purple-700 text-white' : 
                    index < activeStep ? 'bg-purple-500 text-white' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title.split(':')[0]}</span>
                </div>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-700" 
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
                    ? 'bg-purple-700 hover:bg-purple-800 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Education loan application process complete! In a real app, you would be directed to start your application.');
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

export default EducationLoanStepsComponent;