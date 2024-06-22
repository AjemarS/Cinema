import axios from "axios";

const API_URL = "http://localhost:5000/api/cinema";

const getRooms = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getMovieList = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getRoom = async (roomId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getMovie = async (movieId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createRoom = async (roomId: string, movieId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/room/${roomId}`,
    { movieId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const getMessages = async (movieId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/messages/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const sendMessage = async (
  roomId: string,
  message: { room: string; username: string; text: string }
) => {
  const token = localStorage.getItem("token");
  console.log(message);
  const response = await axios.post(
    `${API_URL}/message/${roomId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default {
  getRooms,
  getMovieList,
  getRoom,
  getMovie,
  createRoom,
  getMessages,
  sendMessage,
};
