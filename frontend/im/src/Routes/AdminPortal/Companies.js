import ImApi from '../api.js'
import React, { useState, useEffect } from 'react';
import CompanyComponent from './CompanyComponent.js';
import { useNavigate } from 'react-router-dom';
 function  Companies () {
    const[companies,setCompanies] = useState( null);
    const navigate = useNavigate();

useEffect(function companiesLoad() {
    
    ImApi.getCompanies().then((result)=>{
        result===null?navigate('/'):setCompanies(result.companies)
    }) 

},[navigate])
    return(
        
        <div className="container">
            <p className='display-4'>Companies</p>
            <div className=".center-block">
            <table className="table">
            <thead>
      <tr>
        <th>name</th>
        <th>address</th>
        <th>contact name</th>
        <th>phone number</th>
      </tr>
    </thead>
    <tbody>
        
            {companies? companies.map((company) => (
            <CompanyComponent 
            key={company.id}
            id={company.id} 
            name={company.name}
            address={company.address}
            contact_name={company.contact_name}
            phone_number={company.phone_number} />)) : <tr><td><div className='display-4'>Loading..........</div></td></tr>}
    </tbody>
            </table>
            </div>
        </div>
    )
}
export default Companies;