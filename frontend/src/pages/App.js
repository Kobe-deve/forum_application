import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import FrontPage from "../pages/front/FrontPage.js"
import Login from "../pages/front/user/Login.js"
import SignUp from "../pages/front/user/SignUp.js"
import Home from '../pages/loggedin/Home.js'
import NoPage from "../pages/NoPage.js"

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<FrontPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
