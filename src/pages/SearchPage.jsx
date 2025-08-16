import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import GenreFilter from '../components/search/GenreFilter';
import MovieGrid from '../components/home/MovieGrid';
import Spinner from '../components/common/Spinner';
import useMovieData from '../hooks/useMovieData';
import '../assets/styles/SearchPage.css';

const SearchPage = () => {
  const { movies, loading, error } = useMovieData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');


  useEffect(() => {
    document.title = "Search Movies - Netflix Clone";
    return () => {
      document.title = "Netflix Clone";
    };
  }, []);

  
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

  const filteredMovies = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];
    
    return movies.filter(movie => {
      const matchesSearch = searchTerm === '' || 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.description && movie.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesGenre = selectedGenre === '' || 
        (movie.genre && Array.isArray(movie.genre) && movie.genre.includes(selectedGenre));
      
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

 
  const handleSearch = (term) => {
    setSearchTerm(term);
    updateSearchParams(term, selectedGenre);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    updateSearchParams(searchTerm, genre);
  };

  const updateSearchParams = (search, genre) => {
    const params = {};
    if (search) params.q = search;
    if (genre) params.genre = genre;
    setSearchParams(params);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="container mt-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="search-page">
      
      <div className="search-hero">
        <div className="container">
          <h1 className="search-title">Find Your Next Favorite Movie</h1>
          <div className="search-container">
            <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-4">
          <div className="col-12 col-md-3 mb-4">
            <div className="filter-sidebar">
              <h3>Filter Results</h3>
              <GenreFilter 
                genres={genres} 
                selectedGenre={selectedGenre} 
                onSelectGenre={handleGenreSelect} 
              />
              
              <div className="results-count mt-4">
    
                {(searchTerm || selectedGenre) && (
                  <button 
                    className="clear-all-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedGenre('');
                      setSearchParams({});
                    }}
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="search-results">
              <h2 className="results-title">
                {searchTerm ? 
                  `Results for "${searchTerm}"` : 
                  (selectedGenre ? `${selectedGenre} Movies` : 'All Movies')}
              </h2>
              <MovieGrid movies={filteredMovies} isInGrid={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;