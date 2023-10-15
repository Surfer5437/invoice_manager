
function InvoiceComponent ({id,date,amount,service_type,file_url,job_po_number}) {

    return (
    <tr>
        <td>{id}</td>
        <td>{date}</td>
        <td>{amount}</td>    
        <td>{service_type}</td>  
        <td>{file_url}</td>  
        <td>{job_po_number}</td>  
    </tr>
    )
}

export default InvoiceComponent;