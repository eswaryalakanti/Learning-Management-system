import { Schema,model } from "mongoose";

// Define the schema for the contact information
const contactSchema = new Schema({
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
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill in a valid email address",
      ],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Contact model from the schema
const contact = model('contact', contactSchema);

export default contact;
