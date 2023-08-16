// the host endpoint to call
var host = "http://localhost:8081"

// holds all urls to access
export var urls = {
    "LOGIN": host+"/users/login",
    "SIGNUP": host+"/users/signup",
    "USER_INFO": host+"/users/",
    "CREATE_ROOM":host+"/rooms/createRoom",
    "ROOM_INFO":host+"/rooms/",
    "SEND_MESSAGE":host+"/message/send",
    "GET_MESSAGES":host+"/message/",
    "RECENT_MESSAGE":host+"/message/recent/",
    "REPORT_MESSAGE":host+"/message/report",
    "FRIEND_LIST":host+"/friends/list",
    "VIEW_FRIEND_REQUESTS":host+"/friends/requests",
    "SEND_FRIEND_REQUESTS":host+"/friends/request/",
    "REMOVE_FRIEND":host+"/friends/remove/",
    "ACCEPT_FRIEND_REQUEST":host+"/friends/accept/"
};