import React, { useState, useEffect } from 'react';
import Chatbot from '../../chatbot1';
import { BookOpen, Award, DollarSign, Briefcase, Users, FileText, CheckSquare, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const EducationLoanStepsComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [msg, setMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Education loan details information
  const loanDetails = {
    msg: "ntg",
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

  // Application steps with added icons
  const applicationSteps = [
    {
      title: "Step 1: Student Information",
      description: "Provide basic information about the student applying for the loan.",
      icon: <Users size={24} />,
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
      icon: <BookOpen size={24} />,
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
      icon: <DollarSign size={24} />,
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
      icon: <Briefcase size={24} />,
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
      icon: <Users size={24} />,
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
      icon: <FileText size={24} />,
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
      icon: <CheckSquare size={24} />,
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
    <div className={`max-w-4xl mx-auto p-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        {/* Loan Details Section with Gradient Background */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-600 text-white p-8 relative overflow-hidden">
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
                    index === activeStep ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white scale-110 animate-pulse' : 
                    index < activeStep ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < activeStep ? <Check size={24} /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium ${index === activeStep ? 'text-purple-700' : 'text-gray-600'}`}>
                      {step.title.split(':')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-2 mb-8 rounded-full bg-gray-200 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 ease-in-out"
                style={{ width: `${((activeStep + 1) / applicationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Active step details with card effect */}
          <div className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg mr-4">
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
                    <div className="flex-shrink-0 w-5 h-5 mt-1 mr-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
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
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md'
                }`}
                onClick={() => {
                  if (activeStep < applicationSteps.length - 1) {
                    setActiveStep(activeStep + 1);
                  } else {
                    alert('Education loan application process complete! In a real app, you would be directed to start your application.');
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

export default EducationLoanStepsComponent;