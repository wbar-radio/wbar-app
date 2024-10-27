import React, { useState } from 'react';
import './App.css';
import Title from './Components/Title';
import StickyStream from './Components/StickyStream';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import 'bootstrap-icons/font/bootstrap-icons.css';
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

import {closestCorners, DndContext, useDroppable} from "@dnd-kit/core";


function App() {
    const {setNodeRef} = useDroppable({
        id: 'everything-but-navbar',
    });
    return (
        <DndContext>
            <div className="App">
                <Router>
                    <Title/>
                    <StickyStream/>
                    <div ref={setNodeRef}>
                        <Routes>
                            <Route path="/About" element={<About/>} exact/>
                            <Route path="/Events" element={<Events/>} exact/>
                            {/* <Route path="/DjSched" element={<DjSched />} exact /> */}
                            <Route path="/" element={<DjSched/>} exact/>
                        </Routes>
                    </div>
                </Router>

                {/* <iframe src="//widgets.spinitron.com/widget/now-playing-v2?station=WBAR&num=5&sharing=1&cover=1&player=1&merch=1" allow="encrypted-media"></iframe> */}

                {/* Chat component */}
                {/* <SpinitronData></SpinitronData> */}

            </div>
            <Chat/>
        </DndContext>

    )
        ;
}

export default App;