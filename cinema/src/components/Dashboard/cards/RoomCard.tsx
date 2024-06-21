import { Link } from "react-router-dom";
import { IRoom } from "../../../types";
import "./index.css";

interface RoomCard {
  room: IRoom;
}

const RoomCard = ({ room }: RoomCard) => {
  // Create link for every ID (that refers to object), that will redirect to admin user page, for example
  return (
    <div className="admin-card">
      <div>RoomId: {room.roomId}</div>
      <div>
        MovieId: <Link to={`/admin/dashboard/movies?movie=${room.movie}`}>{room.movie}</Link>
      </div>
      <div>
        Users - {room.users.length}:{" "}
        {room.users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
