import React from 'react';
import { Link } from 'react-router-dom';
import './title.css';

// Import the image
import wbarImage from './wbar-title-v2.png';

const Title = ({ toggleChat }) => {
  return (
    <div className='purple'>
      <div className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Replace the text with the image */}
          <Link to="/" className="navbar-brand">
            <img 
              src={wbarImage} 
              alt="WBAR" 
              style={{ height: '40px', display: 'inline-block' }} // Adjusted width and display
            />
          </Link>
          <Link to="/About" className="nav-link">About</Link>
          <Link to="/Events" className="nav-link">Events</Link>
          {/* <Link to="/DjSched" className="nav-link">DJ Schedule</Link> */}
        </div>
      </div>
    </div>
  );
}

export default Title;