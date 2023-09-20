import placeholder from '../../../img/placeholder.png'
import Card from 'react-bootstrap/Card';

export default function Message(element)
{
    return (
        <Card style={{padding: 3, maxWidth:"80%"}}>
            <div>
                <div align="left">
                    {element.sender_name}
                </div> 

                <div align="left">
                        <img style = {{padding: 5}} align="left" src={placeholder} width="50" height="50" alt={element.message_sender+"icon"}/>
                        {element.text}

                </div> 

                <div align="right">
                    <small>
                    {element.time_stamp}
                    </small>
                </div> 
            </div>
        </Card>
    )
}
