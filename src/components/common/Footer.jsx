import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <div className="container">
     
          <div className="row">   
            
         
              <h4 className="footer-heading">Connect </h4>
              <div className="social-links">
                <a href="https://github.com/11Adars" target="_blank" rel="noopener noreferrer" label="GitHub">
                  <i className="bi bi-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/adarsh-poojary-4794b324b" target="_blank" rel="noopener noreferrer" label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://x.com/Adarshpoojary_" target="_blank" rel="noopener noreferrer" label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
     
            </div>
          </div>
   
          
          <div className="footer-bottom">
            <p className="copyright">
              &copy; {currentYear} . All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </div>
          </div>
        </div>
    
    </footer>
  );
};

export default Footer;