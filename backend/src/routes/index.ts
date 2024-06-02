import express from "express";
import authRouter from "./auth.router";
import conversationRouter from "./conversation.router";
import messageRouter from "./message.router";
import authMiddleware from "../middleware/authMiddleware";

router.use("/auth", authRouter);
router.use("/conversation", authMiddleware, conversationRouter);
router.use("/message", authMiddleware,messageRouter );


export default router;
