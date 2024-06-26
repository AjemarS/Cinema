import { Request, Response } from "express";
import authService from "../services/authService";

interface RegisterUserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    role?: string;
  };
}

interface LoginUserRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

export const registerUser = async (req: RegisterUserRequest, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await authService.registerUser(username, email, password, role);

    if (!user) {
      res.status(401).json("Register failed, please try again");
    }

    res.json({
      _id: String(user._id),
      username: user.username,
      email: user.email,
      role: user.role,
      token: authService.generateToken(String(user._id), user.role),
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: LoginUserRequest, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.loginUser(username, password);

    if (!result || !result.user || !result.token) {
      res.status(401).json("Login failed, please try again");
    }

    const { user, token } = result;

    res.json({
      _id: String(user._id),
      username: user.username,
      role: user.role,
      token: token,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await authService.getUser(userId);

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
