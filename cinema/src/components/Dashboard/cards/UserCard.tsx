import { IUser } from "../../../types";
import "./index.css";

interface UserCard {
  user: IUser;
}

const UserCard = ({ user }: UserCard) => {
  return (
    <div className="admin-card">
      <div>User: {user._id}</div>
      <div>Email: {user.email}</div>
      <div>Username: {user.username}</div>
    </div>
  );
};

export default UserCard;
