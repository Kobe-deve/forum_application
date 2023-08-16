import { render, screen } from '@testing-library/react';
import {FrontPage} from '../pages/front/FrontPage';

test('renders front page', () => {
    render(<FrontPage />);
    const linkElement = screen.getByLabelText("front-page");
    expect(linkElement).toBeInTheDocument();
  });
  