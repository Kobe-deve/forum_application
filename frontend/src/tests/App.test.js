import { render, screen } from '@testing-library/react';
import App from '../pages/App';

test('app renders', () => {
  render(<App />);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
});

test('app renders when there is login data', () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
  });
  
  render(<App />);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
});
