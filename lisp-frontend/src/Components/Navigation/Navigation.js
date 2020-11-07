import React, { Component } from 'react'

import Navbar from 'react-bootstrap/Navbar'
import './Navigation.css';
import Geo from '../Geo/Geo'

function Navigation(){
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand id="brand" style={{fontWeight:700, fontSize:"5vh", padding:0}}>L<span className="small-text">atrine</span>I<span className="small-text">nspection</span>S<span className="small-text">anitary</span>P<span className="small-text">rotection</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <div className="ml-auto">
                <Geo/>
            </div>
            </Navbar.Collapse>
      </Navbar>
    );
}

export default Navigation;