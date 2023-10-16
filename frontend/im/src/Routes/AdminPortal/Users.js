import ImApi from '../api.js'
import React, { useState, useEffect } from 'react';
import UserComponent from './UserComponent.js';
import { useNavigate } from 'react-router-dom';
 function  Users () {
    const[users,setUsers] = useState( null);
    const navigate = useNavigate();

    useEffect(function usersLoad() {
         function logout(){
        navigate('/loggedOut')
        }
        ImApi.getUsers().then((result)=>{
            result===null?logout():setUsers(result.users)
            
        })
},[navigate])

    return(
        <div className="container">
            <p className='display-4'>Users</p>
            <div className=".center-block">
            <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Is-Admin</th>
                <th>Company Name</th>
              </tr>
            </thead>
            <tbody>
        
            {users? users.map((user) => (
            <UserComponent
            key={user.username}
            id={user.username} 
            username={user.username}
            email={user.email}
            company_name={user.company_name}
            is_admin={user.is_admin} />)) : <tr><td><div className='display-4'>Loading..........</div></td></tr>}
    </tbody>
            </table>
            </div>
        </div>
    )
}
export default Users;