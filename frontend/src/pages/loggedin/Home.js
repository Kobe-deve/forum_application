import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { getCookie } from '../../information/UserData';

export default function Home()
{
  const navigate = useNavigate();

  // checks if the user is logged in and redirects them to the front page if they aren't
  useEffect(()=>{
    if(getCookie('user') === "")
      navigate("/");
  })

  return (
      <div aria-label='home'>
        <h1>Home</h1>
        <div>Welcome {getCookie('user')}</div>
      </div>
    );
}