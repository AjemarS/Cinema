import React from "react";
import Navbar from "../../components/Navbar";
import UserCard from "../../components/Dashboard/UserCard";
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
    <div>
      <Navbar />
      <Sidebar />
      <div className="page">
        {users.map((user) => (
          <UserCard key={user._id} email={user.email} role={user.role} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
