import { userData } from '../../information/UserData';

export default function Home()
{
  return (
      <div aria-label='home'>
        <h1>Home</h1>
        <div>Welcome {userData["Username"]}</div>
      </div>
    );
}