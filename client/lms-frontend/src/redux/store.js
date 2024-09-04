import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authslice';
import courseReducer from './slice/courseslice';
import razorpayReducer from './slice/razorpay_slice';

const store=configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer,
        razorpay:razorpayReducer
    },
   
    devTools:true
});

export default store;