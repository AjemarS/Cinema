import { useState } from "react";
import "./CreateRoomCard.css";
import Popup from "../../../Popup";
import CreateRoomForm from "../../../forms/CreateRoomForm";

const CreateRoomCard = () => {
  const [isPopup, setIsPopup] = useState(false);

  const handleClick = () => {
    setIsPopup(!isPopup);
    window.scrollTo(0, screenTop);
  };

  return (
    <div>
      <div className="create-room-card" onClick={handleClick}>
        <div className="create-room-card__content">
          <span className="create-room-card__content--title">Create a room</span>
          <button className="create-room-card__content--btn">+</button>
        </div>
      </div>
      {isPopup && (
        <Popup isPopup={isPopup} setIsPopup={setIsPopup}>
          <CreateRoomForm isPopup={isPopup} />
        </Popup>
      )}
    </div>
  );
};

export default CreateRoomCard;
