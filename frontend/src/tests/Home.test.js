import { render, screen } from '@testing-library/react';
import Home from '../pages/loggedin/Home';

test('renders home page', () => {
    render(<Home />);
    const linkElement = screen.getByLabelText("home");
    expect(linkElement).toBeInTheDocument();
  });
  