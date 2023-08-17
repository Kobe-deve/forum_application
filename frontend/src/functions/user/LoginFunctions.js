import * as AuthenticationInfo from '../../information/Authentication'
import * as EndpointInfo from '../../information/Endpoints'
import { userData } from '../../information/UserData';

// calling login endpoint
export async function callLogin(username, password, callback)
{
    setTimeout(async ()=>{
        // successful login
        if(username.length >= AuthenticationInfo.USERNAME_LENGTH && password.length >= AuthenticationInfo.PASSWORD_LENGTH)
        {
            // send call to login api
            try
            {
                await fetch(EndpointInfo.urls["LOGIN"], {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({"password":password,"username": username})
                
              })
              .then(async (responseData) => { // if successfully logged in, establish user
                let postResponse = await responseData.json();

                if(postResponse[0] === "ERROR: Could not login") // check if the user is correct
                {
                    return callback(new Error('Invalid username or password'));
                }
                else
                {
                    userData["JWT"] = postResponse[0];
                    userData["Username"] = postResponse[1];

                    return callback(null);
                }
            });
            }
            catch (error) {
                console.log(error)
                return callback(new Error(error));
              }
        }
        else // login error
        {
            return callback(new Error('Invalid username or password'));
        }
    },1500);
}