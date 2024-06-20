import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchRoomInput from "./Cinema/Movies/SearchInput";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">Dashboard</div>
      <SearchRoomInput data={[]} />
      <div>
        {localStorage.getItem("token") ? (
          <button onClick={handleLogout} className="navbar__btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
