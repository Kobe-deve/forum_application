export function SignUp(){
    
  return(
      <form aria-label='signup' name="signupForm">
        Create Account
        <input type="text" id='username' placeholder='Username'/>
        <input type="text" id='email' placeholder='Email'/>
        <input type="password" id='password' placeholder='Password'/>
        <input type="password" id='password-confirm' placeholder='Confirm Password'/>
        <input type="submit" value="Login"/>
      </form>
    );
}