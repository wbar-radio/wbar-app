
import React from 'react';
import './App.css';
import Title from './Components/Title';
import StickyStream from './Components/StickyStream';
import Chat from './Components/Chat';


const image = require("./images/logo.png")




function App() {
  return (
    <div className="App">
      <Title />
      <StickyStream/>
      <img src={(image)} className="App-logo" alt="logo" />

      <Chat></Chat>

     
    </div>
    
  );
}

export default App;