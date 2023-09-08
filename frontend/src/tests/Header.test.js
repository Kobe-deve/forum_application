import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../pages/components/Header';
import * as router from 'react-router'
import { getCookie } from '../information/UserData';

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

test('renders header', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const linkElement = screen.getByLabelText("header");
    expect(linkElement).toBeInTheDocument();
  });
  
test('clicking on logo redirects to front', async () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const logo = screen.getByLabelText("logo");
    expect(logo).toBeInTheDocument();

    await act(async () => {
        logo.click();
        
      });

      expect(navigate).toHaveBeenCalledWith('/')
});

  test('renders logout option when logged in', () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
      });

    render(<BrowserRouter><Header /></BrowserRouter>);
    const linkElement = screen.getByLabelText("logout-button");
    expect(linkElement).toBeInTheDocument();
});
  
test('clicking on logout will move to logout call', async () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 't=THEREISATOKENMAN;user=THEREISAUSER;',
      });

    render(<BrowserRouter><Header /></BrowserRouter>);
    const linkElement = screen.getByLabelText("logout-button");
    expect(linkElement).toBeInTheDocument();

    await act(async () => {
        linkElement.click();
        
      });

    expect(getCookie("user")).toBe("")
    expect(navigate).toHaveBeenCalledWith('/')
});