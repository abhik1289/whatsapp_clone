import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";
import cors from "cors";
dotenv.config();
import "./utils/db";
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
//cors
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);
//define server PORT
app.listen(5000, () => {
  console.log("Server listening on port", PORT);
});
