export var userData = {
    "JWT": "",
    "Username": "",
    "ChatroomName": "",
    "LoggedIn": false
}

// set user data into storage
export function setUserData(JWT,Username,ChatroomName,ChatRoomId,LoggedIn){
    localStorage.setItem("JWT", JWT);
    localStorage.setItem("Username", Username);
    localStorage.setItem("ChatroomName", ChatroomName);
    localStorage.setItem("ChatRoomId", ChatRoomId);
}

// verify that the jwt token is valid, if not then remove credentials
export function verifyCredentials()
{
    try{

    }
    catch(error)
    {
        localStorage.clear();
    }
}