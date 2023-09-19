import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import logo from '../../img/logo.png';
import Login from './user/Login';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card'
import SignUp from './user/SignUp';
import { getCookie } from '../../information/UserData';

export default function FrontPage(){ 
    const [action,setAction] = useState("");
    
    return(
      <>
      {
        !getCookie("user") &&
        <div className="d-flex align-items-center justify-content-center text-center min-vh-100" aria-label='front-page'>
          <Container fluid>
            <Col className="me-auto">
                <Col className="d-flex">
                <img
                    src={logo}
                    width="30%"
                    height="30%"
                    className="d-inline-block align-top"
                    alt="ZanRooms Logo"
                />
                <h1>ZanRooms</h1>
                </Col>
              
              {action === "" && (<>
                <Col className="d-flex gap-2 justify-content-center">
                  <Button aria-label = "loginButton" onClick={() => setAction("login")}>Login</Button>
                  <Button aria-label = "signupButton"onClick={() => setAction("signup")}>Signup</Button>
                </Col>
              </>)}
              {action === "login" && (
                        
                        <Col className="d-flex justify-content-center">
                          <Card>
                              <CloseButton aria-label = "closeLogin" style={{disply:'flex', justifyContent:'left'}} onClick={() => setAction("")} />
                            <Login/>
                          </Card>
                        </Col>
                      )}
              {action === "signup" && (
                        
                        <Col className="d-flex justify-content-center">
                          <Card>
                              <CloseButton aria-label = "closeSignup" style={{disply:'flex', justifyContent:'left'}} onClick={() => setAction("")} />
                            <SignUp/>
                          </Card>
                        </Col>
                      )}
            </Col>
          </Container>
        </div>
      }
      {
        getCookie("user") &&
        <div aria-label='front-page'>

        </div> 
      }
      </>
      );
}