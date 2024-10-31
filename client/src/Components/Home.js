
import React from 'react';
import WBARNavbar from './WBARNavbar';
import Stream from './Stream';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import DJSched from './DjSched';

import "./Home.css"
import Shows from './shows';
const image = require("./streaming.png")

const wbarbbq = require("./wbbq.png")



function Home() {
  return (
    <div className="Home">
      
      {/* <Stream/> */}
      {/* <img src={(image)} className="App-logo" alt="logo" /> */}


{/* <Chat></Chat> */}

     

    </div>
    
  );
}

export default Home;