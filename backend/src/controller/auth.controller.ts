import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../model";
import generateOTP from "../utils/auth/otpGenerator";
import { createUser } from "../services/auth/createUser";
import { findUserByEmail } from "../utils/auth/findUser";
import { generateActivationToken } from "../utils/auth/activationLink";
import { generateActivationLink } from "../utils/auth/generateLink";
export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isExits = await findUserByEmail(email);
    console.log(isExits);
    if (isExits) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const user = await createUser(firstName, lastName, email, hashPwd);
    let token = await generateActivationToken(otp, user._id, "10m");
    let link = generateActivationLink(token);
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
