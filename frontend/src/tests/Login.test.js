import { render, screen } from '@testing-library/react';
import { BrowserRouter} from "react-router-dom";
import Login from '../pages/front/user/Login';

test('renders login page', () => {
    render(
      <BrowserRouter>
          <Login />
          </BrowserRouter>
          );
    const linkElement = screen.getByLabelText("login");
    expect(linkElement).toBeInTheDocument();
  });
  