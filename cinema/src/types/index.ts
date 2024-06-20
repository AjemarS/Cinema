export interface IMovie extends Document {
  _id: string;
  title: string;
  url: string;
  image: string;
  year: string;
  tags: string[];
  description: string;
}

// Movie ID and users ID
export interface IRoom {
  _id: string;
  roomId: string;
  movie: IMovie["_id"];
  users: IUser["_id"][];
}

export interface IUser {
  role: string;
  _id: string;
  username: string;
  email: string;
}

export interface IMessage {
  room: string;
  username: string;
  text: string;
  timestamp?: Date;
}
