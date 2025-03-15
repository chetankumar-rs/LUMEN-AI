import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div id="loan-checker" className="px-8 md:px-16 py-20 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-purple-400/10 blur-3xl"
          animate={{ 
            scale: [1.1, 0.9, 1.1],
            opacity: [0.7, 0.5, 0.7]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">Loan Checker</h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 text-center max-w-3xl mx-auto mb-12"
        >
          Our AI-powered loan checker helps you understand your eligibility before applying, saving you time and protecting your credit score.
        </motion.p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto border border-indigo-100 relative z-10"
      >
        {/* Tabs */}
        <div className="flex border-b border-indigo-100">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              className={`flex-1 py-5 px-6 text-center font-medium transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
              onClick={() => setActiveTab(index)}
              whileHover={{ scale: activeTab !== index ? 1.03 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>
        
        {/* Content */}
        <div className="p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-3">{tabs[activeTab].title}</h3>
            <p className="text-gray-600 mb-6">{tabs[activeTab].description}</p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                <motion.span 
                  className="inline-block mr-2"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.span>
                Eligibility Criteria
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                {tabs[activeTab].criteria.map((criterion, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className="flex items-center"
                  >
                    <motion.div
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <motion.span 
                      className="text-gray-700 relative"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {criterion}
                      <motion.span 
                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full relative overflow-hidden group"
              onClick={() => navigate("/LoanChecker")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated shine effect */}
              <motion.span 
                className="absolute top-0 -left-full w-20 h-full bg-white/20 skew-x-12 z-10"
                animate={{ left: ["0%", "300%"] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              
              <span className="relative z-20 flex items-center justify-center">
                Check Your Eligibility Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative element at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </div>
  );
}