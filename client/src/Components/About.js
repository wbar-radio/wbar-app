import React, { } from 'react';
import './about.css';
const image = require('./about.png');

function About() {


  return (
    <div className="About" style={{
      position: 'relative',
    }}>
      <img
        src={image}
        alt="Background"
        style={{
          width: '90%',
      
        }}
      />
      {/* Your content here */}
    </div>
  );
}

export default About;
