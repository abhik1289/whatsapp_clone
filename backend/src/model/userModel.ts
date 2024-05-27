import mongoose, { Document, Model, Schema } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  status?: string;
  password: string;
  activation: boolean;
}

const userSchema: Schema<User> = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email address"],
    // unique: [true, "This email address already exists"],
    lowercase: true,
  },
  activation: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
  },
  status: {
    type: String,
    default: "Hey there! I am using WhatsApp",
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [
      6,
      "Please make sure your password is at least 6 characters long",
    ],
    maxLength: [
      128,
      "Please make sure your password is less than 128 characters long",
    ],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
