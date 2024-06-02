import mongoose, { Document, Schema, Model } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;



interface IConversation extends Document {
  name: string;
  picture: string;
  isGroup: boolean;
  users: any;
  latestMessage: any;
  admin: any;
}

const conversationSchema: Schema<IConversation> = new Schema<IConversation>(
  {
    name: {
      type: String,
      required: [true, "Conversation's name is required."],
      trim: true,
    },
    picture: {
      type: String,
      // required: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    collection: "conversations",
    timestamps: true,
  }
);

const ConversationModel: Model<IConversation> =
  mongoose.models.ConversationModel ||
  mongoose.model<IConversation>("ConversationModel", conversationSchema);

export default ConversationModel;
