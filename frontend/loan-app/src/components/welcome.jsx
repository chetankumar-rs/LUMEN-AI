import React from "react";
import { motion } from "framer-motion";
import { useNavigate,Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

 

function Outlet() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white"
    >
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Lumen</h1>
      <p className="text-xl mb-6">Your personalized financial assistant</p>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg text-lg font-semibold"
      >
        <Link to='/home'> Get Started</Link>
      </motion.button>
    </motion.div>
  );
}
