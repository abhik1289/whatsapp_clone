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
const morgan_1 = __importDefault(require("morgan"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
require("./utils/DB/db");
const http_errors_1 = __importDefault(require("http-errors"));
const routes_1 = __importDefault(require("./routes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
let PORT = process.env.PORT;
// create express app
const app = (0, express_1.default)();
//morgan
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
// parser json request url
app.use(express_1.default.json());
// parser json response body
app.use(express_1.default.urlencoded({ extended: false }));
// sanitizer request data
app.use((0, express_mongo_sanitize_1.default)());
//body parser
app.use((0, cookie_parser_1.default)());
// file upload
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
cors_1.default;
app.use((0, cors_1.default)({
    origin: "http://localhost:8080",
}));
app.post("/testUser", authMiddleware_1.default, (req, res) => {
    // console.log(req);
    console.log(req.user);
});
// use Routes
app.use("/api/v1", routes_1.default);
//define server PORT
let server;
server = app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(http_errors_1.default.NotFound("This route does not exist"));
}));
// // handle http errors
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
