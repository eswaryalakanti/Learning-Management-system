import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import HomeLayout from '../Layouts/HomeLayout';
import { useNavigate } from 'react-router-dom';
import { updatepasssword } from '../redux/slice/authslice';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  // Get user data from the Redux store
  const userurl = useSelector(state => state.auth.auth_data.data.avatar.secure_url);
  const username = useSelector(state => state.auth.auth_data.data.name);
  const useremail = useSelector(state => state.auth.auth_data.data.email);
 const dispatch=useDispatch();
 const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res=await dispatch(updatepasssword({oldpassword,newpassword}));
    if(res?.payload?.data?.success){
     toast.success('Password updated successfully');
  navigate('/');
    }else{
     toast.error('error in updating')
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <motion.img
            src={userurl}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />

          <h1 className="text-center text-2xl font-bold text-white mb-2">{username}</h1>
          <p className="text-center text-gray-400 mb-6">{useremail}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="oldpassword" className="block text-gray-400 font-medium mb-1">
                Old Password
              </label>
              <input
                type="password"
                id="oldpassword"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newpassword" className="block text-gray-400 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newpassword"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
            >
              Update Password
            </motion.button>
          </form>
        </motion.div>
      </div>
    </HomeLayout>
  );
};

export default UpdatePassword;
