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
      <div>
        RoomId: <Link to={`/rooms/${room.roomId}`}>{room.roomId}</Link>
      </div>
      <div>
        MovieId: <Link to={`/admin/dashboard/movies?movie=${room.movie}`}>{room.movie}</Link>
      </div>
      <div>
        Users - {room.users.length}:{" "}
        {room.users.map((user) => (
          <li key={user}>
            <Link to={`/admin/dashboard/users?user=${user}`}>{user}</Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
