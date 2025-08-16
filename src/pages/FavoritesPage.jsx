import React, { useContext, useEffect } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from '../components/favorites/FavoritesList';
import '../assets/styles/FavoritesPage.css';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

 
  useEffect(() => {
    document.title = "My List - Netflix Clone";
    return () => {
      document.title = "Netflix Clone";
    };
  }, []);

  return (
    <div className="favorites-page">
      <div className="favorites-hero">
        <div className="container">
          <h1 className="favorites-title">My List</h1>
        </div>
      </div>
      
      <div className="container favorites-container">
        <FavoritesList />
      </div>
    </div>
  );
};

export default FavoritesPage;