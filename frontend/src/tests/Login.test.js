import { render, screen } from '@testing-library/react';
import {Login} from '../pages/front/user/Login';

test('renders login page', () => {
    render(<Login />);
    const linkElement = screen.getByLabelText("login");
    expect(linkElement).toBeInTheDocument();
  });
  