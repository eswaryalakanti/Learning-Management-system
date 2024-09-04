import { razorpay } from '../server.js';
import user from "../models/user.models.js";
import AppError from "../utils/Apperror.js";
import crypto from 'crypto';
import Payment from '../models/paymentmodel.js';



const getRazorpayapikey =function(req,res,next){
   try{
   console.log('the key',process.env.RAZORPAY_KEY_ID);
   
     return res.status(200).json({
        success:true,
        message:'razorpay created successfully',
        key:process.env.RAZORPAY_KEY_ID
     });


   }catch(error){
    return next(new AppError(error.message,400));
   }
}

const subscription =async function(req,res,next){
    try{

       const id=req.user.id;
       console.log('1');
       
       const data=await user.findById(id);
       console.log(data);
       
       if(!data){
        return next(new AppError('user not found',400));
       }
       if(data.role=='ADMIN'){
        return next(new AppError('admin cant subscribe',400));
       }

//    const sub=await razorpay.subscriptions.create({
//     plan_id:process.env.RAZORPAY_PLAN_ID,
//     customer_notify:1

//    });    //changed

   data.subscription.id='123';// data.subscription.id=sub.id;
   data.subscription.status='sub.status';//   data.subscription.status=sub.status;
   console.log(data);
   
   await data.save();
console.log('3');

   return res.status(200).json({
    success:true,
    message:'successfully subscribed',
    data:data
    });



    }catch(error){
     return next(new AppError(error.message,400));
    }
}

const verifypayment=async function(req,res,next){
    try{
        const id=req.user.id;
        const data=await user.findById(id);
        if(!data){
         return next(new AppError('user not found',400));
        }
        const subscriptionId = data.subscription.id;
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =req.body;
        console.log('v1');
        
        const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id}|${subscriptionId}`)
        .digest('hex');
       console.log('vv2');
       
      // Check if generated signature and signature received from the frontend is the same or not


    //   if (generatedSignature !== razorpay_signature) {
      
    //     return next(new AppError('Payment not verified, please try again.', 400));
    //   }
     console.log('vv3');
     
    //   await Payment.create({
    //     razorpay_payment_id: razorpay_payment_id,
    //     razorpay_subscription_id: razorpay_subscription_id,
    //     razorpay_signature:razorpay_signature}); 

        data.subscription.status='active';
        console.log('v2',data);
        
        await data.save();
console.log('v3');

        return res.status(200).json({
            success:true,
            message:'payment verified',
            data:data});

    }catch(error){
     return next(new AppError(error.message,400));
    }
}

const cancelsubscription= async function(req,res,next){

    
    try{

        
        const id=req.user.id;
        const data=await user.findById(id);

        
        if(!user){
         return next(new AppError('user not found',400));
        }

 
        if(user.role==='ADMIN'){
            return next(new AppError('admin cannot cancel the subscription',400));
        }

        
        const subid=data.subscription.id;
         console.log(data);
         
        
        //const sub=await razorpay.subscriptions.cancel(subid);
        data.subscription.status='';
        console.log(data);
        

        
        await data.save();
        console.log('c2');
        
        return res.status(200).json({
            success:true,
            data:data,
            message:'subscription cancelled',
        });
    }catch(error){
     return next(new AppError(error.message,400));
    }
}




const getallpayments=async function(req,res,next){
//     try{
//         const {count}=req.query;

//         const sub =razorpay.subscriptions.all({
//             count:count || 10
//         });
// return res.status(200).json({
//     success:true,
//     data:sub,
//     message:'success'
// });
       
//     }catch(error){
//      return next(new AppError(error.message,400));
//     }

const { count, skip } = req.query;

// Find all subscriptions from razorpay
const allPayments = await razorpay.subscriptions.all({
  count: count ? count : 10, // If count is sent then use that else default to 10
  skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
});

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const finalMonths = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

const monthlyWisePayments = allPayments.items.map((payment) => {
  // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
  const monthsInNumbers = new Date(payment.start_at * 1000);

  return monthNames[monthsInNumbers.getMonth()];
});

monthlyWisePayments.map((month) => {
  Object.keys(finalMonths).forEach((objMonth) => {
    if (month === objMonth) {
      finalMonths[month] += 1;
    }
  });
});

const monthlySalesRecord = [];

Object.keys(finalMonths).forEach((monthName) => {
  monthlySalesRecord.push(finalMonths[monthName]);
});

res.status(200).json({
  success: true,
  message: 'All payments',
  allPayments,
  finalMonths,
  monthlySalesRecord,
});



}

export {
    getRazorpayapikey,
    subscription,
    verifypayment,
    cancelsubscription,
    getallpayments
}