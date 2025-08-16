import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ThemeContext } from '../../context/ThemeContext';
import '../../assets/styles/MovieDetails.css';

const MovieDetails = ({ movie }) => {
  const { isMovieFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const { darkMode } = useContext(ThemeContext);
  
  if (!movie) return null;
  
  const isFavorite = isMovieFavorite(movie.id);
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown release date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const rating = movie.rating !== undefined && movie.rating !== null 
    ? `${movie.rating.toFixed(1)}/10` 
    : 'Not rated';

  return (
    <div className={`movie-details ${darkMode ? 'dark' : 'light'}`}>
      <div 
        className="movie-backdrop"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="container">
          <div className="row">
            
            <div className="col-12">
              <div className="movie-info-section">
                <h1 className="movie-detail-title">{movie.title}</h1>
                
                <div className="movie-meta">
                  {movie.releaseDate && (
                    <span className="movie-year">{new Date(movie.releaseDate).getFullYear()}</span>
                  )}
                  <span className="movie-rating">⭐ {rating}</span>
                </div>
                
                <div className="movie-release-date">
                  <strong>Release Date:</strong> {formatDate(movie.releaseDate)}
                </div>
                
                <div className="movie-genres">
                  {Array.isArray(movie.genre) && movie.genre.map((genre, index) => (
                    <span key={index} className="genre-tag">{genre}</span>
                  ))}
                </div>
                
                <p className="movie-description">
                  {movie.description || 'No description available.'}
                </p>
                
                <button 
                  onClick={handleFavoriteClick}
                  className={`favorite-button-large ${isFavorite ? 'favorited' : ''}`}
                >
                  <i className={`bi ${isFavorite ? 'bi-check-circle-fill' : 'bi-plus-circle'}`}></i>
                  {isFavorite ? 'Remove from My List' : 'Add to My List'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;