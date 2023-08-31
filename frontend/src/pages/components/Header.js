import { getCookie } from "../../information/UserData";

import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';
import { clearData } from "../../information/UserData";

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
                    {!getCookie("user") && (<></>)}

                    {getCookie("user") && (<>
                    <Nav.Link href="/" onClick={()=>{clearData()}}>Logout</Nav.Link></>)}
                </Nav>
        </Navbar>
    </div>);
}