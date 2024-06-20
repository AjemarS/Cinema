import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RoomCard.css";

interface RoomCardProps {
  roomId: string;
  children: React.ReactNode;
}

const RoomCard = ({ roomId, children }: RoomCardProps) => {
  return (
    <div className="room-card">
      <div className="room-card__info">
        <div>
          <span style={{ color: "#0000ff" }}>#</span>
          {roomId}
        </div>
        <div>
          {/* {viewers} */}
          <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default RoomCard;
