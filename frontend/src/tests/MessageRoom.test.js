import { render, screen } from '@testing-library/react';
import MessageRoom from '../pages/loggedin/messaging/MessageRoom';
import * as router from 'react-router'
import { socketConnection } from '../information/WebSocket';

const WebSocket = jest.fn()

beforeEach(() => {
  jest.mock('../information/WebSocket', ()=> {
  })
})

test('renders message room page', () => {
    render(<MessageRoom room_id={0} />);
    const linkElement = screen.getByLabelText("message-room");
    expect(linkElement).toBeInTheDocument();
  });
  