import { render, screen } from '@testing-library/react';
import {SignUp} from '../pages/front/user/SignUp';

test('renders signup page', () => {
    render(<SignUp />);
    const linkElement = screen.getByLabelText("signup");
    expect(linkElement).toBeInTheDocument();
  });
  