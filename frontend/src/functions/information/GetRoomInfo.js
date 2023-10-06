import * as EndpointInfo from '../../information/Endpoints'

export class roomListFetcher
{
    constructor() {
        this.roomListData = undefined;
        this.error = undefined;
    }

    connect = (callbackFunction) => {
        setTimeout(async ()=>{
            try
            {
                await fetch(EndpointInfo.urls["ROOM_LIST"], {
                    method: "GET",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'text/plain'
                    },            
                })
                .then(async (responseData) => {
                    let postResponse = await responseData.json();
                    this.roomListData = postResponse;
                    if(callbackFunction)
                        callbackFunction(postResponse);
                });
            }
            catch (error) {
                this.error = error;
            }
            
        },100);
    }
}