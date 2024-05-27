import express from "express";
import { register } from "../controller/auth.controller";
// import trimRequest from "trim-request";
const router = express.Router();

router.post("/register", register);

export default router;
