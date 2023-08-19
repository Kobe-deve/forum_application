import { render, screen } from '@testing-library/react';
import { BrowserRouter} from "react-router-dom";
import Home from '../pages/loggedin/Home';
import { userData } from '../information/UserData';
import * as router from 'react-router'

const navigate = jest.fn()

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

test('redirects to front page when there is no user data', ()=>{
  render(
    <BrowserRouter><Home /></BrowserRouter>);
    
  expect(navigate).toHaveBeenCalledWith('/')
});

test('renders home page', () => {
  userData["Username"] = "test"
    render(
      <BrowserRouter><Home /></BrowserRouter>);
    const linkElement = screen.getByLabelText("home");
    expect(linkElement).toBeInTheDocument();
  });
