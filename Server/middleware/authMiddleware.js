// const { default: AppError } = require("../utils/Apperror");
// const JWT=require('jsonwebtoken');

import AppError from "../utils/Apperror.js";
import JWT from "jsonwebtoken";

const isloggedin=(req,res,next)=>{
    console.log('isloggedin');
    
   try{
  // const token = req.cookies.token;
  const token = req.headers['authorization'];

   // Correct way to access cookies

console.log(token,'hello');

  if (!token) {
    return res.status(401).json({ message: "Please login eswar to access this resource", success: false });
  }

  try {
    const detail = JWT.verify(token, process.env.SECRET);
    req.user = detail;
    console.log('the details:',detail);
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: "Invalid token", success: false });
  }
      // const {token}= req?.cookies
      // console.log(token)
      // if(!token){
      //   return res.status(401).json({message:"Please login to access this resource pls",success:false});
      //   }

      // const detail=JWT.verify(token,process.env.SECRET);
      // if(!detail){
      //   return res.status(401).json({message:"Please login to access this resource",success:false});
      // }
      // req.user=detail;

      
      next();
}catch(error){
  console.log(error);
  
}
}


const authorizeduser = (...roles) => {
  return (req, res, next) => {
    console.log('Middleware defined with roles:', roles);

    const givenrole = req.user.role;
    console.log(givenrole);
    console.log(roles);

    if (!roles.includes(givenrole)) {
      return next(new AppError('You do not have access to this resource', 403));
    }
     console.log('ssss');
     
    next();
  };
};

// const authorizeduser=(...roles)=>{
//   console.log('Middleware defined with roles:', roles);
//   return (req,res,next)=>{
//     console.log('m1');
    
// const givenrole=req.user.role;
// console.log(givenrole);
// console.log(roles);

// console.log(roles.includes(givenrole));

// if(!roles.includes(givenrole)){
//   return next(new AppError('u didnrt have an access to do',500));
// }

//   next();
// }
// }





const authorizedsubscription=function(req,res,next){

  
  const givenrole=req.user.role;
  console.log(givenrole);
  
  const status=req.user.subscription.status;
  console.log(status);
  
  if(status!=='active' && givenrole!=='ADMIN'){

    
    return next(new AppError('u didnrt have an access to do',500));
  }

  
   next();
}
export  {isloggedin,authorizeduser,authorizedsubscription};
// module.exports=isloggedin;