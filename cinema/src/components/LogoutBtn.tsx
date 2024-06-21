import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutBtn.css";

const LogoutBtn: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout__btn">
      Logout
    </button>
  );
};

export default LogoutBtn;
