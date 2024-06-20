import React, { useEffect, useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";
import Select from "../Cinema/Movies/Select";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import movieService from "../../services/movieService";

interface CreateRoomFormProps {
  isPopup: boolean;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ isPopup }) => {
  const [roomId, setRoomId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const [movieId, setMovieId] = useState("");

  const generateRoomId = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  // Генеруємо id кімнати кожен раз, коли відкривається попап
  useEffect(() => {
    if (isPopup) {
      setRoomId(generateRoomId(6));
    }
  }, [isPopup]);

  // Кожен раз при натисканні на кнопку копіюємо і ставимо таймер на 5 секунд і змінюємо кнопку
  const handleCopyClick = () => {
    navigator.clipboard.writeText(roomId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
  };

  const { movies, loadingMovies, errorMovies } = useMovieList();

  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await movieService.createRoom(roomId, movieId);

      setRoomId(response.roomId);
    } catch (error) {
      console.log(error);
    }

    navigate(`/rooms/${roomId}`);
  };

  if (errorMovies) {
    return <div>{errorMovies}</div>;
  }

  return (
    <div className="create-room__content">
      <div className="create-room__form">
        <div>
          <h2>Room Id</h2>
          <div className="create-room__form__room-id">
            {"#" + roomId}
            {isCopied ? (
              <FontAwesomeIcon
                className="create-room__form__btn--copy"
                icon={faCheck}
                style={{ color: "#0000ff" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCopy}
                className="create-room__form__btn--copy"
                onClick={handleCopyClick}
              />
            )}
          </div>
        </div>
        {loadingMovies ? (
          <Loading />
        ) : (
          <div>
            <h2>Movie</h2>
            <Select selectOption={setMovieId} options={movies} />
          </div>
        )}
      </div>
      <button className="create-room__btn--create" onClick={createRoom}>
        Create
      </button>
    </div>
  );
};
export default CreateRoomForm;
