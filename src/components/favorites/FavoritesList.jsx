import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ThemeContext } from '../../context/ThemeContext';
import MovieCard from '../movie/MovieCard';
import '../../assets/styles/FavoritesList.css';

const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const { darkMode } = useContext(ThemeContext);
  
  const handleRemoveFavorite = (id) => {
    removeFromFavorites(id);
  };
  
  if (favorites.length === 0) {
    return (
      <div className={`no-favorites ${darkMode ? 'dark' : 'light'}`}>
        <div className="empty-state">
          <i className="bi bi-heart-fill empty-icon"></i>
          <h3>No favorites yet!</h3>
          <p>Add movies to your favorites by clicking the "Add to My List" </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`favorites-list ${darkMode ? 'dark' : 'light'}`}>
     
      <div className="favorites-grid">
        {favorites.map(movie => (
          <div key={movie.id} className="favorite-item">
            <MovieCard 
              movie={movie} 
              isInGrid={true} 
            />
            <button 
              className="remove-favorite-btn"
              onClick={() => handleRemoveFavorite(movie.id)}
              aria-label="Remove from favorites"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;