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
      <div>MovieId: {room.movie}</div>
      <div>
        Users - {room.users.length}:{" "}
        {room.users.map((user) => (
          <div key={user}>{user}</div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
