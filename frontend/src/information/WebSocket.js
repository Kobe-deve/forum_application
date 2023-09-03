import { urls } from "./Endpoints";
import Stomp from "webstomp-client";

export function connect()
{
    var socket = new WebSocket(urls["MESSAGE_ROOM_SEND"]);
    var stompClient = Stomp.over(socket);  
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(urls["MESSAGE_ROOM_LISTENING"], function(messageOutput) {
            console.log(JSON.parse(messageOutput.body));
        });
    });

    return stompClient;
}

export function disconnect(stompClient)
{
    if(stompClient != null) {
        stompClient.disconnect();
    }
}

export function showMessages(messageOutput)
{
    return (<div>{messageOutput.text}</div>)
}

export function sendMessage(message)
{
    
}
