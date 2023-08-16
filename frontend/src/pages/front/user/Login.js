export function Login() {

  return(
    <form aria-label='login' name="loginForm">
        Login
        <input type="text" placeholder='Username'/>
        <input type="password" placeholder='Password'/>
        <input type="submit" value="Login"/>
      </form>
    );
}