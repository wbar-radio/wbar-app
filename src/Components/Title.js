// Title.js

import React from 'react';
import { Link } from 'react-router-dom';
import './title.css';

const Title = () => {
  return (
    <div className="Title">

      <div className="navbar">
      <h1><Link to="/" className="nav-link">WBAR</Link>
    </h1>
    <Link to="/About" className="nav-link">About</Link>

        <Link to="/Events" className="nav-link">Events</Link>
        <Link to="/DjSched" className="nav-link">Dj Schedule</Link>

      </div>
    </div>
  );
}

export default Title;
