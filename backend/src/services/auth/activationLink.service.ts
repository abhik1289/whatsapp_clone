import sign from "../../utils/auth/sign";

export const generateToken = (
  data: Object,
  expires: string,
  secretKey: any
) => {
  return sign(data, expires, secretKey);
};
