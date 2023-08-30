import { getCookie } from "../../information/UserData";

import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';

export default function Header() {
    return(<div>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="60"
                        height="30"
                        className="d-inline-block align-top"
                        alt="ZanRooms Logo"
                    />
                    ZanRooms
                </Navbar.Brand>
                <Nav className="me-auto">
                    {!getCookie("t") && (<>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">SignUp</Nav.Link></>)}

                    {getCookie("t") && (<>
                    <Nav.Link href="/logout">Logout</Nav.Link></>)}
                </Nav>
        </Navbar>
    </div>);
}