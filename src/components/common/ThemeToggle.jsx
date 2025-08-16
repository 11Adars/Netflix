import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import '../../assets/styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="theme-toggle">
      <button 
        onClick={toggleTheme}
        className="theme-toggle-button"
        label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        
        <span className="toggle-icon">
          {darkMode ? 'Light' : 'Dark'}
        </span>
        
      </button>
    </div>
  );
};

export default ThemeToggle;