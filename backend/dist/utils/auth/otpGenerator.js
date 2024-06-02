"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateOTP() {
    const otpLength = 6;
    const otpChars = "0123456789";
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * otpChars.length);
        otp += otpChars[randomIndex];
    }
    return otp;
}
exports.default = generateOTP;
// Example usage
