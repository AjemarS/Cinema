import React from "react";
import { useParams } from "react-router-dom";
import MoviePlayer from "../components/Cinema/MoviePlayer";
import ChatSection from "../components/Cinema/ChatSection/ChatSection";
import { useMovie } from "../hooks/useMovie";
import { useRoom } from "../hooks/useRoom";

const Cinema: React.FC = () => {
  const { id } = useParams();

  const { room } = useRoom(id!);

  const { movie } = useMovie(room?.movie);

  return (
    <div className="cinema-page">
      {id && room && movie && <MoviePlayer roomId={id} movie={movie.url}/>}
      {id && <ChatSection roomId={id} />}
    </div>
  );
};

export default Cinema;
