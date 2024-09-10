import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isValidEmail, isValidPassword } from '../Helper/helpers';
import { useDispatch } from 'react-redux';
import { createuser, loginuser } from '../redux/slice/authslice';

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 const dispatch=useDispatch();
 const navigate=useNavigate();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(e.target.name.value);
    // Handle form submission
   if(!formData.email || !formData.password){
    toast.error('Please fill all the details!!');
    return ;
   }

   if(!isValidEmail(formData.email)){
    toast.error('Invalid Email!!');
   
return ;}
if(!isValidPassword(formData.password)){
    toast.error('invalid password');
    return ;
}


const response = await dispatch(loginuser(formData));
console.log(await response)

if(response?.payload?.data?.success) {
    navigate("/");
}
setFormData({
    email: '',
    password: '',

});

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <h1 className='text-2xl font-bold pb-1'>Log In Details</h1>
           
          </div>
         
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className='pt-2'>Dont have an account? <Link to='/reset-password'>Forgot Passowrd</Link> <Link to='/signup' className='cursor-pointer text-center text-blue-700'>Sign in</Link></p>
        
      </div>
    </div>
  );
};

export default SigninPage;
