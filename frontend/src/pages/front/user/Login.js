import { useState } from 'react';

export default function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const submitLogin = (e) => {
    console.log(username + " " + password);
    e.preventDefault();
  }

  return(
    <form aria-label='login' name="loginForm" onSubmit={e => submitLogin(e)}>
        Login
        <input type="text" onChange={e=> setUsername(e.target.value)} placeholder='Username'/>
        <input type="password" onChange={e=> setPassword(e.target.value)} placeholder='Password'/>
        <input type="submit" value="Login"/>
      </form>
    );
}