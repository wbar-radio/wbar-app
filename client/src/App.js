import React from 'react';
import './App.css';
import WBARNavbar from './Components/WBARNavbar';
import Chat from './Components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './Components/About';
import Events from './Components/Events';
import DjSched from './Components/DjSched';
import SparkleCursor from './Components/SparkleCursor';
import { DndContext, useDroppable } from "@dnd-kit/core";

function App() {
    const { setNodeRef } = useDroppable({
        id: 'everything-but-navbar',
    });
    return (
        <DndContext>
            <div className="App">
                <Router>
                    <WBARNavbar />
                    <div ref={setNodeRef} >
                        <Routes>
                            <Route path="/about" element={<About />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/" element={<DjSched />} />
                        </Routes>
                    </div>
                </Router>
            </div>
            <Chat />
            <SparkleCursor />
        </DndContext>
    );
}

export default App;