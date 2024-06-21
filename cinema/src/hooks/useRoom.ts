import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import { IRoom } from "../types";

export const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<IRoom>();
  const [loadingRoom, setLoadingRoom] = useState<boolean>(true);
  const [errorRoom, setErrorRoom] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await movieService.getRoom(roomId);

        setRoom(data.room);
      } catch (error) {
        setErrorRoom("Failed to fetch room");
      } finally {
        setLoadingRoom(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  return { room, loadingRoom, errorRoom };
};
