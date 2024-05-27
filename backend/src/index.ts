import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

dotenv.config();
import "./utils/DB/db";
import createHttpError from "http-errors";
import router from "./routes";
let PORT = process.env.PORT;
// create express app
const app = express();
//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// parser json request url
app.use(express.json());
// parser json response body
app.use(express.urlencoded({ extended: false }));
// sanitizer request data
app.use(mongoSanitize());
// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
cors;
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
app.post("/test", (req, res) => {
  console.log("first");
  res.send("Abhiik");
});
// use Routes
app.use("/api/v1", router);
//define server PORT
let server;
server = app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(createHttpError.NotFound("This route does not exist"));
});
// // handle http errors
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
const exitHandle = () => {
  if (server) {
    console.log("Server Closed");
    process.exit(1); // kill the process and throw a error
  }
};

const handleUaughtException = (error: any) => {
  console.log(error);
  exitHandle();
};

process.on("uncaughtException", handleUaughtException);
process.on("unhandledRejection", handleUaughtException);
