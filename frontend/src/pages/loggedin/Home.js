import { userData } from '../../information/UserData';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Home()
{
  const navigate = useNavigate();

  // checks if the user is logged in and redirects them to the front page if they aren't
  useEffect(()=>{
    if(userData["Username"] === "")
      navigate("/");
  })

  return (
      <div aria-label='home'>
        <h1>Home</h1>
        <div>Welcome {userData["Username"]}</div>
      </div>
    );
}