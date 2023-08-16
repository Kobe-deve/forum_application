import { render, screen } from '@testing-library/react';
import {App} from '../pages/App';

test('app renders', () => {
  render(<App />);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
});
