import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import '../../assets/styles/HeroBanner.css';

const HeroBanner = ({ movie }) => {
  const { darkMode } = useContext(ThemeContext);
  
  if (!movie) return null;

  
  const rating = movie.rating !== undefined && movie.rating !== null 
    ? movie.rating.toFixed(1) 
    : 'N/A';
  
 
  const releaseYear = movie.releaseDate 
    ? new Date(movie.releaseDate).getFullYear() 
    : '';
  

  const genres = Array.isArray(movie.genre) ? movie.genre.join(' • ') : '';

  return (
    <div 
      className={`hero-banner ${darkMode ? 'dark' : 'light'}`}
      style={{ 
        backgroundImage: `url(${movie.backdropUrl})` 
      }}
    >
    
      <div className="container banner-content">
        <div className="banner-info-container">
          <h1 className="banner-title">{movie.title || 'Unknown Title'}</h1>
          <div className="banner-info">
            <span className="banner-rating">{rating}/10</span>
            {releaseYear && <span className="banner-year">{releaseYear}</span>}
          </div>
          
          <p className="banner-description">
            {movie.description && movie.description.length > 200 
              ? `${movie.description.substring(0, 200)}...` 
              : (movie.description || 'No description available.')}
          </p>
          
          {genres && <p className="banner-genres">{genres}</p>}
          
          <div className="banner-buttons">
            <Link to={`/movie/${movie.id}`} className="btn btn-light btn-play">
              <i className="bi bi-play-fill"></i> Play
            </Link>
            <Link to={`/movie/${movie.id}`} className="btn btn-secondary btn-more-info">
              <i className="bi bi-info-circle"></i> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;