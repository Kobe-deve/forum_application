import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import {socketConnection} from '../../../information/WebSocket.js';

export default function MessageRoom() {
    // socket client used 
    const [client,setClient] = useState(undefined);
    const [messages, setMessages] = useState(undefined);
    const [connected, setConnection] = useState(false);

    // start web socket connection
    useEffect(()=>{
      setClient(new socketConnection());
    },[]);

    // wait for connection from backend and messages
    useEffect(()=>{
        if(client)
        {
          client.connect();
          client.awaitConnection();
          client.listen((messageReceived)=>
          {
            setMessages(messageReceived);
            setConnection(true);
          });
        }
    },[client]);

    return(
        <div className="d-flex align-items-center justify-content-center text-center min-vh-100" aria-label='message-room'>
          <Container fluid>
            <Card>
                {
                  connected && <div>{console.log(messages)}Connected</div>
                }
                {
                  !connected && <Spinner aria-label = "loading-spinner" animation="border" variant="info" />
                }
                <Form>
                  <Row className="d-flex align-items-end">
                    <Col>
                      <FormControl type="text" className="w-100" aria-label='message' onChange={e=> {}} placeholder='Type your message here'/>
                    </Col>

                    <Col>
                      <Button type="submit" aria-label='send-message'>Send </Button>
                    </Col>
                  </Row>
                </Form>

            </Card>
          </Container>
        </div>
      );
}