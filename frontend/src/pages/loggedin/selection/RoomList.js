import { useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import Container from "react-bootstrap/esm/Container";
import { roomListFetcher } from "../../../functions/information/GetRoomInfo";
import Col from "react-bootstrap/esm/Col";
import Card  from "react-bootstrap/esm/Card";
import * as Icon from 'react-bootstrap-icons';

export default function RoomList()
{
  const [dataFetcher,setDataFetcher] = useState(undefined);
  const [loadingData,setLoadingStatus] = useState(true);
  const [roomList,setRoomList] = useState([]);
  const [loadedRooms,setRoomStatus] = useState(false);
  const [errorDetected,setErrorDetected] = useState(false);
  
  useEffect(()=>{
    if(!dataFetcher)
      setDataFetcher(new roomListFetcher())
  },[dataFetcher])

  useEffect(()=>{
    function setRooms(postResponse)
    {
      setRoomList(postResponse);
      setRoomStatus(true);
      setErrorDetected(false);
      setLoadingStatus(false);
    }

    if(setLoadingStatus && dataFetcher)
    {
      dataFetcher.connect((postResponse)=>{
        setRooms(postResponse);
      });
    }
  },[dataFetcher])

  const displayAvailableRooms = () =>
  {
    let displayRoomsList = [];
    let iterator = 0;

    if(Array.isArray(roomList))
    {
      roomList.forEach(element => {
        displayRoomsList.push(
        <div onClick={()=>{console.log(element.roomName)}} key={iterator++} style={{padding:3}}>
          <Card style={{padding: 10}}> 
            <div align="left">
              {element.roomName}
            </div> 
            <div align="right">
              <Icon.ArrowRight/>
            </div>
          </Card>
        </div>)
      });
    }
    return (<div>
              <h1 align="left">Open Rooms:</h1>
              {displayRoomsList}
            </div>)
  }

  return (
      <div aria-label='room-list' style={{position: "relative", bottom: "10%", maxWidth: "100%"}} className="d-flex align-items-center justify-content-center text-center min-vh-100">
        <Container fluid>
          <Row>
            {loadingData &&  <Row className="me-auto">
                        <Col>
                            <Spinner aria-label = "loading-spinner" animation="border" variant="info" />
                        </Col>
                    </Row>}
            { errorDetected && <div>ERROR: COULD NOT LOAD ROOMS</div>}
            { loadedRooms && displayAvailableRooms()}
          </Row>
        </Container>
      </div>
    );
}
