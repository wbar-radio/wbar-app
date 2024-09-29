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
  const [isChatVisible, setIsChatVisible] = useState(true); // Set initial state to true for automatic visibility

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev); // Toggle chat visibility
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
      <div></div>
    </div>
  );
}

export default App;
