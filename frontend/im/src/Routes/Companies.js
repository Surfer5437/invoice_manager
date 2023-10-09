import ImApi from './api.js'
import React, { useState, useEffect } from 'react';
import CompanyComponent from './CompanyComponent.js';
 function  Companies () {
    const[companies,setCompanies] = useState( null);


useEffect(function companiesLoad() {
    ImApi.getCompanies().then((result)=>{
        setCompanies(result.companies)
    }) 
},[])
    return(

        <div class="container">
            <h2>Companies</h2>
            <div class=".center-block">
            <table class="table">
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
            phone_number={company.phone_number} />)) : <h2>Loading..........</h2>}
            </tbody>
            </table>
            </div>
        </div>
    )
}
export default Companies;