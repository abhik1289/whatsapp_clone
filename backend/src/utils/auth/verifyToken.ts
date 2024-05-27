import jwt from "jsonwebtoken";

export default function verifyToken(token: string, secret: any) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: any, response: any) => {
      if (error) {
        console.log(error);
        reject(null);
      } else {
        resolve(response);
      }
    });
  });
}
