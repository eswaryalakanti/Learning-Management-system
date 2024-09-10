import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/slice/authslice'; // Adjust the path
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  
  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email)); // Call the forgotPassword action
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
