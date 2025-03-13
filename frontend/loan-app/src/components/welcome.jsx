import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function Outlet() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  // LUMEN features messages - keeping these exactly the same
  const messages = [
    {
      title: "Welcome to LUMEN",
      description: "Your Loan Understanding & Management Expert Navigator",
      icon: "✨"
    },
    {
      title: "Loan Eligibility Support",
      description: "Personalized loan recommendations based on your financial profile",
      icon: "📊"
    },
    {
      title: "Application Guidance",
      description: "Step-by-step instructions for your loan application process",
      icon: "📝"
    },
    {
      title: "Financial Literacy",
      description: "Educating you on credit scores and responsible borrowing",
      icon: "🧠"
    },
    {
      title: "Multilingual Support",
      description: "Accessible in multiple languages for inclusivity",
      icon: "🌍"
    }
  ];

  // Auto-rotate messages and redirect - keeping timing at 1000ms
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev >= messages.length - 1) {
          clearInterval(messageInterval);
          setTimeout(() => {
            setShowPopup(false);
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(messageInterval);
  }, [navigate, messages.length]);

  // Animation variants - simplified for a more classic feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "linear-gradient(to bottom right, #1a365d, #2a4365)",
              "linear-gradient(to bottom right, #2a4365, #1a365d)",
              "linear-gradient(to bottom right, #1a365d, #2a4365)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="w-full h-full"
        />
        
        {/* Subtle light beams */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-300 to-transparent transform -rotate-45" />
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-blue-300 to-transparent transform rotate-45" />
        </div>
      </div>
      
      {/* Main content */}
      <motion.div className="relative z-10 flex flex-col items-center">
        {/* Logo - simplified animation */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl font-light tracking-wider"
            animate={{ 
              textShadow: ["0 0 8px rgba(255,255,255,0.3)", "0 0 12px rgba(255,255,255,0.5)", "0 0 8px rgba(255,255,255,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            lumen
          </motion.h1>
        </motion.div>
        
        {/* AI Assistant Popup - keeping structure but refining style */}
        <AnimatePresence mode="wait">
          {showPopup && (
            <motion.div
              key="popup"
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/5 backdrop-blur-sm rounded-lg p-5 w-96 border border-white/10 shadow-lg"
            >
              <motion.div className="flex items-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4 text-xl"
                >
                  {messages[currentMessage].icon}
                </motion.div>
                
                <div>
                  <AnimatePresence mode="wait">
                    <motion.h2 
                      key={`title-${currentMessage}`}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-lg font-medium"
                    >
                      {messages[currentMessage].title}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentMessage}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white/80 text-sm"
                >
                  {messages[currentMessage].description}
                </motion.p>
              </AnimatePresence>
              
              {/* Progress dots - simplified */}
              <div className="flex justify-center mt-5 space-x-2">
                {messages.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: i === currentMessage ? 1 : 0.4,
                      width: i === currentMessage ? '12px' : '8px'
                    }}
                    className="h-1 bg-white/70 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
          
          {!showPopup && (
  <motion.div
    key="redirect"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex flex-col items-center"
  >
    <motion.div
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 1 }}
      className="text-6xl mb-4"
    >
      🚀
    </motion.div>
    <h2 className="text-3xl font-bold mb-2">Ready to go!</h2>
    <p className="text-xl">Taking you to your dashboard...</p>
  </motion.div>
)}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

