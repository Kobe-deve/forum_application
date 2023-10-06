import { render, screen } from '@testing-library/react';
import RoomList from '../pages/loggedin/selection/RoomList';
import { BrowserRouter } from 'react-router-dom';

test('renders room list page', () => {
    render(<BrowserRouter><RoomList /></BrowserRouter>);
    const linkElement = screen.getByLabelText("room-list");
    expect(linkElement).toBeInTheDocument();
  });
  