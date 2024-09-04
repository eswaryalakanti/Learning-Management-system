import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isValidEmail, isValidPassword } from '../Helper/helpers';
import { useDispatch } from 'react-redux';
import { createuser } from '../redux/slice/authslice';

const SignupPage = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar:'',
  });
  
 const dispatch=useDispatch();
 const navigate=useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

        setFormData({...formData,avatar:file})
        console.log(formData.avatar)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(e.target.name.value);
    // Handle form submission
   if(!formData.name || !formData.email || !formData.password){
    toast.error('Please fill all the details!!');
    return ;
   }
   if(formData.name.length <5 && formData.name.length>19){
    toast.error('Full name should be at least 5 characters long!!');
   return ;}
   if(!isValidEmail(formData.email)){
    toast.error('Invalid Email!!');
   
return ;}
if(!isValidPassword(formData.password)){
    toast.error('invalid password');
    return ;
}


const response = await dispatch(createuser(formData));

if(response?.payload?.data?.success) {
    navigate("/");
}
setFormData({
    email: '',
    name: '',
    password: '',
    avatar: ''
});
setImage("");

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <h1 className='text-2xl font-bold pb-1'>Registration Details</h1>
            <label htmlFor="image-upload" className="cursor-pointer">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                />
              ) : (
                <Avatar
                  sx={{ width: 96, height: 96 }}
                  className="border-2 border-gray-300"
                >
                  <Person />
                </Avatar>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
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
        <p className='pt-2'>Already have an account?  <Link to='/login' className='cursor-pointer text-center text-blue-700'>log in</Link></p>
      </div>
    </div>
  );
};

export default SignupPage;
