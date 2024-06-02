import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
  doesConversationExist,
  createConvo,
  populateUser,
  getConversations,
} from "../services/conversation/conversation.service";
import { findUserById } from "../services/auth/findUser.service";
import createHttpError from "http-errors";

export const createConversation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const sender_id = req.user?.userId;
    const { receiver_id, isGroup } = req.body;
    if (!sender_id || !receiver_id) {
      return next(
        createHttpError.BadRequest("Sender and receiver IDs are required")
      );
    }

    const existingConversation = await doesConversationExist(
      sender_id,
      receiver_id,
      isGroup
    );

    if (existingConversation) {
      return res.status(404).send(existingConversation);
    } else {
      const user = await findUserById(receiver_id);
      if (!user) {
        return next(createHttpError.BadGateway("User not found"));
      }

      const convoData = {
        name: user.firstName,
        isGroup: false,
        users: [sender_id, receiver_id],
      };

      const conversation = await createConvo(convoData);

      if (conversation) {
        const populatedUserInfo = await populateUser(
          conversation._id,
          "User",
          "-password"
        );
        res.status(200).json({ populatedUserInfo });
      } else {
        return next(
          createHttpError.InternalServerError("Failed to create conversation")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const conversations = await getConversations(userId);
    res.status(200).json({ conversations });
  } catch (error) {
    next(error);
  }
};
