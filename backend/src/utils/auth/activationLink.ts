import sign from "./sign";

export const generateActivationToken = (
  otp: string,
  userId: string,
  expires: string
) => {
  const secret = process.env.ACTIVATION_SECRET;
  let payload = {
    otp: otp,
    userId: userId,
  };
  return sign(payload, expires, secret);
};
