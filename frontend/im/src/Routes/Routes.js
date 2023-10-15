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
            {/*<Route path="profile/:user" element={<Profile />} />
            <Route path="register" element={<Register />} />*/}
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default Router;