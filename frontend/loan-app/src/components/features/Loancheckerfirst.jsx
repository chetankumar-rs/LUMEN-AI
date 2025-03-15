
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoanCheckerSection() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    
    const tabs = [
      {
        title: "Personal Loans",
        description: "Our AI assesses your eligibility for personal loans based on income, credit score, and existing debt obligations.",
        criteria: ["Minimum income requirements", "Credit score assessment", "Debt-to-income ratio", "Employment stability"]
      },
      {
        title: "Home Loans",
        description: "Find out if you qualify for home loans or mortgages with our comprehensive eligibility check.",
        criteria: ["Property valuation", "Down payment capacity", "Credit history review", "Income verification"]
      },
      {
        title: "Education Loans",
        description: "Explore education financing options with our tailored eligibility assessment for students and parents.",
        criteria: ["Institution accreditation", "Course selection", "Co-applicant assessment", "Future earning potential"]
      }
    ];
    
    return (
      <div id="loan-checker" className="px-8 md:px-16 py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4">Loan Checker</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Our AI-powered loan checker helps you understand your eligibility before applying, saving you time and protecting your credit score.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-300 ${activeTab === index ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50'}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">{tabs[activeTab].title}</h3>
            <p className="text-gray-600 mb-6">{tabs[activeTab].description}</p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Eligibility Criteria:</h4>
              <ul className="space-y-2">
                {tabs[activeTab].criteria.map((criterion, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> {criterion}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full"
              onClick={() => navigate("/LoanChecker")}
            >
              Check Your Eligibility Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  