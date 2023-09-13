import placeholder from '../../../img/placeholder.png'

export default function Message(element)
{
    return (
        <div align="left">
            <div align="left">
                {element.message_sender}
            </div> 

            <div align="center">
                    <img align="left" src={placeholder} width="50" height="50" alt={element.message_sender+"icon"}/>
                    {element.message_text}

            </div> 

            <div align="right">
                <small>
                {element.message_timeStamp}
                </small>
            </div> 
        </div>
    )
}
