import express from "express";
import { login, logout, refreshToken, register } from "../controller/auth.controller";
// import trimRequest from "trim-request";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/token", refreshToken);



export default router;
