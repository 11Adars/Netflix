import React, { useRef, useState, useEffect } from 'react';
import MovieCard from '../movie/MovieCard';
import '../../assets/styles/MovieRow.css';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
         
        }
      },
    
    );

    const currentRef = rowRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={`movie-row ${isVisible ? 'visible' : ''}`}>
      <h2 className="row-title">{title}</h2>
      
    
      <div className="movies-slider" ref={rowRef}>
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="movie-slider-item"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              // opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;