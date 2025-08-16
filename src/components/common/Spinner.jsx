import React from 'react';
import '../../assets/styles/Spinner.css';

const Spinner = ({ fullScreen }) => {
  return (
    <div className={`spinner-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;