import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link de react-router-dom
import './Navbar.css';
import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';

const Navbar = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <div className={`navbar ${theme}`}>
      <img
        src={theme === 'light' ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navbar Links */}
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/">Home</Link> {/* Lien vers la page d'accueil */}
        </li>
        <li>
          <Link to="/plan-your-trip">Plan Your Trip</Link> {/* Lien vers Plan Your Trip */}
        </li>
        <li>Route Map</li>
        <li>Community</li>
        <li>Gallery</li>
        <li>Blog</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>

      {/* Search Box */}
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img
          src={theme === 'light' ? search_icon_light : search_icon_dark}
          alt="Search"
        />
      </div>

      {/* Toggle Theme */}
      <img
        onClick={toggle_mode}
        src={theme === 'light' ? toggle_light : toggle_dark}
        alt="Toggle mode"
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
