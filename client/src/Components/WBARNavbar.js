import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './WBARNavbar.css';
import Stream from './Stream';
import { Link } from 'react-router-dom';

import wbarImage from './wbar-title-v2.png';

const WBARNavbar = () => {
    return (
        <Navbar sticky={"top"}  variant='dark'>
            <Container id={'navbar-container'}>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src={wbarImage}
                        alt="WBAR"
                        style={{height: '40px'}} // Adjusted width and display
                    />
                </Navbar.Brand>
                <Stream/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="custom-navbar">
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/events">Events</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default WBARNavbar;
