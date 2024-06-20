import { IMovie } from "../../../types";
import "./index.css";

interface MovieCard {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCard) => {
  return (
    <div className="admin-card">
      <div>Movie: {movie._id}</div>
      <div>Title: {movie.title}</div>
      <div>Url: {movie.url}</div>
      <div>Image: {movie.image}</div>
      <div>Year: {movie.year}</div>
      <div>
        Tags:{" "}
        {movie.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </div>
      <div>Description: {movie.description}</div>
    </div>
  );
};

export default MovieCard;
