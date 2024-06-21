import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loading from "../../components/Loading";
import MovieCard from "../../components/Dashboard/cards/MovieCard";
import { useMovies } from "../../hooks/useMovies";
import { useLocation } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MoviesPage: React.FC = () => {
  const query = useQuery().get("movie");

  const { movies, loadingMovies, errorMovies } = useMovies();
  const { movie, loadingMovie, errorMovie } = useMovie(query || "");

  if (loadingMovies || loadingMovie) {
    return <Loading />;
  }

  if (errorMovies || errorMovie) {
    console.log(errorMovies || errorMovie);
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        {query ? (
          movie && (
            <div className="admin-cards">
              <MovieCard movie={movie} />
            </div>
          )
        ) : (
          <div className="admin-cards">
            {movies && movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
