"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../../utils/auth/verifyToken"));
function verify(token, secret) {
    return (0, verifyToken_1.default)(token, secret);
}
exports.default = verify;
