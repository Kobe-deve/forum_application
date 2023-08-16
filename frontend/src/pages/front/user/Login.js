import React, { Component } from 'react';

class Login extends Component {

  render() {
    return(
    <form aria-label='login' name="loginForm">
        Login
        <input type="submit" value="Login"/>
      </form>
    )
  }
}

export default Login;