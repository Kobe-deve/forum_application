import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import FrontPage from "../pages/front/FrontPage.js"
import Home from '../pages/loggedin/Home.js'
import NoPage from "../pages/NoPage.js"
import Header from "./components/Header.js";
import '../index.css'

export default function App(){

  // check if the user is authenticated, if not send them to the front page
  useEffect(()=>{

  });

  return (
    <div style={{backgroundColor: 'rgb(105, 80, 206)'}}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route index element={<FrontPage />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      </div>
    );
}
