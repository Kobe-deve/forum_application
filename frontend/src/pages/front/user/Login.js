import { useEffect,useState } from 'react';
import {callLogin} from '../../../functions/user/LoginFunctions';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [pendingLogin,setPendingLogin] = useState(false);
  const [successLogin,setSuccessLogin] = useState(false);
  const [loginError,setErrorLogin] = useState(false);
  const [responseError,setResponseError] = useState("");

  useEffect(()=>{
    if(successLogin)
      navigate("/home");
  })

  const submitLogin = (e) => {
    setSuccessLogin(false);
    setPendingLogin(true);
    setErrorLogin(false);

    callLogin(username,password,error => {
      setPendingLogin(false);
      if (!error) {
        setSuccessLogin(true);
      } else {
        setResponseError(error.message);
        setErrorLogin(true);
      }
    });
    
    e.preventDefault();

  }

  return(
      <Col>
              <Form className="text-center" aria-label='login' name="loginForm" onSubmit={e => submitLogin(e)}>
                <Container>
                  <Row>
                    <Col>
                      <h1>Login</h1>
                    </Col>
                  </Row>
                  
                  <Row className="mx-auto">
                    <Col>
                      <input type="text" aria-label='username' onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
                    </Col>
                  </Row>
                  
                  <Row >
                    <Col>
                       <input type="password" aria-label='password' onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Button type="submit" aria-label='login-submit'>Login </Button>
                    </Col>
                  </Row>

                  {pendingLogin && <Card bg='info'><div aria-label='loading'>Logging in...<Spinner aria-label = "logging-in-spinner" animation="border" variant="light" /></div></Card>}
                  {successLogin && <Card bg='success'><div aria-label='success'>Logged in</div></Card>}
                  {loginError && <Card bg='danger'><div aria-label='fail'>Could not log in: {responseError} </div></Card>}
                </Container>
              </Form>
          </Col>
    );
}