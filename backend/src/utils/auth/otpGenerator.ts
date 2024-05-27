export default function generateOTP(): string {
  const otpLength: number = 6;
  const otpChars: string = "0123456789";
  let otp: string = "";

  for (let i = 0; i < otpLength; i++) {
    const randomIndex: number = Math.floor(Math.random() * otpChars.length);
    otp += otpChars[randomIndex];
  }

  return otp;
}

// Example usage
