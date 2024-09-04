import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-blue-500 text-white relative">
      {/* Animated 404 */}
      <motion.h1 
        className="text-9xl font-extrabold mb-4" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Animated Page Not Found Text */}
      <motion.p 
        className="text-2xl font-light mb-8 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>


      {/* Animated Button */}
      <button onClick={()=>navigate(-1)}>
      <motion.div
        className="flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaHome className="mr-2" /> Go Back 
      </motion.div>
      </button> 
    </div>
  );
};

export default NotFound;
