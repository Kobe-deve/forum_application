import { getCookie } from "../../information/UserData";

export default function Header() {
    return(<div>
        {!getCookie("t") && (<>
        <a href="/login">Login</a>
        <a href="/signup">SignUp</a></>)}

        {getCookie("t") && (<>
        <a href="/logout">Logout</a></>)}
    </div>);
}