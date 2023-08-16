import { render, screen } from '@testing-library/react';
import MessageRoom from '../pages/loggedin/messaging/MessageRoom';

test('renders message room page', () => {
    render(<MessageRoom />);
    const linkElement = screen.getByLabelText("message-room");
    expect(linkElement).toBeInTheDocument();
  });
  