// const {Schema , model}=require('mongoose');
// const bcrypt = require('bcrypt');
// const JWT=require('jsonwebtoken');

import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userschema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
      minLength: [5, "the name must require atleast 5 characters"],
      maxLength: [20, "the name should not exceed 20 charcter"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minLength: [8, "min 8 charcters"],
      select: false,
    },
    subscription: {
      id: String,
      status: String,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken:{
      type:String
    },
    forgotPasswordExpiry:{
      type:Date
    },
  },
  { timestamps: true }
);

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
}); //this is also middleware

userschema.methods = {
  jwttoken: function () {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
        name: this.name,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  generatepasswordtoken: async function (){
    const token = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
    return token;
  },
};

const user = model("User", userschema); // collection name is User

export default user;
// module.exports=user;
