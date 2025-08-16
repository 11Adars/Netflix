import React, { useEffect, useState } from 'react';
import '../../assets/styles/PageTransition.css';

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`page-transition ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;