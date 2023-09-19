// the host endpoint to call
var host = "http://localhost:4000"
var socketHost = "ws://localhost:8081/sockettest"

// holds all urls to access
export var urls = {
    "LOGIN": host+"/login",
    "SIGNUP": host+"/signup",
    "MESSAGE_ROOM":socketHost
};