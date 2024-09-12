import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authslice';
import courseReducer from './slice/courseslice';
import razorpayReducer from './slice/razorpay_slice';
import lecturereducer from './slice/lectureSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer,
        razorpay:razorpayReducer,
        lectures:lecturereducer
    },
   
    devTools:true
});

export default store;