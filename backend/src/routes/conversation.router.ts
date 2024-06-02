import express from "express";
import {
  createConversation,
  getConversation,
} from "../controller/conversation.controller";

const router = express.Router();

router.post("/create_convo", createConversation);
router.get("/get_convo", getConversation);

export default router;
