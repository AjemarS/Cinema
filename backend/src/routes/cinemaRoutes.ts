import express from "express";
import { protect, admin } from "../middleware/authMiddleware";
import {
  postMovie,
  getRooms,
  getMovies,
  streamMovie,
  getRoom,
  createRoom,
  getMovie,
  getMessages,
  sendMessage,
} from "../controllers/movieController";

const router = express.Router();

// Add movie
router.post("/movie", protect, admin, postMovie);

// Get all rooms
router.get("/rooms", protect, getRooms);

// Get all movies
router.get("/movies", protect, getMovies);

// Get movie by id
router.get("/movie/:movieId", protect, getMovie);

// Get movie's filename
router.get("/movies/:filename", protect, streamMovie);

// Get room by id
router.get("/rooms/:roomId", protect, getRoom);

// Create new room
router.post("/room/:roomId", protect, createRoom);

router.get("/messages/:roomId", protect, getMessages);

router.post("/message/:roomId", protect, sendMessage);

export default router;
