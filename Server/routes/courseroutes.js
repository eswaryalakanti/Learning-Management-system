import express from 'express';
import {getallcourses,getlecturesbyid,createCourse,deleteCourse,updateCourse,createlecture,deletelecture, searchCourses} from '../controllers/courseController.js'
import {isloggedin,authorizeduser}  from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';


const router= express.Router();
router.get('/search',searchCourses);
 router.route('/').get(getallcourses).post(isloggedin,authorizeduser('ADMIN'),upload.single('thumbnail'),createCourse);

 router.route('/:cid')
        .get(isloggedin,getlecturesbyid)
        .put(isloggedin,authorizeduser('ADMIN'),updateCourse)
        .delete(isloggedin,authorizeduser('ADMIN'),deleteCourse)
        .post(isloggedin,authorizeduser('ADMIN'),createlecture);
router.route('/:cid/:title/delete')
       .post(isloggedin,authorizeduser('ADMIN'),deletelecture);


export default router;

