import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SendButton from "./SendButton";
import SetMessageInput from "./SetMessageInput";

import "./ChatSection.css";
import { Socket, io } from "socket.io-client";
import { IMessage } from "../../../types";
import { useMe } from "../../../hooks/useMe";

interface ChatSectionProps {
  roomId: string;
}

const chatSocket: Socket = io("http://localhost:3000/chat");

export type UsernameColor = "#aa00ff" | "#0000ff";

const ChatSection: React.FC<ChatSectionProps> = ({ roomId }) => {
  const [usersInRoom, setUsersInRoom] = useState(0);
  const [text, setText] = useState("");

  const [messages, setMessages] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { user } = useMe();

  useEffect(() => {
    chatSocket.emit("joinRoom", { roomId: roomId, _id: user?._id, username: user?.username });

    chatSocket.on("updateMessages", (newMessages) => {
      setMessages(newMessages.messages);
    });

    chatSocket.on("roomUsers", (usersCount: number) => {
      setUsersInRoom(usersCount);
    });
  }, [roomId, user?._id, user?.username]);

  const handleSubmit = () => {
    try {
      chatSocket.emit("sendMessage", { roomId, username: user?.username, text: text });
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  // Слідкуємо за зміною довжини масиву всіх повідомлень і скролимо до кінця блоку при кожній зміні
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages?.length]);

  return (
    <section className="chat">
      <span className="chat__title">Chat</span>
      <div ref={scrollRef} className="chat__messages">
        {messages &&
          messages.map((value, index) => (
            <p key={index}>
              <span style={{ color: "#0000ff" }}>{value.username}</span>: <span>{value.text}</span>
            </p>
          ))}
      </div>
      <div className="chat__controlls">
        <SetMessageInput message={text} setMessage={setText} onSubmit={handleSubmit} />
        <div className="chat__controlls__user">
          <div className="chat__controlls__viewers">
            <FontAwesomeIcon icon={faUser} color="brown" /> <div>&nbsp; {usersInRoom}</div>
          </div>
          <SendButton onSubmit={handleSubmit} isDisabled={!text} />
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
