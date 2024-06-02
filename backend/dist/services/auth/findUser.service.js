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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByEmail = void 0;
const model_1 = require("../../model");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield model_1.userModel.findOne({ email: email });
    if (isExits) {
        return isExits;
    }
    return false;
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExits = yield model_1.userModel.findById(userId);
    if (isExits) {
        return isExits;
    }
    return false;
});
exports.findUserById = findUserById;
