import { callAuth } from "../functions/user/LoginFunctions";

// set user data to be accessed with requests/display
export function setUserData(JWT,Username,ChatroomName,ChatRoomId){

    const now = new Date();
    const expiration = now.getTime()+1800000;
    document.cookie = 'user='+Username + ';room=0;roomName="";t='+ JWT +';expires='+ expiration.toString() +';secure;'
}

// clear all user data
export function clearData()
{
    var allCookies = document.cookie.split(';');
                
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();
}

// verify that the jwt token is valid, if not then remove credentials
export function verifyCredentials()
{
    if(getCookie("t") !== "")
    {
        try{
            callAuth(getCookie("t"),error=>{
                if(!error)
                    return true;
                else
                {
                    document.cookie="";
                    return false;
                }
            });
        }
        catch(error)
        {
            document.cookie="";
        }
    }   
}

// get cookie stored
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }