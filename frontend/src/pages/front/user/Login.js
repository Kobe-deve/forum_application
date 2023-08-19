import { useEffect,useState } from 'react';
import {callLogin} from '../../../functions/user/LoginFunctions';
import { useNavigate } from "react-router-dom";

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
    <form aria-label='login' name="loginForm" onSubmit={e => submitLogin(e)}>
        Login
        <input type="text" aria-label='username' onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
        <input type="password" aria-label='password' onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
        <input type="submit" aria-label='login-submit' value="Login"/>

        {pendingLogin && <div aria-label='loading'>Logging in...</div>}
        {successLogin && <div aria-label='success'>Logged in</div>}
        {loginError && <div aria-label='fail'>Could not log in: {responseError} </div>}
      </form>
    );
}