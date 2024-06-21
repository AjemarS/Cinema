import React from "react";
import Navbar from "../../components/Navbar";
import UserCard from "../../components/Dashboard/cards/UserCard";
import { useUsers } from "../../hooks/useUsers";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UsersPage: React.FC = () => {
  const query = useQuery().get("user");

  const { users, loadingUsers, errorUsers } = useUsers();
  const { user, loadingUser, errorUser } = useUser(query || "");

  if (loadingUsers || loadingUser) {
    return <Loading />;
  }

  if (errorUsers || errorUser) {
    console.log(errorUsers || errorUser);
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        {query ? (
          user && (
            <div className="admin-cards">
              <UserCard user={user} />
            </div>
          )
        ) : (
          <div className="admin-cards">
            {users && users.map((user) => <UserCard key={user._id} user={user} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
