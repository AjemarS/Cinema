import mongoose, { Schema } from "mongoose";
import { IMovie } from "./MovieModel";
import { IUser } from "./UserModel";

interface IRoom extends Document {
  _id: string;
  roomId: string;
  movie: IMovie["_id"];
  users: IUser["_id"][];
}

const roomSchema = new Schema({
  roomId: { type: String, required: true },
  movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
export type { IRoom };
