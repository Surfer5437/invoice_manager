import {  useEffect, useState } from "react";
import ImApi from "../api";
import { useNavigate } from "react-router-dom";
import CompanyJSXList from './CompanyJSXList';

function  AddInvoice () {
    const initialState = {
        date: "",
        amount: "",
        company_id: "",
        job_po_number: "",
        file_url: ""
    };




    const navigate = useNavigate();
    const[companies,setCompanies] = useState( null);
    useEffect(function companiesLoad() {
    
        ImApi.getCompanies().then((result)=>{
            result===null?navigate('/'):setCompanies(result.companies)
        }) 
    },[navigate])
   
    


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
            await ImApi.postInvoiceToCompany(formData).then((result)=>{
              console.log(result.invoice)
            }) 
        setFormData(initialState);
    }

    return (
        <div className="container">
    <div className="row">
      <div className="col-md-6 custom-container mx-auto">
        <div className="container border rounded p-4 my-3">
            <h1 className="my-3">AddInvoice</h1>
            <form onSubmit={handleSubmit}>
                <input
                className="form-control my-3"
                id="date"
                type="date"
                name="date"
                placeholder="date"
                value={formData.date}
                onChange={handleChange} required/>

                <select className="form-control my-3" name="service_type"id="dropdown" value={formData.service_type} onChange={handleChange}>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="New Build">New Build</option>
                </select>
                
                <input
                className="form-control my-3"
                id="amount"
                type="amount"
                name="amount"
                placeholder="cost"
                value={formData.amount}
                onChange={handleChange} required/>

                <select className="form-control my-3" name="company_id"id="dropdown" value={formData.company_id} onChange={handleChange}>
                            {companies? companies.map((company) => (
                                <CompanyJSXList key={company.id} id={company.id} name={company.name} />
                                )):null}
                </select>

                <input
                className="form-control my-3"
                id="job_po_number"
                type="text"
                name="job_po_number"
                placeholder="Job/PO Number"
                value={formData.job_po_number}
                onChange={handleChange} required/>

                <input
                className="form-control my-3"
                id="file_url"
                type="file"
                name="file_url"
                value={formData.fil_url}
                onChange={handleChange} required/>

                <button className="btn btn-primary btn-block my-3">Submit</button>
            </form>
        </div></div></div></div>
    )
}

export default AddInvoice;
