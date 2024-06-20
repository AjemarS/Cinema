import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import Loading from "../../components/Loading";
import MovieCard from "../../components/Dashboard/cards/MovieCard";
import { useMovies } from "../../hooks/useMovies";

const MoviesPage: React.FC = () => {
  const { movies, loadingMovies, errorMovies } = useMovies();

  if (loadingMovies) {
    return <Loading />;
  }

  if (errorMovies) {
    return <div>{errorMovies}</div>;
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="admin-cards">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
