import {useState } from 'react';
import {callSignup} from '../../../functions/user/LoginFunctions';

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
      <form aria-label='signup' name="signupForm" onSubmit={e=>submitSignup(e)}>
        Create Account
        <input type="text" aria-label='username'  id='username' onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
        <input type="text"  aria-label='email' id='email' onChange={e=> setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" id='password' aria-label='password' onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
        <input type="password" id='password-confirm' aria-label='password-confirm' onChange={e=> setRepeatPassword(e.target.value)} placeholder='Confirm Password'/>
        <input type="submit" aria-label='signup-submit' value="Login"/>

        {pendingSignup && <div aria-label='loading'>Creating account...</div>}
        {successSignup && <div aria-label='success'>Account created, check your email for the verification link</div>}
        {signupError && <div aria-label='fail'>{responseError} </div>}
      </form>
    );
}