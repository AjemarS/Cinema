import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUpdateMode) {
      return;
    }

    const interval = setInterval(() => {
      navigate(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [isUpdateMode, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">Dashboard</div>
      <div>
        {isUpdateMode ? (
          <button className="navbar__upd__btn" onClick={() => setIsUpdateMode(!isUpdateMode)}>
            <FontAwesomeIcon icon={faRotate} size="lg" style={{ color: "#00ff00" }} />
          </button>
        ) : (
          <button className="navbar__upd__btn" onClick={() => setIsUpdateMode(!isUpdateMode)}>
            <FontAwesomeIcon icon={faRotate} size="lg" style={{ color: "#ff0000" }} />
          </button>
        )}
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
