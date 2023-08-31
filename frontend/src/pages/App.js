import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.js";
import '../index.css'
import Content from "./Content.js";

export default function App(){
  
  return (
    <div style={{backgroundColor: 'rgb(105, 80, 206)'}}>
      <BrowserRouter>
        <Header/>
        <Content/>
      </BrowserRouter>
      </div>
    );
}
