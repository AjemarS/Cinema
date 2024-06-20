import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loading from "../../components/Loading";
import { useRooms } from "../../hooks/useRooms";
import RoomCard from "../../components/Dashboard/cards/RoomCard";

const UsersPage: React.FC = () => {
  const { rooms, loadingRooms, errorRooms } = useRooms();

  if (loadingRooms) {
    return <Loading />;
  }

  if (errorRooms) {
    return <div>{errorRooms}</div>;
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="admin-cards">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
