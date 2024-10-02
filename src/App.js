import React, { useState } from 'react';
import './App.css';
import Title from './Components/Title';
import StickyStream from './Components/StickyStream';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Events from './Components/Events';
import DjSched from './Components/DjSched';

function App() {
  const [isChatVisible, setIsChatVisible] = useState(true); // Manage chat visibility state

  const toggleChat = () => {
      setIsChatVisible((prevVisible) => !prevVisible); // Toggle chat visibility
  };

  return (
    <div className="App">
      <Router>
        <Title toggleChat={toggleChat} />
        <StickyStream />
        <Chat visible={isChatVisible} />
        <Routes>
          <Route path="/About" element={<About />} exact />
          <Route path="/Events" element={<Events />} exact />
          {/* <Route path="/DjSched" element={<DjSched />} exact /> */}
          <Route path="/" element={<DjSched />} exact />
        </Routes>
      </Router>
      <button 
    onClick={toggleChat} 
    style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '150px',               // Fixed width for consistency
        backgroundColor: '#ffffff',   // White background to match the design
        color: '#000000',             // Black text color
        padding: '10px 0',            // Adjust padding to maintain button height
        borderRadius: '25px',         // Rounded corners for smooth look
        fontWeight: 'bold',           // Bold font to match your site's style
        fontSize: '16px',             // Adjust font size for readability
        textAlign: 'center',          // Ensure text is centered
        cursor: 'pointer',            // Pointer cursor for interactivity
        zIndex: '2000',               // Ensure button is above other elements
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for depth
        transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth hover effect
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'} // Lighten background on hover
    onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}  // Reset background color on mouse out
>
    {isChatVisible ? 'Hide Chat' : 'Show Chat'}
</button>

            {/* Chat component */}
            <Chat visible={isChatVisible} />
      <div></div>
    </div>
  );
}

export default App;
