import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  room: string;
  username: string;
  text: string;
  timestamp: Date;
}

const messageSchema = new Schema({
  room: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
export type { IMessage };
