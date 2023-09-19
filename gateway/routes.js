const ROUTES = [
    {
        url: '/login',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081/users/login",
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '',
            },
        }
    },
	{
        url: '/signup',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:8081/users/signup",
            changeOrigin: true,
            pathRewrite: {
                [`^/signup`]: '',
            },
        }
    },
    {
        url: '/socket',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "ws://localhost:8081/sockettest",
            changeOrigin: true,
            pathRewrite: {
                [`^/socket`]: '',
            },
        }
    }
]

/*
// the host endpoint to call
var host = "http://localhost:8081"
var socketHost = "ws://localhost:8081"

// holds all urls to access
export var urls = {
    "LOGIN": host+"/users/login",
    "SIGNUP": host+"/users/signup",
    "AUTHENTICATE": host+"users/authenticate",
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
    "ACCEPT_FRIEND_REQUEST":host+"/friends/accept/",

    "MESSAGE_ROOM":socketHost+"/sockettest"
};
*/

exports.ROUTES = ROUTES;