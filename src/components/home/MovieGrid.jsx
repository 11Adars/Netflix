import React from 'react';
import MovieCard from '../movie/MovieCard';
import '../../assets/styles/MovieGrid.css';

const MovieGrid = ({ movies, isInGrid = false }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="no-results">
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <div key={movie.id} className="movie-grid-item">
          <MovieCard movie={movie} isInGrid={isInGrid} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;