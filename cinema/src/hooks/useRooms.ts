import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import { IRoom } from "../types";

export const useRooms = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loadingRooms, setLoadingRooms] = useState<boolean>(true);
  const [errorRooms, setErrorRooms] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await movieService.getRooms();
        setRooms(data.rooms);
      } catch (error) {
        setErrorRooms("Failed to fetch rooms");
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  return { rooms, loadingRooms, errorRooms };
};
