import { getCookie } from "../../information/UserData";

import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';
import { clearData } from "../../information/UserData";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return(<div aria-label="header">
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            
                <Navbar.Brand aria-label = "logo" onClick={()=>{navigate("/")}}>
                    <img src={logo} width="60" height="30" className="d-inline-block align-top" alt="ZanRooms Logo"/>
                    ZanRooms
                </Navbar.Brand>
                <Nav className="me-auto">
                    {!getCookie("user") && (<></>)}

                    {getCookie("user") && (<>
                    <Nav.Link bg="light" onClick={()=>{clearData(); navigate("/");}} aria-label="logout-button">Logout</Nav.Link></>)}
                </Nav>
        </Navbar>
    </div>);
}