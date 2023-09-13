import { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import {socketConnection} from '../../../information/WebSocket.js';
import Message from '../../components/messaging/Message.js';
import { getCookie } from '../../../information/UserData.js';

export default function MessageRoom() {
    // socket client used 
    const [client,setClient] = useState(undefined);
    const [messages, setMessages] = useState(undefined);
    const [connected, setConnection] = useState(false);
    const chatLog = useRef();

    // start web socket connection
    useEffect(()=>{
      setClient(new socketConnection());
      // set scrollbar to bottom
      scrollToBottom();
    },[]);

    const scrollToBottom = () => {
      if (chatLog.current) {
        chatLog.current.scrollTop = chatLog.current.scrollHeight;
      }
    }

    // wait for connection from backend and messages
    useEffect(()=>{
      // keeps sending a connection to get information on the chatroom
      const sendAndUpdate = () => {
        client.sendMessage();
        client.listen((messageReceived)=>
        {
            setMessages(messageReceived);
            setConnection(true);
        });
      }

      if(client)
      {
        client.connect();
        client.awaitConnection();
        client.listen((messageReceived)=>
        {
          setMessages(messageReceived);
          setConnection(true);
          setInterval(sendAndUpdate,1000);
        });
      }
    },[client]);

    const displayMessage = () => {
        let displayMessages = []
        let iterator = 0;

        messages.forEach(element => {
          element.sender = element.message_sender === getCookie("user");
          displayMessages.push(<div key={iterator++}>
                                <Row className={element.sender ? "flex-row-reverse": ""}  style={{paddingLeft:15, paddingRight:15, paddingBottom:5, paddingTop:5}}>                                   
                                    <Message {...element}/>   
                                </Row>
                              </div>)
        });

        return (<div ref={chatLog} style={{maxHeight: "70vh", overflowAnchor: "auto", flexDirection: "column-reverse", overflowX: "hidden"}} className="overflow-y-scroll">{displayMessages}</div>);
    }

    return(
        <div style={{position: "relative", bottom: "10%", maxWidth: "100%"}} className="d-flex align-items-center justify-content-center text-center min-vh-100" aria-label='message-room'>
          <Container fluid>
            <Card>
                {
                  connected && displayMessage()
                }
                {
                  !connected && <Spinner aria-label = "loading-spinner" animation="border" variant="info" />
                }
                <Form style={{backgroundColor:"blue"}}>
                  <Row xs={2} md={2} lg={2} xxl={2}>
                    <Col style={{paddingRight: "0%",width:"80%"}}>
                      <FormControl type="text" aria-label='message' onChange={e=> {}} placeholder='Type your message here'/>
                    </Col>

                    <Col style={{paddingLeft: "0%", width:"20%"}}>
                      <Button type="submit" aria-label='send-message'>Send </Button>
                    </Col>
                  </Row>
                </Form>

            </Card>
          </Container>
        </div>
      );
}