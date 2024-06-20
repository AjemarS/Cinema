import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });

  return response.data;
};

const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};

export default {
  register,
  login,
  getProfile,
  getAllUsers,
  getUser,
};
