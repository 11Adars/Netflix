import React, { useState } from 'react';
import '../../assets/styles/SearchBar.css';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSearch(searchTerm);
  };


  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
       
        <span className="search-icon"><i class="bi bi-search"></i></span>
        
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleChange}
          label="Search for movies"
       
        />
      </div>
      
     
    </form>
  );
};

export default SearchBar;