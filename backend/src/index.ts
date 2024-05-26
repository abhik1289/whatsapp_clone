import express from "express";
import dotenv from "dotenv";
dotenv.config();
import  "./utils/db";

let PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => {
  console.log("Server listening on port", PORT);
});
