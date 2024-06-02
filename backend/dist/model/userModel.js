"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
        default: "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
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
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
