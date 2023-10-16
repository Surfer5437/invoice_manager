import { useState } from "react";
import ImApi from "./api";
import { NavLink } from "react-router-dom";



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
                localStorage.setItem('username', result.username);
                localStorage.setItem('is_admin', result.is_admin);
                localStorage.setItem('company_id', result.company_id);
            });
            console.log()
            window.location.reload();
        } catch (err){

            }
    }

    return (
        <div className="container border rounded p-4 my-3">
            <h1 className="my-3">Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                className="form-control my-3"
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange} />
                <input
                className="form-control my-3"
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange} />
                <button className="btn btn-primary btn-block my-3">Submit</button>
                <NavLink to='/register'>
                <button className=" btn btn-primary btn-block my-3">register</button>
            </NavLink>
            </form>
        </div>
    )

}

export default Login;