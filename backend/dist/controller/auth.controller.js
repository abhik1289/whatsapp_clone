"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpGenerator_1 = __importDefault(require("../utils/auth/otpGenerator"));
const createUser_service_1 = require("../services/auth/createUser.service");
const findUser_service_1 = require("../services/auth/findUser.service");
const activationLink_service_1 = require("../services/auth/activationLink.service");
const generateLink_service_1 = require("../services/auth/generateLink.service");
const signIn_service_1 = __importDefault(require("../services/auth/signIn.service"));
const verify_service_1 = __importDefault(require("../services/auth/verify.service"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isExits = yield (0, findUser_service_1.findUserByEmail)(email);
        console.log(isExits);
        if (isExits) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashPwd = yield bcrypt_1.default.hash(password, 10);
        const otp = (0, otpGenerator_1.default)();
        const user = yield (0, createUser_service_1.createUser)(firstName, lastName, email, hashPwd);
        let data = {
            otp: otp,
            userId: user._id,
        };
        const token = yield (0, activationLink_service_1.generateToken)(data, "10m", process.env.ACTIVATION_SECRET);
        const link = (0, generateLink_service_1.generateActivationLink)(token);
        const accessToken = yield (0, activationLink_service_1.generateToken)({
            userId: user._id,
        }, "1d", process.env.SECRET_KEY_ACCESS_TOKEN);
        const refreshToken = yield (0, activationLink_service_1.generateToken)({
            userId: user._id,
        }, "30d", process.env.SECRET_KEY_REFRESH_TOKEN);
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
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Invalid email or password" });
        }
        const userInfo = yield (0, findUser_service_1.findUserByEmail)(email);
        if (userInfo) {
            const result = yield (0, signIn_service_1.default)(userInfo._id, password);
            if (result) {
                const accessToken = yield (0, activationLink_service_1.generateToken)({
                    userId: userInfo._id,
                }, "1d", process.env.SECRET_KEY_ACCESS_TOKEN);
                const refreshToken = yield (0, activationLink_service_1.generateToken)({
                    userId: userInfo._id,
                }, "30d", process.env.SECRET_KEY_REFRESH_TOKEN);
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
            }
            else {
                res.status(401).json({ error: "Invalid username or password" });
            }
        }
        else {
            res.status(401).json({ error: "user not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const logout = (req, res) => {
    try {
        res.clearCookie("refreshToken", {
            path: "api/v1/auth/refreshToken",
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.logout = logout;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resfresh_token = req.cookies.refreshToken;
        if (!resfresh_token) {
            return res.status(401).json({ error: "Refresh token not available" });
        }
        const check = yield (0, verify_service_1.default)(resfresh_token, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!check) {
            return res.status(401).json({ error: "Refresh token not created" });
        }
        const user = yield (0, findUser_service_1.findUserById)(check.userId);
        const accessToken = yield (0, activationLink_service_1.generateToken)({
            userId: user._id,
        }, "1d", process.env.SECRET_KEY_ACCESS_TOKEN);
        res.status(200).json({
            accessToken,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.refreshToken = refreshToken;
