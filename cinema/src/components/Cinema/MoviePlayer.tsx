import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Socket, io } from "socket.io-client";
import Player from "video.js/dist/types/player";
import { getFullUrl } from "../../utils/getFullUrl";

interface MoviePlayerProps {
  roomId: string;
  movie: string;
}

const videoSocket: Socket = io("http://localhost:3000/video");

const MoviePlayer: React.FC<MoviePlayerProps> = ({ roomId, movie }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player>();

  useEffect(() => {
    videoSocket.emit("joinRoom", roomId);

    videoSocket.on("play", () => {
      videoRef.current?.play();
    });

    videoSocket.on("pause", () => {
      videoRef.current?.pause();
    });

    videoSocket.on("seek", (currentTime) => {
      if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
        videoRef.current.currentTime = currentTime;
      }
    });

    videoSocket.on("synchronize", (currentTime: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
      }
    });

    return () => {
      videoSocket.offAny();

      videoSocket.emit("leaveRoom", roomId);
      videoSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const videoJsOptions = {
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: getFullUrl(movie),
          type: "video/mp4",
        },
      ],
    };

    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, videoJsOptions);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [movie]);

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const timeout = setTimeout(() => {
      videoSocket.emit("synchronize", e.currentTarget.currentTime);
    }, 5000);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="movie-player" style={{ width: window.innerWidth - 300, flexGrow: "1" }}>
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js"
          onChange={handleTimeUpdate}
          onPlay={() => videoSocket.emit("play", roomId)}
          onPause={() => videoSocket.emit("pause", roomId)}
          onTimeUpdate={() =>
            videoSocket.emit("seek", { roomId, currentTime: videoRef.current?.currentTime })
          }
          onSeeked={() =>
            videoSocket.emit("seek", { roomId, currentTime: videoRef.current?.currentTime })
          }
        />
      </div>
    </div>
  );
};

export default MoviePlayer;
