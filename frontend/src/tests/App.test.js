import { render, screen } from '@testing-library/react';
import App from '../pages/App';

test('renders front page', () => {
  render(<App />);
  const linkElement = screen.getByText(/front page/i);
  expect(linkElement).toBeInTheDocument();
});
