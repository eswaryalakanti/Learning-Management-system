// const express= require('express');
// const cors=require('cors');
// const cookieParser = require('cookie-parser');
// const router=require('./routes/userRoutes');
// const errormiddleware=require('./middleware/errorMiddlewaregloabl');

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/userRoutes.js';
import errormiddleware from './middleware/errorMiddlewaregloabl.js';
import morgan  from 'morgan';
import courseRouter from './routes/courseroutes.js'
import denv from 'dotenv';
import contactrouter from './routes/contactroutes.js';
import razorpayrouter from './routes/paymentroute.js';


denv.config();


const app=express();



//middleware
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin:`${process.env.FROTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
    optionsSuccessStatus: 200,
}));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');  // Allow only your frontend origin
//   res.header('Access-Control-Allow-Credentials', 'true');  // Allow credentials
//   next();
// });
 


app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/v1/user',router);
app.use('/api/v1/contact',contactrouter)
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/payments',razorpayrouter);

app.use('*',(req,res)=>{
  res.status(404).send('oops page not found');
})

app.use(errormiddleware);// global error middleware


export default app;
// module.exports = app;