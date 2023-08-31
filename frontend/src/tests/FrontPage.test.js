import { act, render, screen } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import FrontPage from '../pages/front/FrontPage';

test('renders front page', () => {
    render(<FrontPage />);
    const linkElement = screen.getByLabelText("front-page");
    expect(linkElement).toBeInTheDocument();
  });

test('login prompt appears when clicking on login button',async ()=>{
  render(<BrowserRouter><FrontPage /></BrowserRouter>);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
  
  const loginButton = screen.getByLabelText("loginButton");
  await act(async () => {
    loginButton.click();
  });
  
  const loginPage = screen.getByLabelText("login");
  expect(loginPage).toBeInTheDocument();

});

test('signup prompt appears when clicking on signup button',async ()=>{
  render(<BrowserRouter><FrontPage /></BrowserRouter>);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
  
  const signupButton = screen.getByLabelText("signupButton");
  await act(async () => {
    signupButton.click();
  });
  
  const signupPage = screen.getByLabelText("signup");
  expect(signupPage).toBeInTheDocument();
});

test('can move out of login screen',async ()=>{
  render(<BrowserRouter><FrontPage /></BrowserRouter>);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
  
  const loginButton = screen.getByLabelText("loginButton");
  await act(async () => {
    loginButton.click();
  });
  
  const loginPage = screen.getByLabelText("login");
  expect(loginPage).toBeInTheDocument();

  const closeLoginButton = screen.getByLabelText("closeLogin");
  expect(closeLoginButton).toBeInTheDocument();

  await act(async () => {
    closeLoginButton.click();
  });

  expect(linkElement).toBeInTheDocument();
});

test('can move out of signup screen',async ()=>{
  render(<BrowserRouter><FrontPage /></BrowserRouter>);
  const linkElement = screen.getByLabelText("front-page");
  expect(linkElement).toBeInTheDocument();
  
  const signupButton = screen.getByLabelText("signupButton");
  await act(async () => {
    signupButton.click();
  });

  const signupPage = screen.getByLabelText("signup");
  expect(signupPage).toBeInTheDocument();

  const closeSignupButton = screen.getByLabelText("closeSignup");
  expect(closeSignupButton).toBeInTheDocument();

  await act(async () => {
    closeSignupButton.click();
  });

  expect(linkElement).toBeInTheDocument();
});