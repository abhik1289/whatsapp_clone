import { ObjectId } from "mongoose";
import { ConversationModel, userModel } from "../../model";
import createHttpError from "http-errors";

interface IConversation {
  _id: ObjectId;
  isGroup: boolean;
  users: ObjectId[];
  latestMessage: any; // Type this according to your schema
}

export const doesConversationExist = async (
  sender_id: ObjectId,
  receiver_id: ObjectId,
  isGroup: boolean
): Promise<any> => {
  try {
    if (typeof isGroup === "boolean" && !isGroup) {
      const convos = await ConversationModel.find({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: sender_id } } },
          { users: { $elemMatch: { $eq: receiver_id } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .exec();

      if (!convos || convos.length === 0) {
        return null;
      }

      const populatedConvos = await userModel.populate(convos, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });

      return populatedConvos[0];
    } else {
    }
  } catch (error) {
    throw createHttpError(400, "Oops... Something went wrong!");
  }
};

export const createConvo = async (data: any) => {
  const convo = await ConversationModel.create(data);
  if (convo) return convo;
  else throw createHttpError("Oops... Something went wrong!");
};

export const populateUser = async (
  convoId: any,
  fieldToPopulate: string,
  skipFiled: string
) => {
  const data = await ConversationModel.findById({ _id: convoId }).populate(
    fieldToPopulate,
    skipFiled
  );
  if (data) return data;
  else throw createHttpError("Oops... Something went wrong!");
};

export const getConversations = async (userId: any) => {
  let conversations;
  await ConversationModel.find({
    users: {
      $elemMatch: {
        $eq: userId,
      },
    },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({
      updatedAt: -1,
    })
    .then(async (results: any) => {
      results = await userModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((error: any) => {
      throw createHttpError("Oops... Something went wrong!");
    });
  return conversations;
};
