import React, { useState, useRef, useEffect } from 'react';
import '../../assets/styles/GenreFilter.css';

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGenreSelect = (genre) => {
    onSelectGenre(genre);
    setIsOpen(false);
  };


  const handleClearFilter = () => {
    onSelectGenre('');
    setIsOpen(false);
  };

  return (
    <div className="genre-filter" ref={dropdownRef}>
      <div className="dropdown">
        <button 
          type="button" 
          className="dropdown-toggle" 
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedGenre || 'Filter by Genre'} <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </button>
        
        {isOpen && (
          <div className="dropdown-menu show">
            <button 
              className={`dropdown-item ${selectedGenre === '' ? 'active' : ''}`} 
              onClick={handleClearFilter}
            >
              All Genres
            </button>
            
            <div className="dropdown-divider"></div>
            
            {genres.map((genre) => (
              <button
                key={genre}
                className={`dropdown-item ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreFilter;