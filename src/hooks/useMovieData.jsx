import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovieData = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null); 
        
        const response = await axios.get('/data/movies.json');
        
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
          throw new Error('No movie data found or invalid format');
        }
        
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError(`Failed to load movies: ${err.message}`);
        setMovies([]); 
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useMovieData;