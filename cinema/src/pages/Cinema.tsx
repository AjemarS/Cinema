import React from "react";
import { useParams } from "react-router-dom";
import MoviePlayer from "../components/Cinema/MoviePlayer";
import ChatSection from "../components/Cinema/ChatSection/ChatSection";
import { getFullUrl } from "../utils/getFullUrl";
import { useMovie } from "../hooks/useMovie";
import { useRoom } from "../hooks/useRoom";

const Cinema: React.FC = () => {
  const { id } = useParams();

  const { room } = useRoom(id!);

  const { movie } = useMovie(room?.movie);

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: getFullUrl(movie?.url),
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="cinema-page">
      {id && room && movie && <MoviePlayer roomId={id} videoJsOptions={videoJsOptions} />}
      {id && <ChatSection roomId={id} />}
    </div>
  );
};

export default Cinema;
