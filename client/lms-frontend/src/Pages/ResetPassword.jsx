import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { resetPassword } from '../redux/slice/authslice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const dispatch = useDispatch();
 console.log(token);
 
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res=await dispatch(resetPassword({email, password, token}));
   
    // Call the resetPassword action
    if(res?.payload?.data?.success){
        toast.success('okay success transaction');
    }else{
        toast.error('error in reset -password')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-gray-300 font-medium mb-1">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
