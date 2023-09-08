import { waitFor } from '@testing-library/react';
import { socketConnection } from '../information/WebSocket';
import { urls } from '../information/Endpoints';

global.WebSocket = jest.fn().mockImplementation(()=>
{
    connected: false;
    onmessage: null;
    readyState: 1;
})

test('socketConnection constructor calls message room url',()=>{
    let socket = new socketConnection();
    socket.connect();

    expect(WebSocket).toHaveBeenCalledWith(urls["MESSAGE_ROOM"]);
});

test('socketConnection connection ',async ()=>{
    let socket = new socketConnection();
    socket.connect();

    expect(WebSocket).toHaveBeenCalledWith(urls["MESSAGE_ROOM"]);
    
    await waitFor(() => {
        socket.awaitConnection();
    },{timeout:300});
});