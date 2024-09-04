import { useEffect, useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'
import axiosInstance from './config/AxiosInstance';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Aboutus from './Layouts/Aboutus';
import NotFound from './Pages/NotFound';
import SignupPage from './Pages/Signup';
import SigninPage from './Pages/Signin';
import ContactUs from './Pages/contactus';
import DeniedPage from './Pages/Denied';
import AllLectures from './Pages/courses/AllLectures';

import CourseDescription from './Pages/courses/Coursedesc';
import { useSelector } from 'react-redux';
import RequireAuth from './components/auth/RequireAuth';
import CreateCourse from './Pages/courses/CreateCourse';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import Checkout from './Pages/payments/Checkout';
import CheckoutSuccess from './Pages/payments/Checkoutsuccess';




function App() {
  const role=useSelector((state)=>state?.auth?.role);
useEffect(()=>{
  //toast.success('kk');
  console.log('hhe');
  console.log(role)
},[role]);
  return (<div className='bg-black'>
  <Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/aboutus' element={<Aboutus/>} />
  <Route path='/signup' element={<SignupPage/>} />
  <Route path='/contactus' element={<ContactUs/>} />
  <Route path='/courses/description' element={<CourseDescription/>} />
  <Route path='/login' element={<SigninPage/>} />

  <Route element={<RequireAuth reqroles={['ADMIN','USER']} />}>
     <Route path='/user/profile' element={<Profile/>} />
     <Route path='/user/editprofile' element={<EditProfile/>} />
     <Route path='/checkout' element={<Checkout/>} />
  </Route>

  <Route element={<RequireAuth reqroles={['ADMIN']} />}>
     <Route path='/course/create' element={<CreateCourse/>} />
  </Route>

  <Route element={<RequireAuth reqroles={['USER']} />}>
     <Route path='/checkout/success' element={<CheckoutSuccess/>} />

  </Route>


  <Route path='/denied' element={<DeniedPage/>} />
  <Route path='/courses' element={<AllLectures/>} />
  <Route path='*' element={<NotFound/>} />
</Routes>
  </div>

  )
}

export default App
