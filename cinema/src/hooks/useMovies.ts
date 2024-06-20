import { useState, useEffect } from "react";
import movieService from "../services/movieService";
import { IMovie } from "../types";

export const useMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(true);
  const [errorMovies, setErrorMovies] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getMovieList();
        setMovies(data.movies);
      } catch (error) {
        setErrorMovies("Failed to fetch movies");
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loadingMovies, errorMovies };
};
