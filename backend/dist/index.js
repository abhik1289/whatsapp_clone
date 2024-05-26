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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
require("./utils/db");
const http_errors_1 = __importDefault(require("http-errors"));
const routes_1 = __importDefault(require("./routes"));
let PORT = process.env.PORT;
// create express app
const app = (0, express_1.default)();
//morgan
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }
// parser json request url
app.use(express_1.default.json());
// parser json response body
app.use(express_1.default.urlencoded({ extended: false }));
// sanitizer request data
app.use((0, express_mongo_sanitize_1.default)());
// file upload
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
//cors
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//   })
// );
app.post("/test", (req, res) => {
    console.log("first");
});
// use Routes 
app.use("/api/v1", routes_1.default);
//define server PORT
let server = app.listen(5000, () => {
    console.log("Server listening on port", PORT);
});
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(http_errors_1.default.NotFound("This route does not exist"));
}));
// handle http errors
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
}));
const exitHandle = () => {
    if (server) {
        console.log("Server Closed");
        process.exit(1); // kill the process and throw a error
    }
};
const handleUaughtException = (error) => {
    console.log(error);
    exitHandle();
};
process.on("uncaughtException", handleUaughtException);
process.on("unhandledRejection", handleUaughtException);
