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
const findUser_service_1 = require("./findUser.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SignIn = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield (0, findUser_service_1.findUserById)(userId);
    if (findUser) {
        const isValid = yield bcrypt_1.default.compare(password, findUser.password);
        if (isValid) {
            return true;
        }
        else {
            return false;
        }
    }
    return false; // Added for cases where findUser is null
});
exports.default = SignIn;
