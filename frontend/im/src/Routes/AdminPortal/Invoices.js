import ImApi from '../api.js'
import React, { useState, useEffect } from 'react';
import InvoiceComponent from './InvoiceComponent.js';
import { useNavigate } from 'react-router-dom';
 function  AllInvoices () {
    const[invoices,setInvoices] = useState( null);
    const navigate = useNavigate();

useEffect(function companiesLoad() {

    ImApi.getAllInvoices().then((result)=>{
        console.log(result)
        result===null?navigate('/'):setInvoices(result.invoices)
    })

},[navigate])
    return(
        <div className="container">
            <p className='display-4'>Invoices</p>
            <div className=".center-block">
            <table className="table">
            <thead>
      <tr>
        <th>id</th>
        <th>date</th>
        <th>amount</th>
        <th>service_type</th>
        <th>file_url</th>
        <th>job/po number</th>
        <th>company name</th>
      </tr>
    </thead>
        <tbody>
            {invoices? invoices.map((invoice) => (
            <InvoiceComponent 
            key={invoice.id}
            id={invoice.id} 
            date={invoice.date}
            amount={invoice.amount}
            service_type={invoice.service_type}
            file_url={invoice.file_url}
            job_po_number={invoice.job_po_number}
            company_name={invoice.companyName} />)) : <tr><td><div className='display-4'>Loading..........</div></td></tr>}
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default AllInvoices;