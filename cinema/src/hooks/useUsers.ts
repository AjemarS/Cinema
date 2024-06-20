import { useState, useEffect } from "react";
import authService from "../services/authService";
import { IUser } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getAllUsers();
        setUsers(data.users);
      } catch (error) {
        setErrorUsers("Failed to fetch users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loadingUsers, errorUsers };
};
