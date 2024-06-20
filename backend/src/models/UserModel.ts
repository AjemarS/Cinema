import mongoose, { Document, Schema } from "mongoose";
import { IRoom } from "./RoomModel";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  room?: IRoom["_id"];
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
