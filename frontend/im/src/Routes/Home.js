import { NavLink } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";

function Home() {
    // Define the name of the HTTP-only cookie you want to check for
const cookieName = 'jwt';

// Split the `document.cookie` string into an array of individual cookie strings
const cookiesArray = document.cookie.split('; ');

// Check if the cookie with the specified name exists
const cookieExists = cookiesArray.some(cookieString => cookieString.startsWith(`${cookieName}=`));

    function logout(){
        localStorage.clear()
        window.location.reload(false);
    }

return (
    <>
    {cookieExists?<Welcome />:<><Login /><button ><NavLink style={{ textDecoration: 'none' }} to="/register">Register</NavLink></button></>}
    {localStorage.getItem('username')?<button onClick={logout}>Logout</button>:null}
    </>
)
}

export default Home;