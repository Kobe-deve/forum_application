import { useLocation, Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect } from 'react';
import FrontPage from "../pages/front/FrontPage.js"
import Home from '../pages/loggedin/Home.js'
import NoPage from "../pages/NoPage.js"
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import MessageRoom from "./loggedin/messaging/MessageRoom.js";
import RoomList from "./loggedin/selection/RoomList.js";

export default function Content(){
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    useLayoutEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
        setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [pathname]);
    
    return(loading ? 
            <div className="d-flex align-items-center justify-content-center text-center min-vh-100">
                <Container fluid>
                    <Row className="me-auto">
                        <Col>
                            <Spinner aria-label = "loading-spinner" animation="border" variant="info" />
                        </Col>
                    </Row>
                </Container>
            </div> 
            :
            <>
                <Routes>
                    <Route index element={<FrontPage />} />
                    <Route path="home" element={<Home />} />
                    <Route path="messages" element={<MessageRoom />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="rooms" element={<RoomList/>}/>
                </Routes>
            </>
    );
}