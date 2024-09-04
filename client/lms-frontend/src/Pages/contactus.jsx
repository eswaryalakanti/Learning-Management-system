import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HomeLayout from '../Layouts/HomeLayout';
import axiosInstance from '../config/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const ContactUs = () => {
  // State to store form data
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: ''
  });
const navigate=useNavigate();
  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
 const handleSubmit = async(e) => {
    e.preventDefault();
  try{
    const res=axiosInstance.post('/contact', contact);

    toast.promise(res,{
        loading: "Wait! sending the query ",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send ur query",
    });
    const response=(await res).data;
    console.log('the contact',response);
     if(response?.success){
        setContact({
            name: '',
            email: '',
            message: ''
          });
     } 




  }catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message);
  
  }
    

  };

  // Background color animation
  const backgroundVariants = {
    start: { backgroundColor: '#111827' },  // Initial color (gray-900)
    end: { backgroundColor: '#374151' },    // Final color (gray-700)
  };

  return (<HomeLayout>
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      variants={backgroundVariants}
      initial="start"
      animate="end"
      transition={{ duration: 2, yoyo: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              whileFocus={{ scale: 1.05, borderColor: "#7f9cf5" }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              whileFocus={{ scale: 1.05, borderColor: "#7f9cf5" }}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <motion.textarea
              id="message"
              name="message"
              value={contact.message}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              whileFocus={{ scale: 1.05, borderColor: "#7f9cf5" }}
            />
          </div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
    </HomeLayout>
  );
};

export default ContactUs;
