import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Companies from './AdminPortal/Companies';
// import Company from './Company';
// import Jobs from './Jobs';
// import Profile from './Profile';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Users from './AdminPortal/Users';
import Register from './CompanyPortal/Register';
import InvoicesPerCompany from './CompanyPortal/InvoicesPerCompany';
import AllInvoices from './AdminPortal/Invoices';
import AddInvoice from './AdminPortal/AddInvoice';
import LoggedOut from './LoggedOut';
// import Register from './Register';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
            <Route path="users" element={<Users />} />
             <Route path="register" element={<Register />} />
            <Route path="companyinvoices" element={<InvoicesPerCompany />} />
            <Route path="allinvoices" element={<AllInvoices />} />
            <Route path="AddInvoice" element={<AddInvoice />} />
            <Route path="LoggedOut" element={<LoggedOut />} />
            {/*<Route path="register" element={<Register />} />*/}
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default Router;