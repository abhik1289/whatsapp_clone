import verifyToken from "../../utils/auth/verifyToken";

export default function verify(token: string, secret: any) {
  return verifyToken(token, secret);
}
