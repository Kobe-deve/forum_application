import { act, waitFor, render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Login from '../pages/front/user/Login';
import { callLogin } from '../functions/user/LoginFunctions';'../functions/user/LoginFunctions';
import * as router from 'react-router'

jest.mock('../functions/user/LoginFunctions');
const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

test('renders login page', () => {
    render(
      <BrowserRouter>
          <Login />
          </BrowserRouter>
          );
    const linkElement = screen.getByLabelText("login");
    expect(linkElement).toBeInTheDocument();
  });

test('test successful login behavior', async ()=>{
  callLogin.mockImplementation((username, password, callback)=>{callback(null);})

  render(
    <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
  const submitButton = screen.getByLabelText("login-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");

  await act(async () => {
      expect(userInput).toBeInTheDocument();
      expect(passInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
  });

  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  expect(userInput.value).toBe('useruseruseruseruseruseruseruser')
  expect(passInput.value).toBe('useruseruseruseruseruseruseruser')

  await act(async () => {
    submitButton.click();
    
  });
  const successfulLogin = screen.getByLabelText("success");

  await act(async () => {
    expect(successfulLogin).toBeInTheDocument();
  });
  
  expect(navigate).toHaveBeenCalledWith('/home');
});

test('test failed login behavior', async ()=>{
  callLogin.mockImplementation((username, password, callback)=>{callback('Invalid username or password');})

  render(
    <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
  const submitButton = screen.getByLabelText("login-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");

  await act(async () => {
      expect(userInput).toBeInTheDocument();
      expect(passInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
  });

  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  expect(userInput.value).toBe('useruseruseruseruseruseruseruser')
  expect(passInput.value).toBe('useruseruseruseruseruseruseruser')

  await act(async () => {
    submitButton.click();
    
  });
  const failedLogin = screen.getByLabelText("fail");

  await act(async () => {
    expect(failedLogin).toBeInTheDocument();
  });
  
});

test('test display that the login request is loading', async ()=>{
  callLogin.mockImplementation((username, password, callback)=>{setTimeout(()=>{},10000)})

  render(
    <BrowserRouter>
        <Login />
        </BrowserRouter>
        );
  const submitButton = screen.getByLabelText("login-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");

  await act(async () => {
      expect(userInput).toBeInTheDocument();
      expect(passInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
  });

  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  expect(userInput.value).toBe('useruseruseruseruseruseruseruser')
  expect(passInput.value).toBe('useruseruseruseruseruseruseruser')

  await act(async () => {
    submitButton.click();
    
  });
  const loadingLogin = screen.getByLabelText("loading");

  await act(async () => {
    expect(loadingLogin).toBeInTheDocument();
  });
  
});