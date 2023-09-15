import { urls } from "./Endpoints";
import { getCookie } from "./UserData";

export class socketConnection 
{
    constructor() {
        this.socket = null;
        this.connected = false;
        this.messages = {};
        this.messageReceived = false;
        this.error = false;
    }

    setMessages = (jsonData) =>
    {
        this.messageReceived = true;
        let response = JSON.parse(jsonData.data);

        // check if messages or an error was sent back
        if(response["error"])
            this.error = true;
        else
        {
            this.messages = JSON.parse(response["messages"]);
            this.error = false;
        }
    }

    get getMessages()
    {
        return this.messages;
    }

    connect = () => {
        this.socket = new WebSocket(urls["MESSAGE_ROOM"]);
      
        this.socket.onmessage = (event) => {
            this.setMessages(event);
        };
    }

    sendMessage = () => {
        this.socket.send("{\"room_id\": 1, \"Auth\": \""+getCookie("t")+"\"}");
    }

    awaitConnection = (callbackFunction) => {
        const recursion = this.awaitConnection;
        setTimeout(
            () => {
                if(this.socket.readyState === 1)
                {
                    this.sendMessage();
                    this.connected = true;
                    
                    if(callbackFunction)
                        callbackFunction(this.messages);
                    return;
                }
                else
                {
                    recursion(callbackFunction);
                }
            },
        1);
    }

    listen = (callbackFunction) => {
        const recursion = this.listen;
        setTimeout(
            () => {
                if(this.messageReceived)
                {
                    if(callbackFunction)
                        callbackFunction(this.messages);
                    return;
                }
                else
                {
                    recursion(callbackFunction);
                }
            },
        1);
    }
}