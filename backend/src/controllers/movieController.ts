import { Response } from "express";
import movieService from "../services/movieService";
import { IMovie } from "../models/MovieModel";
import path from "path";
import { IUser } from "../models/UserModel";
import { IMessage } from "../models/MessageModel";

interface MovieRequest {
  body: {
    movie: IMovie;
    url: string;
    user: IUser;
    movieId: string;
    message: IMessage;
  };
  params: {
    filename: string;
    roomId: string;
    movieId: string;
  };
}

export const postMovie = async (req: MovieRequest, res: Response) => {
  const { movie, url } = req.body;

  try {
    const response = await movieService.postMovie(movie, url);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req: MovieRequest, res: Response) => {
  try {
    const rooms = await movieService.getRooms();

    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovies = async (req: MovieRequest, res: Response) => {
  try {
    const movies = await movieService.getMovies();

    res.json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovie = async (req: MovieRequest, res: Response) => {
  const { movieId } = req.params;

  try {
    const movie = await movieService.getMovie(movieId);

    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const streamMovie = async (req: MovieRequest, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../public/movies", filename);

  res.sendFile(filePath);
};

export const getRoom = async (req: MovieRequest, res: Response) => {
  const { roomId } = req.params;

  try {
    const room = await movieService.getRoom(roomId);

    res.json(room);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req: MovieRequest, res: Response) => {
  const { roomId } = req.params;
  const { movieId, user } = req.body;

  try {
    const room = await movieService.createRoom(roomId, movieId, user);

    res.json({
      _id: String(room._id),
      roomId: room.roomId,
      movie: room.movie,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req: MovieRequest, res: Response) => {
  const { roomId } = req.params;

  try {
    const messages = await movieService.getMessages(roomId);

    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req: MovieRequest, res: Response) => {
  const { roomId } = req.params;
  const { message } = req.body;

  try {
    const response = await movieService.sendMessage(roomId, message.username, message.text);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
