import { urls } from "./Endpoints";

export class socketConnection 
{
    constructor() {
        this.socket = null;
        this.connected = false;
        this.messages = {};
        this.messageReceived = false;
    }

    setMessages = (jsonData) =>
    {
        this.messageReceived = true;
        let response = JSON.parse(jsonData.data);
        this.messages = JSON.parse(response["messages"]);
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

    awaitConnection = (callbackFunction) => {
        const recursion = this.awaitConnection;
        setTimeout(
            () => {
                if(this.socket.readyState === 1)
                {
                    this.socket.send("{\"room_id\": 1}");
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