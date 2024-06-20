import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import { IMovie } from "../types";

export const useMovie = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<IMovie>();
  const [loadingMovie, setLoadingMovie] = useState<boolean>(true);
  const [errorMovie, setErrorMovie] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovie(movieId!);
        setMovie(data.movie);
      } catch (error) {
        setErrorMovie("Failed to fetch movie");
      } finally {
        setLoadingMovie(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loadingMovie, errorMovie };
};
