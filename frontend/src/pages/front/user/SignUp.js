import {useState } from 'react';
import {callSignup} from '../../../functions/user/LoginFunctions';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

export default function SignUp(){
    
  const [pendingSignup,setPendingSignup] = useState(false);
  const [successSignup,setSuccessSignup] = useState(false);
  const [signupError,setErrorSignup] = useState(false);
  const [responseError,setResponseError] = useState("");

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [repeatPassword,setRepeatPassword] = useState("");
  const [email,setEmail] = useState("");

  const submitSignup = (e) => {
    // check if repeat passwords match 
    if(password === repeatPassword)
    {
      setSuccessSignup(false);
      setPendingSignup(true);
      setErrorSignup(false);
  
      callSignup(username,email,password,error=>{
        setPendingSignup(false);
        if (!error) {
          setSuccessSignup(true);
        } else {
          setResponseError(error.message);
          setErrorSignup(true);
        }
      });
    }
    else
    {
      setResponseError("Confirmation password does not match");
      setErrorSignup(true);
    }    
    e.preventDefault();

  }

  return(
      <Form  aria-label='signup' name="signupForm" onSubmit={e=>submitSignup(e)}>
        <Container>
          <Row>
            <Col>
              <h1>Create Account</h1>
            </Col>
          </Row>

          <Row className="mx-auto">
            <Col>
              <input type="text" aria-label='username'  id='username' onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
            </Col>
          </Row>

          <Row>
            <Col>
              <input type="text"  aria-label='email' id='email' onChange={e=> setEmail(e.target.value)} placeholder='Email'/>
            </Col>
          </Row>

          <Row>
            <Col>
              <input type="password" id='password' aria-label='password' onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
            </Col>
          </Row>

          <Row>
            <Col>
              <input type="password" id='password-confirm' aria-label='password-confirm' onChange={e=> setRepeatPassword(e.target.value)} placeholder='Confirm Password'/>
            </Col>
          </Row>

          <Row>
            <Col>
              <input type="submit" aria-label='signup-submit' value="Login"/>
            </Col>
          </Row>
          
        {pendingSignup && <Card bg='info'><div aria-label='loading'>Creating account...</div></Card>}
        {successSignup && <Card bg='success'><div aria-label='success'>Account created, check your email for the verification link</div></Card>}
        {signupError && <Card bg='danger'><div aria-label='fail'>{responseError} </div></Card>}
        </Container>
      </Form>
    );
}