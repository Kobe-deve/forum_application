export default function Header() {
    return(<div>
        {!localStorage.getItem("JWT") && (<>
        <a href="/login">Login</a>
        <a href="/signup">SignUp</a></>)}

        {localStorage.getItem("JWT") && (<>
        <a href="/logout">Logout</a></>)}
    </div>);
}