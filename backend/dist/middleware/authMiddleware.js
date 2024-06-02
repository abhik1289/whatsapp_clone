"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const getToken = req.headers["authorization"];
    if (!getToken) {
        return next(http_errors_1.default.Unauthorized());
    }
    const orginalToken = getToken.split(" ")[1];
    const secretKey = process.env.SECRET_KEY_REFRESH_TOKEN;
    if (!secretKey) {
        return next(http_errors_1.default.InternalServerError("Secret key not found."));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(orginalToken, secretKey);
        if (!decoded) {
            return next(new http_errors_1.default.Unauthorized("Not decoded."));
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        return next(http_errors_1.default.Unauthorized("Invalid token."));
    }
}
exports.default = authMiddleware;
