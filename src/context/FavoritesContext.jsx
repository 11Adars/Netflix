import React, { createContext, useState, useEffect } from 'react';


export const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  
  const isMovieFavorite = (id) => {
    return favorites.some(movie => movie.id === id);
  };


  const addToFavorites = (movie) => {
    if (!isMovieFavorite(movie.id)) {
      setFavorites(prevFavorites => [...prevFavorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.id !== id)
    );
  };

 
  const clearFavorites = () => {
    setFavorites([]);
  };


  const favoritesContextValue = {
    favorites,
    isMovieFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites
  };

  return (
    <FavoritesContext.Provider value={favoritesContextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};