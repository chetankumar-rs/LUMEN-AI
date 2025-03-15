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

  // Enhanced LUMEN features messages with realistic icons
  const messages = [
    {
      title: "Welcome to LUMEN",
      description: "Your Loan Understanding & Management Expert Navigator",
      icon: "✨"  // Sparkle icon representing illumination/guidance
    },
    {
      title: "Loan Eligibility Support",
      description: "Personalized loan recommendations based on your financial profile",
      icon: "💼"  // Briefcase representing business/financial matters
    },
    {
      title: "Application Guidance",
      description: "Step-by-step instructions for your loan application process",
      icon: "🧭"  // Compass representing guidance/navigation
    },
    {
      title: "Financial Literacy",
      description: "Educating you on credit scores and responsible borrowing",
      icon: "📚"  // Books representing education/knowledge
    },
    {
      title: "Multilingual Support",
      description: "Accessible in multiple languages for inclusivity",
      icon: "🌐"  // Globe with meridians representing worldwide/language support
    }
  ];

  // Keeping timing at 1000ms as requested
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev >= messages.length - 1) {
          clearInterval(messageInterval);
          setTimeout(() => {
            setShowPopup(false);
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(messageInterval);
  }, [navigate, messages.length]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(8px)",
      transition: { 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -15,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center h-screen overflow-hidden relative"
    >
      {/* Enhanced rich background with multiple gradients */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #0c2d5e 0%, #1a4d8c 50%, #0a2958 100%)",
              "linear-gradient(135deg, #183a64 0%, #265d9e 50%, #142f52 100%)",
              "linear-gradient(135deg, #0c2d5e 0%, #1a4d8c 50%, #0a2958 100%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
        
        {/* Enhanced light effects */}
        <div className="absolute inset-0">
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient opacity-40" 
               style={{background: 'radial-gradient(circle at 50% 50%, rgba(100, 181, 246, 0.2) 0%, transparent 70%)'}} />
          
          {/* Dynamic light rays */}
          <motion.div 
            className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-blue-200 to-transparent opacity-30"
            animate={{ 
              rotate: [-45, -40, -45],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-blue-200 to-transparent opacity-30"
            animate={{ 
              rotate: [45, 40, 45],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          {/* Subtle particle effects */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-200"
                style={{ 
                  left: `${20 + i * 15}%`, 
                  top: `${10 + i * 15}%` 
                }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <motion.div className="relative z-10 flex flex-col items-center justify-center space-y-[100px] space-x-5 w-full">
 
        {/* Enhanced logo animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mb-10"
        >
          <div className="relative flex items-center justify-center h-64 mb-12 overflow-hidden">
      {/* Static background glow */}
      <div className="absolute w-full h-full bg-blue-900/5 blur-3xl rounded-full transform scale-75" />
      
      {/* Main text with subtle animation */}
      <motion.h1 
        className="text-7xl font-light tracking-widest text-white relative z-10"
        style={{ letterSpacing: "0.15em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        LUMEN
      </motion.h1>
      
      {/* Subtle underline */}
      <motion.div
        className="absolute bottom-12 left-1/2 h-px bg-blue-300/40 z-20"
        style={{ translateX: "-50%" }}
        initial={{ width: 0 }}
        animate={{ width: "12rem" }}
        transition={{ 
          duration: 2,
          delay: 0.5,
          ease: "easeOut"
        }}
      />
      
      {/* Smooth, static light effect behind text */}
      <div className="absolute top-1/2 left-1/2 w-64 h-12 bg-blue-400/10 blur-xl rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      
      {/* Very subtle pulsing light */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-12 bg-blue-400/5 blur-xl rounded-full"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />
    </div>
        </motion.div>
        
        {/* Enhanced AI Assistant Popup */}
        <AnimatePresence mode="wait">
        {showPopup && (
  <motion.div
    key="popup"
    variants={popupVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-white/15 backdrop-blur-lg rounded-2xl p-7 w-96 border border-white/30 shadow-2xl"
    style={{
      boxShadow: "0 15px 30px -8px rgba(0,0,0,0.25), 0 0 20px -5px rgba(100,181,246,0.4), inset 0 1px 1px rgba(255,255,255,0.15)",
      background: "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(30,64,175,0.1) 100%)"
    }}
  >
    <motion.div 
      className="flex items-center mb-6"
      initial={{ x: -5, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 12px rgba(59,130,246,0.5)",
            "0 0 20px rgba(59,130,246,0.7)",
            "0 0 12px rgba(59,130,246,0.5)"
          ]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-14 h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full flex items-center justify-center mr-5 text-2xl shadow-lg"
        style={{ 
          boxShadow: "0 0 15px rgba(59,130,246,0.6), inset 0 1px 1px rgba(255,255,255,0.4)"
        }}
      >
        {messages[currentMessage].icon}
      </motion.div>
      
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.h2 
            key={`title-${currentMessage}`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xl font-semibold text-white tracking-wide"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
          >
            {messages[currentMessage].title}
          </motion.h2>
        </AnimatePresence>
      </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 rounded-xl p-4 mb-5 border-l-2 border-blue-400/50"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${currentMessage}`}
          variants={messageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-white/95 text-sm leading-relaxed"
        >
          {messages[currentMessage].description}
        </motion.p>
      </AnimatePresence>
    </motion.div>
    
    {/* Enhanced progress indicators with better animation */}
    <div className="flex justify-center mt-5 space-x-3">
      {messages.map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: i === currentMessage ? 1 : 0.35,
            width: i === currentMessage ? '20px' : '8px',
            height: i === currentMessage ? '4px' : '3px',
            backgroundColor: i === currentMessage 
              ? 'rgba(147,197,253,0.95)' 
              : 'rgba(255,255,255,0.4)'
          }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
          className="rounded-full"
          style={{
            boxShadow: i === currentMessage 
              ? "0 0 8px rgba(147,197,253,0.6)" 
              : "none"
          }}
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
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-white"
            >
              <motion.div
  animate={{ 
    y: [0, -15, 0],
    scale: [1, 1.2, 1]
  }}
  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
  className="text-6xl mb-5"
>
  ⚡
</motion.div>
<h2 className="text-3xl font-bold mb-3 text-white/95">Ready to go!</h2>
<p className="text-xl text-white/80">Taking you to your dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}