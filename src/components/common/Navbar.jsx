import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../../assets/styles/Navbar.css';

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);


  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarClasses = `navbar navbar-expand-lg ${darkMode ? 'navbar-dark' : 'navbar-light'} ${scrolled ? 'scrolled' : 'transparent'}`;

  return (
    <nav className={navbarClasses}>
      <div className="container-fluid navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="netflix-logo">NETFLIX</span>
          <span className="netflix-clone">Clone</span>
        </Link>

    
        <button 
          className="navbar-toggler" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen ? "true" : "false"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

     
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${isActive('/')}`}>
              <Link className="nav-link" to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className={`nav-item ${isActive('/search')}`}>
              <Link className="nav-link" to="/search" onClick={() => setMobileMenuOpen(false)}>
                Search
              </Link>
            </li>
            <li className={`nav-item ${isActive('/favorites')}`}>
              <Link className="nav-link" to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                My List
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;