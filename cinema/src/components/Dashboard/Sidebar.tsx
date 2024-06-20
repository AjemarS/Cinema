import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

interface SideBarProps {}

const Sidebar: React.FC<SideBarProps> = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar__list">
        <li className="sidebar__list__item">
          <Link to={"/admin/dashboard/users"}>Users</Link>
        </li>
        <li className="sidebar__list__item">
          <Link to={"/admin/dashboard/movies"}>Movies</Link>
        </li>
        <li className="sidebar__list__item">
          <Link to={"/admin/dashboard/rooms"}>Rooms</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
