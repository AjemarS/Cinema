import React from "react";
import MovieCard from "../components/Cinema/Movies/cards/MovieCard";
import { Link, useNavigate } from "react-router-dom";
import { useRooms } from "../hooks/useRooms";
import RoomCard from "../components/Cinema/Movies/cards/RoomCard";
import CreateRoomCard from "../components/Cinema/Movies/cards/CreateRoomCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../components/Cinema/Movies/SearchInput";
import Loading from "../components/Loading";
import "./Pages.css";

const RoomsPage: React.FC = () => {
  const navigate = useNavigate();

  const { rooms, loadingRooms, errorRooms } = useRooms();

  if (loadingRooms) {
    return <Loading />;
  }

  if (errorRooms) {
    return <div>{errorRooms}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="rooms-page">
      <div className="rooms-page__title">
        <h2>Choose a room</h2>
        <SearchInput data={rooms} />
        <button onClick={handleLogout} className="navbar__btn">
          Logout
        </button>
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
