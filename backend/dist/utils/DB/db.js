"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_url = process.env.DB_URL || "mongodb://localhost:27017/whatsapp";
mongoose_1.default.connect(database_url)
    .then(() => console.log('Connected!')).catch((err) => console.log(err));
