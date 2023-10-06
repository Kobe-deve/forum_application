import { render, screen, waitFor } from '@testing-library/react';
import App from '../pages/App';

test('app renders', async () => {
  render(<App />);

  await waitFor(() => {
    const linkElement = screen.getByLabelText("front-page");
    expect(linkElement).toBeInTheDocument();
  },{timeout:3000});
  
});

test('app renders when there is login data', async () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
  });
  
  render(<App />);

  await waitFor(() => {
    const linkElement = screen.getByLabelText("home");
    expect(linkElement).toBeInTheDocument();
  },{timeout:3000});
});
