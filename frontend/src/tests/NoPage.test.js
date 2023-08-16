import { render, screen } from '@testing-library/react';
import {NoPage} from '../pages/NoPage';

test('renders no page available page', () => {
    render(<NoPage />);
    const linkElement = screen.getByLabelText("no-page");
    expect(linkElement).toBeInTheDocument();
  });
  