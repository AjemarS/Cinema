import React from "react";
import MovieCard from "../components/Cinema/Movies/cards/MovieCard";
import { Link } from "react-router-dom";
import { useRooms } from "../hooks/useRooms";
import RoomCard from "../components/Cinema/Movies/cards/RoomCard";
import CreateRoomCard from "../components/Cinema/Movies/cards/CreateRoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../components/Cinema/Movies/SearchInput";
import Loading from "../components/Loading";
import "./Pages.css";
import LogoutBtn from "../components/LogoutBtn";

const RoomsPage: React.FC = () => {
  const { rooms, loadingRooms, errorRooms } = useRooms();

  if (loadingRooms) {
    return <Loading />;
  }

  if (errorRooms) {
    return <div>{errorRooms}</div>;
  }

  return (
    <div className="rooms-page">
      <div className="rooms-page__title">
        <h2>Choose a room</h2>
        <SearchInput data={rooms} />
        <LogoutBtn />
      </div>
      <div className="rooms">
        {rooms.map((room) => (
          <div key={room._id}>
            <RoomCard key={room._id} roomId={room.roomId}>
              <MovieCard key={room._id} movieId={room.movie} />
            </RoomCard>
            <Link to={`/rooms/${room.roomId}`} key={room.roomId} className="movie-card__link">
              Choose
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        ))}
        <CreateRoomCard />
      </div>
    </div>
  );
};

export default RoomsPage;
