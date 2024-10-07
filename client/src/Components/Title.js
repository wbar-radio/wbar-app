import React from 'react';
import { Link } from 'react-router-dom';
import './title.css';

const Title = ({ toggleChat }) => {
  return (
    <div className='purple'>
      <div className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">WBAR</Link>
          <Link to="/About" className="nav-link">About</Link>
          <Link to="/Events" className="nav-link">Events</Link>
          {/* <Link to="/DjSched" className="nav-link">DJ Schedule</Link> */}
          
        
        </div>
      </div>
    </div>
  );
}

export default Title;
