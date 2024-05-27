import { Request, Response } from "express";
import bcrypt from "bcrypt";
import ejs from "ejs";
import generateOTP from "../utils/auth/otpGenerator";
import { createUser } from "../services/auth/createUser.service";
import {
  findUserByEmail,
  findUserById,
} from "../services/auth/findUser.service";
import { generateToken } from "../services/auth/activationLink.service";
import { generateActivationLink } from "../services/auth/generateLink.service";
import SignIn from "../services/auth/signIn.service";
import verify from "../services/auth/verify.service";
// import sendMail from "../utils/mail/sendMail";
// import path from "path";

interface registerBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password }: registerBody = req.body;
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
    let data = {
      otp: otp,
      userId: user._id,
    };
    const token = await generateToken(
      data,
      "10m",
      process.env.ACTIVATION_SECRET
    );
    const link = generateActivationLink(token);
    const accessToken = await generateToken(
      {
        userId: user._id,
      },
      "1d",
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    const refreshToken = await generateToken(
      {
        userId: user._id,
      },
      "30d",
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
      path: "api/v1/auth/refreshToken",
    });
    // const data = {
    //   name: user.name,
    //   activationCode: otp,
    //   link
    // };
    // await ejs.renderFile(path.join(__dirname, "../mail/active-mail.ejs"), data);
    // await sendMail({
    //   email: user.email,
    //   subject: "Email Activation",
    //   template: "active-mail.ejs",
    //   data,
    // });
    res.status(200).json({
      message: "Account created successfully",
      accessToken: accessToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

interface loginBody {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: loginBody = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Invalid email or password" });
    }
    const userInfo = await findUserByEmail(email);
    if (userInfo) {
      const result = await SignIn(userInfo._id, password);
      if (result) {
        const accessToken = await generateToken(
          {
            userId: userInfo._id,
          },
          "1d",
          process.env.SECRET_KEY_ACCESS_TOKEN
        );
        const refreshToken = await generateToken(
          {
            userId: userInfo._id,
          },
          "30d",
          process.env.SECRET_KEY_REFRESH_TOKEN
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30 * 1000,
          path: "api/v1/auth/refreshToken",
        });
        res.status(200).json({
          message: "Login successfully",
          accessToken: accessToken,
          user: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
          },
        });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ error: "user not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      path: "api/v1/auth/refreshToken",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const resfresh_token = req.cookies.refreshToken;
    if (!resfresh_token) {
      return res.status(401).json({ error: "Refresh token not available" });
    }
    const check: any = await verify(
      resfresh_token,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!check) {
      return res.status(401).json({ error: "Refresh token not created" });
    }

    const user: any = await findUserById(check.userId);
    const accessToken = await generateToken(
      {
        userId: user._id,
      },
      "1d",
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    res.status(200).json({
      accessToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
