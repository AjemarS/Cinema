import Message, { IMessage } from "../models/MessageModel";
import Movie, { IMovie } from "../models/MovieModel";
import Room, { IRoom } from "../models/RoomModel";
import { IUser } from "../models/UserModel";

const postMovie = async (movie: IMovie, url: string): Promise<IMovie> => {
  const movieExist = await Movie.findOne({ url });

  if (movieExist) {
    throw new Error("Movie is already exist");
  }

  const film = Movie.create(movie);

  return film;
};

const getRooms = async (): Promise<{ rooms: IRoom[] }> => {
  const rooms = await Room.find();

  if (!rooms) {
    throw new Error("Failed to get rooms");
  }

  return { rooms };
};

const getMovies = async (): Promise<{ movies: IMovie[] }> => {
  const movies = await Movie.find().select("title image year");

  if (!movies) {
    throw new Error("Failed to get movies");
  }

  return { movies };
};

const getMovie = async (_id: string): Promise<{ movie: IMovie }> => {
  const movie = await Movie.findById({ _id });

  if (!movie) {
    throw new Error("Failed to get movie");
  }

  return { movie };
};

const getRoom = async (roomId: string): Promise<{ room: IRoom }> => {
  const room = await Room.findOne({ roomId }).select("-users");

  if (!room) {
    throw new Error("Failed to get room");
  }

  return { room };
};

const createRoom = async (roomId: string, _id: string, user: IUser): Promise<IRoom> => {
  const roomExist = await Room.findOne({ roomId });

  if (roomExist) {
    throw new Error("Room is already exist");
  }

  const movieExist = await Movie.findById({ _id });

  if (!movieExist) {
    throw new Error("Movie is undefined");
  }

  const movie = movieExist._id;

  const room = Room.create({ roomId, movie, users: [user._id] });

  return room;
};

const getMessages = async (roomId: string): Promise<{ messages: IMessage[] }> => {
  const messages = await Message.find({ room: roomId }).sort("timestamp");

  if (!messages) {
    throw new Error("Failed to get messages");
  }

  return { messages };
};

const sendMessage = async (room: string, username: string, text: string) => {
  const message = new Message({
    room,
    username,
    text,
  });

  if (!message) {
    throw new Error("Failed to set message");
  }

  try {
    const savedMessage = await message.save();
    return savedMessage;
  } catch (error: any) {
    throw new Error(`Error saving message: ${error.message}`);
  }
};

const getUsersInRoom = async (roomId: string) => {
  try {
    const room = await Room.findOne({ roomId: roomId });

    if (room) {
      return room.users.length;
    } else {
      throw new Error("Room not found");
    }
  } catch (error: any) {
    throw new Error(`Error getting users in room: ${error.message}`);
  }
};

const addUserToRoom = async (roomId: string, userId: IUser["_id"]) => {
  try {
    await Room.findOneAndUpdate(
      { roomId },
      { $addToSet: { users: userId } },
      { new: true, useFindAndModify: false }
    );
  } catch (error: any) {
    throw new Error(`Error adding user to room: ${error.message}`);
  }
};

const deleteUserFromRoom = async (roomId: string, userId: IUser["_id"]) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomId },
      { $pull: { users: userId } },
      { new: true, useFindAndModify: false }
    );

    // if (room && room.users.length === 0) {
    //   await room.deleteOne();
    // }
  } catch (error: any) {
    throw new Error(`Error removing user from room: ${error.message}`);
  }
};

export default {
  postMovie,
  getRooms,
  getMovies,
  getMovie,
  getRoom,
  createRoom,
  getMessages,
  sendMessage,
  getUsersInRoom,
  addUserToRoom,
  deleteUserFromRoom,
};
