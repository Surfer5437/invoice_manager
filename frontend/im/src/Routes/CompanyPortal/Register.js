import {  useState } from "react";
import ImApi from "../api";

function  Register () {
    const initialState = {
        username: "",
        password: "",
        email: "",
        company_id: ""
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
        const parseData = formData
        parseData.company_id=parseInt(parseData.company_id) 
        console.log(formData)
            await ImApi.postUser(formData).then((result)=>{
               localStorage.setItem('username', result.username);
                localStorage.setItem('isAdmin', result.isAdmin);
                localStorage.setItem('company_id', result.company_id);
            }) 
        setFormData(initialState);
    }

    return (
        <div className="container">
    <div className="row">
      <div className="col-md-6 custom-container mx-auto">
        <div className="container border rounded p-4 my-3">
            <h1 className="my-3">Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                className="form-control my-3"
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange} required/>
                <input
                className="form-control my-3"
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange} required/>
                <input
                className="form-control my-3"
                id="email"
                type="email"
                name="email"
                placeholder="example@host.com"
                value={formData.email}
                onChange={handleChange} required/>
                <input
                className="form-control my-3"
                id="company_id"
                type="integer"
                name="company_id"
                placeholder="company id number"
                value={formData.company_id}
                onChange={handleChange} required/>

                <button className="btn btn-primary btn-block my-3">Submit</button>
            </form>
        </div></div></div></div>
    )
}

export default Register;
