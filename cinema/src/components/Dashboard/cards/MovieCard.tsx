import "./index.css";

interface MovieCard {
  email: string;
  role: string;
}

const MovieCard = ({ email, role }: MovieCard) => {
  return (
    <div className="admin-card">
      <div>Email: {email}</div>
      <div>Role: {role}</div>
    </div>
  );
};

export default MovieCard;
