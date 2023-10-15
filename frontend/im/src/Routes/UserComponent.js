function UserComponent ({username,email,company_name,is_admin}) {
    return (
    <tr>
        <td>{username}</td>
        <td>{email}</td>
        <td>{is_admin.toString()}</td> 
        <td>{company_name}</td>    
         
    </tr>
    )
}

export default UserComponent;