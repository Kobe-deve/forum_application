import { render, screen } from '@testing-library/react';
import App from '../pages/App';

test('app renders', () => {
  render(<App />);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
});

test('app renders when there is login data', () => {
  localStorage.setItem("JWT","blank");
  
  render(<App />);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
});
