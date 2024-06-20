import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateUserRoute from "./PrivateUserRoute";
import PrivateAdminRoute from "./PrivateAdminRoute";
import Dashboard from "../pages/admin/Dashboard";
import Cinema from "../pages/Cinema";
import ChoosePage from "../pages/RoomsPage";
import UsersPage from "../pages/admin/UsersPage";
import MoviesPage from "../pages/admin/MoviesPage";
import RoomsPage from "../pages/admin/RoomsPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateUserRoute />}>
          <Route path="/rooms" element={<ChoosePage />} />
          <Route path="/rooms/:id" element={<Cinema />} />
        </Route>
        <Route path="/admin" element={<PrivateAdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/users" element={<UsersPage />} />
          <Route path="/admin/dashboard/movies" element={<MoviesPage />} />
          <Route path="/admin/dashboard/rooms" element={<RoomsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
