import express from 'express'
import {isloggedin,authorizeduser}  from '../middleware/authMiddleware.js';
import { createcontact } from '../controllers/contactController.js';

const router=express.Router();

router.route('/').post(isloggedin,authorizeduser("USER"), createcontact);

export default router;
