import { urls } from "./Endpoints";
import { getCookie } from "./UserData";

export class socketConnection 
{
    constructor() {
        this.socket = null;
        this.connected = false;
        this.messages = null;
        this.messageReceived = false;
        this.error = false;
        this.connectionTime = null;
        this.sentMessage = "";
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

    setMessage = (messageContent) =>
    {
        this.sentMessage = messageContent;
    }

    get getMessages()
    {
        return this.messages;
    }

    connect = () => {
        try{
            this.socket = new WebSocket(urls["MESSAGE_ROOM"]);
        
            this.socket.onmessage = (event) => {
                this.setMessages(event);
            };
        }
        catch(Error)
        {
            this.error = true;
        }
    }

    sendMessage = () => {
        if(!this.error && this.socket.readyState === 1)
        {
            if(this.sentMessage === undefined)
                this.sentMessage = "";
            this.socket.send("{\"room_id\": 1, \"User\": \""+getCookie("user")+"\", \"Auth\": \""+getCookie("user")+"\", \"Message\": \""+this.sentMessage+"\"}");
            // if sent message is used, set it back to empty is it isn't sent 
            this.sentMessage = "";
        }
    }

    awaitConnection = (callbackFunction) => {
        const recursion = this.awaitConnection;
        setTimeout(
            () => {
                if(this.socket.readyState === 1)
                {
                    this.sendMessage();
                    this.connected = true;
                    this.connectionTime = null;
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
        // check initial connection time 
        if(!this.messages && !this.connectionTime)
            this.connectionTime = Date.now();
        else if(!this.messages && (Date.now()-this.connectionTime)/1000 > 3)
        {
            this.error = true;
            if(callbackFunction)
                callbackFunction("");
            return;
        }

        const recursion = this.listen;
        const checkTimeout = setTimeout(
            () => {
                if(this.messageReceived)
                {
                    if(callbackFunction)
                        callbackFunction(this.messages);

                    clearTimeout(checkTimeout);
                    return;
                }
                else
                {
                    if(callbackFunction)
                        recursion(callbackFunction);
                }
            },
        1);
    }
}