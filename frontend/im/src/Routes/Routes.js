import Home from './Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Companies from './Companies';
// import Company from './Company';
// import Jobs from './Jobs';
// import Profile from './Profile';
import NotFound from './NotFound';
import Navbar from './Navbar';
// import Register from './Register';

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
            {/* <Route path="company/:handle" element={<Company />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="profile/:user" element={<Profile />} />
            <Route path="register" element={<Register />} />*/}
            <Route path="*" element={<NotFound />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default Router;