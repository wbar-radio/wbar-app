
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
import DJSched from './Components/DjSched';
import Home from './Components/Home';






function App() {
  return (
    <div className="App">
      {/* <Title />
      <StickyStream/>
      <img src={(image)} className="App-logo" alt="logo" />

      <Chat></Chat> */}
<Router>
<Title></Title>
<StickyStream/>

        <Routes>
          <Route path="/test" element={<DJSched />} exact />
          <Route path="/" element={<Home />} exact />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;