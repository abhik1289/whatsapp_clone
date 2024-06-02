"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const sign_1 = __importDefault(require("../../utils/auth/sign"));
const generateToken = (data, expires, secretKey) => {
    return (0, sign_1.default)(data, expires, secretKey);
};
exports.generateToken = generateToken;
