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
                else if(postResponse[0] === "ERROR: The account is not verified") // check if the user is verified
                {
                    return callback(new Error('Account is not verified'));
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
                return callback(new Error(error));
              }
        }
        else // login error
        {
            return callback(new Error('Invalid username or password'));
        }
    },1500);
}

// calling signup endpoint
export async function callSignup(username, email, password, callback)
{
    setTimeout(async()=>{
        if(email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
           && username.length >= AuthenticationInfo.USERNAME_LENGTH && password.length >= AuthenticationInfo.PASSWORD_LENGTH)
        {
            try{
                await fetch(EndpointInfo.urls["SIGNUP"], {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({"email": email, "password":password,"username": username})
                    
                    })
                    .then(async (responseData) => { 
                        let postResponse = await responseData.json();
                        
                        if(postResponse[0] ==="ERROR: Username exists") // if username exists
                            return callback(new Error('The username already exists'));
                        else // if successfully signed up, flag successful user creation
                            return callback(null);
                    });
            }
            catch(error)
            {
                return callback(new Error(error));
            }
        }
        else
        {
            return callback(new Error('Invalid username, email, or password'));
        }

    },1500)
}