import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMovie } from "../../../../hooks/useMovie";
import Loading from "../../../Loading";
import "./MovieCard.css";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../Popup";
import { useState } from "react";
import { getFullUrl } from "../../../../utils/getFullUrl";

interface MovieCardProps {
  movieId: string;
}

const MovieCard = ({ movieId }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { movie, loadingMovie, errorMovie } = useMovie(movieId);

  if (loadingMovie) return <Loading />;

  if (errorMovie) return <div>{errorMovie}</div>;

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, transparent 50%, rgba(0, 0, 0, 1) 100%), 
        url(${getFullUrl(movie!.image)})`,
      }}
    >
      <div className="movie-card__title" title="More info">
        {movie?.title}
        <FontAwesomeIcon
          className="movie__card__description__btn"
          onClick={() => setIsHovered(!isHovered)}
          icon={faCircleInfo}
          style={{ float: "right" }}
        />
      </div>
      {isHovered && (
        <Popup isPopup={isHovered} setIsPopup={setIsHovered}>
          <div className="movie-card__description__popup">
            <h3>{movie?.title}</h3>
            {movie?.description}
          </div>
        </Popup>
      )}
      <div className="movie-card__info">
        <span className="movie-card__info__year">{movie?.year}</span>
        <div className="movie-card__info__tags">
          {movie?.tags.map((tag) => (
            <span key={tag}>{tag}, </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
