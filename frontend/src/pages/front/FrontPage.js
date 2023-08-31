import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../img/logo.png';
import Login from './user/Login';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card'
import SignUp from './user/SignUp';

export default function FrontPage(){    
    const [action,setAction] = useState("");
    
    return(
      <div className="d-flex align-items-center justify-content-center text-center min-vh-100" aria-label='front-page'>
        <Container fluid>
          <Row className="me-auto">
              <Col>
              <img
                  src={logo}
                  width="100%"
                  height="100%"
                  className="d-inline-block align-top"
                  alt="ZanRooms Logo"
              />
              
            </Col>
            <Col className="d-flex align-items-center">
              <h1>ZanRooms</h1>
            </Col>
            
            {action === "" && (<>
              <Col className="d-flex align-items-center">
                <Col><Button aria-label = "loginButton" onClick={() => setAction("login")}>Login</Button></Col>
                <Col><Button aria-label = "signupButton"onClick={() => setAction("signup")}>Signup</Button></Col>  
              </Col>
            </>)}
            {action === "login" && (
                      
                      <Col>
                        <Card>
                            <CloseButton aria-label = "closeLogin" style={{disply:'flex', justifyContent:'left'}} onClick={() => setAction("")} />
                          <Login/>
                        </Card>
                      </Col>
                    )}
            {action === "signup" && (
                      
                      <Col>
                        <Card>
                            <CloseButton aria-label = "closeSignup" style={{disply:'flex', justifyContent:'left'}} onClick={() => setAction("")} />
                          <SignUp/>
                        </Card>
                      </Col>
                    )}
          </Row>
        </Container>
      </div>);
}