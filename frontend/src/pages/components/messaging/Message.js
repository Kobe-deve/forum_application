import placeholder from '../../../img/placeholder.png'
import Card from 'react-bootstrap/Card';

export default function Message(element)
{
    return (
        <Card style={{padding: 3, maxWidth:"80%"}}>
            <div>
                <div align="left">
                    {element.message_sender}
                </div> 

                <div align="left">
                        <img style = {{padding: 5}} align="left" src={placeholder} width="50" height="50" alt={element.message_sender+"icon"}/>
                        {element.message_text}

                </div> 

                <div align="right">
                    <small>
                    {element.message_timeStamp}
                    </small>
                </div> 
            </div>
        </Card>
    )
}
