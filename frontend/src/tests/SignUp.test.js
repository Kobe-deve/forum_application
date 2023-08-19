import { act, render, screen, fireEvent } from '@testing-library/react';
import SignUp from '../pages/front/user/SignUp';
import { callSignup } from '../functions/user/LoginFunctions';

jest.mock('../functions/user/LoginFunctions');

test('renders signup page', () => {
  render(<SignUp />);
  const linkElement = screen.getByLabelText("signup");
  expect(linkElement).toBeInTheDocument();
});
  
test('signup fails if repeat password and password dont match', async () => {
  render(<SignUp />);
  const linkElement = screen.getByLabelText("signup");
  expect(linkElement).toBeInTheDocument();

  const submitButton = screen.getByLabelText("signup-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");
  const emailInput = screen.getByLabelText("email");
  const repeatPassInput = screen.getByLabelText("password-confirm");

  await act(async () => {
    expect(userInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
    
  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruserseruseruser'}});
  fireEvent.change(emailInput,{target:{value:'user@user.com'}});
  fireEvent.change(repeatPassInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  await act(async () => {
    submitButton.click();
    
  });
  const failedSignup = screen.getByLabelText("fail");

  await act(async () => {
    expect(failedSignup).toBeInTheDocument();
  });

});

test('signup successful', async () => {
  callSignup.mockImplementation((username, email, password, callback)=>{callback(null);})

  render(<SignUp />);
  const linkElement = screen.getByLabelText("signup");
  expect(linkElement).toBeInTheDocument();

  const submitButton = screen.getByLabelText("signup-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");
  const emailInput = screen.getByLabelText("email");
  const repeatPassInput = screen.getByLabelText("password-confirm");

  await act(async () => {
    expect(userInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
    
  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(emailInput,{target:{value:'user@user.com'}});
  fireEvent.change(repeatPassInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  await act(async () => {
    submitButton.click();
    
  });
  const successSignup = screen.getByLabelText("success");

  await act(async () => {
    expect(successSignup).toBeInTheDocument();
  });

});

test('signup error handled', async () => {
  callSignup.mockImplementation((username, email, password, callback)=>{callback(new Error('The username already exists'));})

  render(<SignUp />);
  const linkElement = screen.getByLabelText("signup");
  expect(linkElement).toBeInTheDocument();

  const submitButton = screen.getByLabelText("signup-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");
  const emailInput = screen.getByLabelText("email");
  const repeatPassInput = screen.getByLabelText("password-confirm");

  await act(async () => {
    expect(userInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
    
  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(emailInput,{target:{value:'user@user.com'}});
  fireEvent.change(repeatPassInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  await act(async () => {
    submitButton.click();
    
  });
  const failSignup = screen.getByLabelText("fail");

  await act(async () => {
    expect(failSignup).toBeInTheDocument();
  });

});

test('test display that the signup request is loading', async () => {
  callSignup.mockImplementation((username, email, password, callback)=>{setTimeout(()=>{},10000)})

  render(<SignUp />);
  const linkElement = screen.getByLabelText("signup");
  expect(linkElement).toBeInTheDocument();

  const submitButton = screen.getByLabelText("signup-submit");
  const userInput = screen.getByLabelText("username");
  const passInput = screen.getByLabelText("password");
  const emailInput = screen.getByLabelText("email");
  const repeatPassInput = screen.getByLabelText("password-confirm");

  await act(async () => {
    expect(userInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(repeatPassInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
    
  fireEvent.change(userInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(passInput,{target:{value:'useruseruseruseruseruseruseruser'}});
  fireEvent.change(emailInput,{target:{value:'user@user.com'}});
  fireEvent.change(repeatPassInput,{target:{value:'useruseruseruseruseruseruseruser'}});

  await act(async () => {
    submitButton.click();
    
  });
  const loadingSignup = screen.getByLabelText("loading");

  await act(async () => {
    expect(loadingSignup).toBeInTheDocument();
  });

});