import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../assets/logo.png";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function Header(): ReactElement {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Cocktail Wiki Logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/ingredient">Ingredient</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="nav-links">
        <Link to="/search">
          <FontAwesomeIcon icon={faSearch} /> Search
        </Link>
      </div>
    </header>
  );
}