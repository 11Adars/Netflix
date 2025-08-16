import React, { useMemo, useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import MovieRow from '../components/home/MovieRow';
import Spinner from '../components/common/Spinner';
import PageTransition from '../components/common/PageTransition';
import useMovieData from '../hooks/useMovieData';
import '../assets/styles/HomePage.css';

const HomePage = () => {
  const { movies, loading, error } = useMovieData();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  

  useEffect(() => {
    document.title = "Netflix Clone - Home";
    return () => {
      document.title = "Netflix Clone";
    };
  }, []);
  
  
  useEffect(() => {
    if (movies && Array.isArray(movies) && movies.length > 0) {
      
      const topMovies = [...movies]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
      
      const randomIndex = Math.floor(Math.random() * topMovies.length);
      setFeaturedMovie(topMovies[randomIndex]);
    }
  }, [movies]);
  
  
  const genres = useMemo(() => {
    if (!movies || !Array.isArray(movies) || movies.length === 0) return [];
    
    const allGenres = movies.reduce((genres, movie) => {
      if (movie.genre && Array.isArray(movie.genre)) {
        return [...genres, ...movie.genre];
      }
      return genres;
    }, []);
    
    return [...new Set(allGenres)].sort();
  }, [movies]);
  
  
  const moviesByGenre = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return {};
    
    return genres.reduce((acc, genre) => {
      const genreMovies = movies.filter(movie => 
        movie.genre && Array.isArray(movie.genre) && movie.genre.includes(genre)
      );
      
      if (genreMovies.length > 0) {
        acc[genre] = genreMovies;
      }
      
      return acc;
    }, {});
  }, [movies, genres]);
  
 
  const topRatedMovies = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12);
  }, [movies]);
  
  
  const newReleases = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    return [...movies]
      .filter(movie => movie.releaseDate)
      .sort((a, b) => {
        const dateA = new Date(a.releaseDate || 0);
        const dateB = new Date(b.releaseDate || 0);
        return dateB - dateA;
      })
      .slice(0, 12);
  }, [movies]);

  
  if (loading) {
    return <Spinner />;
  }

  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Movies</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Please try refreshing the page </p>
        </div>
      </div>
    );
  }


  if (!movies || movies.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>No movies available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="home-page">
        {featuredMovie && <HeroBanner movie={featuredMovie} />}
        
        <div className="movie-rows-container">
          <MovieRow title="New Releases" movies={newReleases} />
          <MovieRow title="Top Rated" movies={topRatedMovies} />
          
          {Object.entries(moviesByGenre).map(([genre, genreMovies]) => (
            <MovieRow key={genre} title={genre} movies={genreMovies} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;