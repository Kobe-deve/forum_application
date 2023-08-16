import { render, screen } from '@testing-library/react';
import RoomList from '../pages/loggedin/selection/RoomList';

test('renders room list page', () => {
    render(<RoomList />);
    const linkElement = screen.getByLabelText("room-list");
    expect(linkElement).toBeInTheDocument();
  });
  