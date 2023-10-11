import { useState } from "react";
import ImApi from "./api";



function  Login () {
    const initialState = {
        username: "",
        password: ""
    };
   const [formData, setFormData] = useState(initialState);
    const handleChange = e =>{
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

   async function  handleSubmit (e) {
        e.preventDefault();
        try {
            await ImApi.loginUser(formData).then((result)=>{
                
                const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
                alert(jwtCookie)
if (jwtCookie) {
  // Extract the JWT token value from the cookie
  const jwtToken = jwtCookie.split('=')[1];
  console.log('JWT Token:', jwtToken);
localStorage.setItem('jwtToken', jwtToken);
  // Now you can use the JWT token as needed in your client-side code
} else {
  console.log('JWT Cookie not found');
}


// Retrieve the JWT token from localStorage
const storedToken = localStorage.getItem('jwtToken');

// Use the stored token as needed
console.log('Stored JWT Token:', storedToken);
                console.log(result)
                localStorage.setItem('token', storedToken)
                localStorage.setItem('username', formData.username)
            }) 
        } catch (error) {
            alert(error[0])
        }
            
            if (localStorage.getItem('username')){
                setFormData(initialState);
                window.location.reload(false);
            }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange} />
                <label htmlFor="password">Password:</label>
                <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange} />
                <button>Submit</button>
            </form>
        </div>
    )

}

export default Login;