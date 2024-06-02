import { Response, Request, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
  }
function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const getToken: string | undefined = req.headers["authorization"];

  if (!getToken) {
    return next(createHttpError.Unauthorized());
  }

  const orginalToken = getToken.split(" ")[1];
  const secretKey: Secret | undefined = process.env.SECRET_KEY_REFRESH_TOKEN;

  if (!secretKey) {
    return next(createHttpError.InternalServerError("Secret key not found."));
  }

  try {
    const decoded = jwt.verify(orginalToken, secretKey) as JwtPayload;

    if (!decoded) {
      return next(new createHttpError.Unauthorized("Not decoded."));
    }
     req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return next(createHttpError.Unauthorized("Invalid token."));
  }
}

export default authMiddleware;
