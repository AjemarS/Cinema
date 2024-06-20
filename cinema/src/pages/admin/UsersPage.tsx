import React from "react";
import Navbar from "../../components/Navbar";
import UserCard from "../../components/Dashboard/cards/UserCard";
import { useUsers } from "../../hooks/useUsers";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loading from "../../components/Loading";

const UsersPage: React.FC = () => {
  const { users, loadingUsers, errorUsers } = useUsers();

  if (loadingUsers) {
    return <Loading />;
  }

  if (errorUsers) {
    return <div>{errorUsers}</div>;
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="admin-cards">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
