import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate , Link} from "react-router-dom";
// Import your existing ChatbotPage component
import ChatbotPage from "./chatbot";

 // Update with your actual path

export default function LoanOptionsPage() {
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState(null);
  // State to control chatbot visibility
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const loanOptions = [
    {
      id: "personal",
      title: "Personal Loan",
      description: "Quick access to funds for personal expenses, debt consolidation, or unexpected costs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
      benefits: ["Flexible use of funds", "No collateral required", "Quick approval", "Fixed interest rates"]
    },
    {
      id: "HomeLoan",
      title: "Home Loan",
      description: "Finance your dream home with competitive rates and flexible repayment terms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      color: "from-green-500 to-teal-600",
      benefits: ["Lower interest rates", "Tax benefits", "Build equity", "Longer repayment periods"]
    },
    {
      id: "education",
      title: "Education Loan",
      description: "Invest in your future with our education loans for students and parents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-600",
      benefits: ["Deferred repayment options", "Lower interest rates", "Subsidized options", "Flexible terms for students"]
    },
    {
      id: "business",
      title: "Business Loan",
      description: "Fuel your business growth with custom financing solutions for entrepreneurs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
      color: "from-orange-500 to-red-600",
      benefits: ["Equipment financing", "Working capital", "Business expansion", "Line of credit options"]
    }
  ];

  // Controls for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
  };

  const handleContinue = () => {
    if (selectedLoan) {
      navigate(`/Loan-Guidance/${selectedLoan}`);
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-400/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
            Select Your Loan Type
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the loan option that best suits your needs. We offer tailored solutions with competitive rates and flexible terms.
          </p>
        </motion.div>
        
        {/* Loan options grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {loanOptions.map((loan) => (
            <motion.div
              key={loan.id}
              variants={item}
              className={`
                rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm shadow-lg border border-white/20
                hover:shadow-xl transition-all duration-300 cursor-pointer
                ${selectedLoan === loan.id ? "ring-4 ring-offset-2 ring-blue-500/50" : ""}
              `}
              onClick={() => setSelectedLoan(loan.id)}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400 } }}
            >
              {/* Loan header with gradient */}
              <div className={`bg-gradient-to-r ${loan.color} p-6 text-white flex justify-between items-center`}>
                <h3 className="text-xl font-bold">{loan.title}</h3>
                <div className="rounded-full bg-white/20 p-2">
                  {loan.icon}
                </div>
              </div>
              
              {/* Loan content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{loan.description}</p>
                
                <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">Key Benefits</h4>
                <ul className="space-y-2">
                  {loan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <motion.span 
                        className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r ${loan.color} mr-2 flex-shrink-0`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* View details button */}
              <div className="px-6 pb-6">
                <motion.div 
                  className={`
                    inline-flex items-center text-sm font-medium
                    ${selectedLoan === loan.id ? `text-${loan.color.split(' ')[0].replace('from-', '')}` : 'text-blue-600'}
                  `}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Continue button */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className={`
              w-full py-4 rounded-full font-bold text-white text-lg relative overflow-hidden
              ${selectedLoan ? 'opacity-100 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
              bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700
              shadow-lg hover:shadow-xl transition-all
            `}
            disabled={!selectedLoan}
            onClick={handleContinue}
            whileHover={selectedLoan ? { scale: 1.03 } : {}}
            whileTap={selectedLoan ? { scale: 0.98 } : {}}
          >
            {/* Shine effect */}
            {selectedLoan && (
              <motion.span 
                className="absolute top-0 left-0 w-20 h-full bg-white/20 skew-x-12"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 1.5,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
            )}
            
            <span className="relative z-10 flex items-center justify-center">
              {selectedLoan ? 'Continue Application' : 'Select a Loan'}
            </span>
          </motion.button>
        </motion.div>

        {/* Chatbot Button */}
        <motion.button
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChatbot}
        >
          {isChatbotOpen ? "Close Chatbot" : "Chat with Us"}
        </motion.button>

        {/* Chatbot Component */}
        <AnimatePresence>
          {isChatbotOpen && (
            <motion.div
              className="fixed bottom-16 right-6 w-10 h-10 bg-white shadow-2xl rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatbotPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
