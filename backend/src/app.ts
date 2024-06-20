import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import cinemaRoutes from "./routes/cinemaRoutes";
import movieService from "./services/movieService";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io
const socketServer = http.createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("Новий користувач підключений до чату");

  socket.on("joinRoom", async (data) => {
    socket.join(data.roomId);
    console.log(`Користувач ${data.username} приєднався до чату кімнати з кодом ${data.roomId}`);

    // Зберігаємо інформацію про користувача, який приєднався до кімнати
    await movieService.addUserToRoom(data.roomId, data._id);

    const usersInRoom = await movieService.getUsersInRoom(data.roomId);
    // Передаємо кількість користувачів у кімнаті для відображення на клієнті
    chatNamespace.in(data.roomId).emit("roomUsers", usersInRoom);

    // Retrieve the updated list of messages for the room
    const messages = await movieService.getMessages(data.roomId);

    // Emit the updated list of messages to all clients in the room
    chatNamespace.to(data.roomId).emit("updateMessages", messages);
  });

  socket.on("sendMessage", async (data) => {
    try {
      // Save the new message to the database
      await movieService.sendMessage(data.roomId, data.username, data.text);

      // Retrieve the updated list of messages for the room
      const messages = await movieService.getMessages(data.roomId);

      // Emit the updated list of messages to all clients in the room
      chatNamespace.to(data.roomId).emit("updateMessages", messages);
    } catch (error) {
      console.error("Помилка надсилання повідомлення:", error);
    }
  });

  socket.on("leaveRoom", async (data) => {
    socket.leave(data.roomId);
    console.log(`Користувач ${data.username} вийшов з чату кімнати з кодом ${data.roomId}`);

    // Видаляємо інформацію про користувача, який вийшов з кімнати
    await movieService.deleteUserFromRoom(data.roomId, data._id);

    // Передаємо оновлену кількість користувачів у кімнаті для відображення на клієнті
    const usersInRoom = await movieService.getUsersInRoom(data.roomId);
    chatNamespace.in(data.roomId).emit("roomUsers", usersInRoom);
  });

  socket.on("disconnect", () => {
    console.log("Користувач відключений від чату");
  });
});

const videoNamespace = io.of("/video");
videoNamespace.on("connection", (socket) => {
  console.log("Новий користувач підключений до відео");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Користувач приєднався до відео кімнати з кодом ${roomId}`);
  });

  socket.on("play", (roomId) => {
    videoNamespace.in(roomId).emit("play");
  });

  socket.on("pause", (roomId) => {
    videoNamespace.in(roomId).emit("pause");
  });

  socket.on("seek", (data) => {
    videoNamespace.in(data.roomId).emit("seek", data.currentTime);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`Користувач вийшов з відео кімнати з кодом ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("Користувач відключений від відео");
  });
});

socketServer.listen("3000");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cinema", cinemaRoutes);

export default app;
