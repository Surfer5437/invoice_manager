
import "./CompanyComponent.css"

function CompanyComponent ({id,name,address,contact_name,phone_number}) {

    return (
    <tr>
        <td>{name}</td>
        <td>{address}</td>
        <td>{contact_name}</td>    
        <td>{phone_number}</td>  
    </tr>
    )
}

export default CompanyComponent;