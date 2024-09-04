// const { default: AppError } = require("../utils/Apperror");
// const {user}= require('../models/user.models');
// const JWT =require('jsonwebtoken');
// const bcrypt=require('bcrypt');

import AppError from "../utils/Apperror.js";
import user from "../models/user.models.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import fs from "fs";
import sendEmail from "../utils/sendemail.js";
import crypto from "crypto";

const cokkieoption = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(email);
  if (!name || !email || !password) {
    return next(new AppError("all fields are required", 404));
  }
  const data = await user.findOne({ name: name, email: email });
  // if(data){
  //    return  next(new AppError("that email already exists",404));
  // }

  const createuser = new user({
    name: name,
    email: email,
    password: password,
    avatar: {
      public_id: email,
      secure_url: `https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg`,
    },
  });
  if (!createuser) {
    next(new AppError("user not created", 400));
  }
  if (req.file) {
    try {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
      });

      if (upload) {
        createuser.avatar.public_id = upload.public_id;
        createuser.avatar.secure_url = upload.secure_url; //upload.secure_url;

        //fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      next(new AppError(error.message || "issue in file uploading ", 500));
    }
  }
console.log('121');

  //TODO:upload images to be done in this place
  await createuser.save(); // we can only use create .the save is used to save the data to mongoose
  console.log('12');
  
  //token and cookie generation

  const token = await createuser.jwttoken();
  createuser.password = undefined;

  const cookieOptions = {
    secure: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
    sameSite: "None",
  };
  return res.status(200).json({
    success: true,
    data: createuser,
    message: "registered successfully",
    token: token,
    cookieOptions: cookieOptions,
  });
};

const login = async (req, res, next) => {
  // res.header('Access-Control-Allow-Credentials', 'true');
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("all fields are required", 404));
  }

  try {
    const users = await user.findOne({ email }).select("+password");
    if (!users) {
      return next(new AppError("invalid email or password", 404));
    }

    if (!(await bcrypt.compare(String(password), users.password))) {
      return next(new AppError("invalid password", 404));
    }

    // Generate token and set cookie
    const token = await users.jwttoken();
    users.password = undefined;
     console.log(users);
     
    const cookieOptions = {
      secure: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      httpOnly: true,
      sameSite: "None",
    };

    //  res.cookie("token", token, cookieOptions);
    // console.log("Cookie set with token:", token);
    // console.log(res.getHeaders());
    // return res.cookie("token", token, cookieOptions).status(200).json({
    //   success: true,
    //   data: users,
    //   message: "Logged In successfully",
    // });
    return res.status(200).json({
      success: true,
      data: users,
      message: "Logged In successfully",
      token: token,
      cookieOptions: cookieOptions,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 404));
  }
};

const logout = (req, res) => {
  // Set the cookie to expire immediately
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // Only set secure flag in production
    maxAge: 0, // Immediate expiration
    expires: new Date(0), // Set expiration date to the past
  });

  console.log("User logged out, cookie cleared.");

  return res.status(200).json({
    success: true,
    message: "User successfully logged out",
  });
};

const getprofile = async (req, res) => {
  // const dat = await user.findById(req?.user?.id);
  // console.log('the getprofile',dat);
  
  // return res.status(200).json({
  //   success: true,
  //   data: dat,
  //   message: "successful",
  // });

  try {
    const userdata = await user.findById(req.user.id);
    if (!userdata) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    return res.status(200).json({
      success: true,
      data: userdata,
    });

  } catch (error) {
    return next(new AppError(error.message || "Issue in getting profile", 500));
  }


};

//forgotpassword
const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("please provide email", 404));
  }

  const dat = user.findOne({ email });

  if (!dat) {
    return next(new AppError("user email not found", 404));
  }

  const token = await dat.generatepasswordtoken();
  await dat.save();
  const resetPasswordUrl = `${process.env.FROTEND_URL}/reset-password/${resetToken}`;

  // We here need to send an email to the user with the token
  const subject = "Reset Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

  try {
    await sendEmail(email, subject, message);

    // If email sent successfully send the success response
    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully`,
    });
  } catch (error) {
    // If some error happened we need to clear the forgotPassword* fields in our DB
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return next(
      new AppError(
        error.message || "Something went wrong, please try again.",
        500
      )
    );
  }
};

//resetpassword
const resetpassword = async (req, res, next) => {
  const { token } = req.params;
  const { email, password } = req.body;

  const fortoken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const u = await user
    .findOne({
      forgotPasswordToken: fortoken,
      forgotPasswordExpiry: { $gt: Date.now() },
    })
    .select("+password");

  if (!u) {
    return next(new AppError("Invalid token", 400));
  }

  u.password = password;
  u.forgotPasswordExpiry = undefined;
  u.forgotPasswordToken = undefined;

  await u.save();
  u.password = undefined;
  return res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

const updatepassword = async function (req, res, next) {
  const { oldpassword, newpassword } = req.body;
  if (!oldpassword || !newpassword) {
    return next(new AppError("Please provide old and new password", 400));
  }
  if (oldpassword === newpassword) {
    return next(new AppError("Old and new password can't be same", 400));
  }

  const userdata = await user.findById(req.user.id).select("+password");
  if (!userdata) {
    return next(new AppError("User not found", 401));
  }

  if (!userdata.comparePassword(oldpassword)) {
    return next(new AppError("Old password is incorrect", 401));
  }

  userdata.password = newpassword;
  await userdata.save();
  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};

const updateprofile = async(req, res, next) =>{

  const {name} = req.body;
  console.log('the name is :',req.body);
  
  const userdata = await user.findById(req.user.id);
  console.log('k1');
  
  if (!userdata) {
    return next(new AppError("User not found", 401));
  }

  try {
    if (name) {
      userdata.name = name;
    }

    if (req.file) {
      console.log('k5');
      console.log('the file path is :',req.file.path);
      
      try {
        const upload = await cloudinary.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
        });
console.log('k4',upload.secure_url);

        if (upload) {
          userdata.avatar.public_id = upload.public_id;
          userdata.avatar.secure_url = upload.secure_url; //upload.secure_url;

          //fs.rm(`uploads/${req.file.filename}`);
        }
        console.log('k3');
        
      } catch (error) {
        return next(
          new AppError(error.message || "issue in file uploading ", 500)
        );
      }
    }
    console.log('k2');
    await userdata.save();

    console.log('k6');
    
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return next(
      new AppError(error.message || "issue in updating profile", 500)
    );
  }
};
export {
  register,
  login,
  logout,
  getprofile,
  forgotpassword,
  resetpassword,
  updatepassword,
  updateprofile,
};

// module.exports={
//     register,
//     login,logout,getprofile
// }
