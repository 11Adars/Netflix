import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import '../../assets/styles/MovieCard.css'; 

const MovieCard = ({ movie }) => {

  const { isMovieFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = isMovieFavorite(movie.id);

  
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '';
  const descriptionPreview = movie.description 
    ? `${movie.description.substring(0, 80)}...`
    : 'No description available.';


  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

 
  return (
    
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        
        <div className="movie-card-img">
          <img 
            src={movie.posterUrl} 
            alt={`${movie.title} poster`}
            className="movie-poster"
            loading="lazy"
          />
       
        </div>
        
       
        <div className="movie-card-overlay">
          <h3 className="movie-title">{movie.title}</h3>
          
          <div className="movie-meta">
            {releaseYear && <span className="movie-year">{releaseYear}</span>}
          </div>
          
          <p className="movie-description-preview">{descriptionPreview}</p>
          
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          >
      
            <span className="favorite-icon">{isFavorite ? <i class="bi bi-check"></i> : '+'}</span>
            {isFavorite ? 'In My List' : 'Add to My List'}
          </button>
        </div>

      </Link>
    </div>
  );
};

export default MovieCard;