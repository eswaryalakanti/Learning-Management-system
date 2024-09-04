// const express= require('express');
// const isloggedin=require('./middleware/authMiddleware');
// const {register,login,logout,getprofile} =require('../controllers/user.controller')


import express from 'express';
import {isloggedin}  from '../middleware/authMiddleware.js';
import { register, login, logout, getprofile,forgotpassword,resetpassword,updatepassword,updateprofile } from '../controllers/user.controller.js';
import upload from '../middleware/multer.js'

const router=express.Router();

router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.get('/logout',isloggedin,logout);
router.get('/me',isloggedin,getprofile);
router.post('/reset',forgotpassword);
router.post('/reset/:token',resetpassword);
router.post('/update-password',isloggedin,updatepassword);
router.post('/updateprofile',isloggedin,upload.single('avatar'),updateprofile);//here avatar is <input type='file'  name='avatar'/>

// module.exports=router;
export default router;
