import React from "react";
import "./Popup.css";

interface PopupProps {
  isPopup: boolean;
  setIsPopup: (isPopup: boolean) => void;
  children: React.ReactNode;
}

const Popup = ({ isPopup, setIsPopup, children }: PopupProps) => {
  return (
    <div className="overlay" onClick={() => setIsPopup(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <button className="popup__btn--close" onClick={() => setIsPopup(!isPopup)}>
        &times;
      </button>
    </div>
  );
};

export default Popup;
