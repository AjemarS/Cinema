import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import { IMessage } from "../types";

export const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<IMessage[]>();
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [errorMessages, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await movieService.getMessages(roomId);
        setMessages(data.messages);
      } catch (error) {
        setErrorMessage("Failed to fetch messages");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  return { messages, loadingMessages, errorMessages };
};
