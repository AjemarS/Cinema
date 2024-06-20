import { useState, useEffect } from "react";
import authService from "../services/authService";
import { IUser } from "../types";

export const useMe = () => {
  const [user, setUser] = useState<IUser>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getUser();
        setUser(data);
      } catch (error) {
        setErrorUser("Failed to fetch user");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loadingUser, errorUser };
};
