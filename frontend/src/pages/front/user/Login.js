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
        console.log(error);
        setResponseError(error.message);
        setErrorLogin(true);
      }
    });
    
    e.preventDefault();

  }

  return(
    <form aria-label='login' name="loginForm" onSubmit={e => submitLogin(e)}>
        Login
        <input type="text" onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
        <input type="password" onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
        <input type="submit" value="Login"/>

        {pendingLogin && <div>Logging in...</div>}
        {successLogin && <div>Logged in</div>}
        {loginError && <div>Could not log in: {responseError} </div>}
      </form>
    );
}