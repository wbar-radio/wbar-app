
import React from 'react';
import './App.css';
import Title from './Components/Title';
import StickyStream from './Components/StickyStream';
import Chat from './Components/Chat';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Events from './Components/Events';
import DjSched from './Components/DjSched';







function App() {
  return (
    <div className="App">
 
<Router>
<Title></Title>
<StickyStream/>

        <Routes>
          <Route path="/About" element={<About />} exact />
          <Route path="/Events" element={<Events />} exact />
          <Route path="/DjSched" element={<DjSched/>} exact />

          <Route path="/" element={<Home />} exact />
        </Routes>
      </Router>
      <div>

      </div>
    </div>
    
    
  );
}

export default App;