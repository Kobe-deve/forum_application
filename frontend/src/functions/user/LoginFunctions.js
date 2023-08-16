import * as AuthenticationInfo from '../../information/Authentication'
import * as EndpointInfo from '../../information/Endpoints'

// calling login endpoint
export function callLogin(username, password, callback)
{
    setTimeout(async ()=>{
        // successful login
        if(username.length >= AuthenticationInfo.USERNAME_LENGTH && password.length >= AuthenticationInfo.PASSWORD_LENGTH)
        {
            const loginResponse = await fetch(EndpointInfo.urls["LOGIN"], {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"password":password,"username": username})
              });
              
            return callback(null);
        }
        else // login error
        {
            return callback(new Error('Invalid username or password'))
        }
    },1000);
}