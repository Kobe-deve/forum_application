import { render, screen } from '@testing-library/react';
import {FriendsList} from '../pages/loggedin/selection/FriendsList';

test('renders friend list page', () => {
    render(<FriendsList />);
    const linkElement = screen.getByLabelText("friends-list");
    expect(linkElement).toBeInTheDocument();
  });
  