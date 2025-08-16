import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../components/movie/MovieDetails';
import Spinner from '../components/common/Spinner';
import PageTransition from '../components/common/PageTransition';
import useMovieData from '../hooks/useMovieData';
import '../assets/styles/MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { movies, loading, error } = useMovieData();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (movies && Array.isArray(movies) && movies.length > 0) {
     
      const movieId = parseInt(id, 10);
      const foundMovie = movies.find(m => m.id === movieId);
      
      if (foundMovie) {
        setMovie(foundMovie);
      
        document.title = `${foundMovie.title} - Netflix Clone`;
      } else {
     
        navigate('/not-found', { replace: true });
      }
    }
    
    
    return () => {
      document.title = 'Netflix Clone';
    };
  }, [movies, id, navigate]);
  
  if (loading) {
    return <Spinner />;
  }
  
  if (error) {
    return (
      <div className="container mt-5 py-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return <Spinner />;
  }
  
  return (
    <PageTransition>
      <div className="movie-details-page">
        <MovieDetails movie={movie} />
      </div>
    </PageTransition>
  );
};

export default MovieDetailsPage;