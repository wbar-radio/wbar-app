import React from 'react';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './WBARNavbar.css';
import Stream from './Stream';

// Import the image
import wbarImage from './wbar-title-v2.png';

const WBARNavbar = () => {
    return (
        <Navbar expand="lg" variant='dark'>
            <Container id={'navbar-container'}>
                <Navbar.Brand href={"/"}>
                    <img
                        src={wbarImage}
                        alt="WBAR"
                        style={{height: '40px'}} // Adjusted width and display
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className={'ms-auto'}>
                        <Nav.Link href="/About" className="nav-link">About</Nav.Link>
                        <Nav.Link href="/Events" className="nav-link">Events</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default WBARNavbar;