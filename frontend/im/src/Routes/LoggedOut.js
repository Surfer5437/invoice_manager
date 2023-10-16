
import { useNavigate } from 'react-router-dom';
import ImApi from './api';

function LoggedOut(){
    const navigate = useNavigate();
    function logOutFunction(){
        ImApi.logoutUser()
        setTimeout(function () {
            
            navigate('/')
          }, 2000);
    }
    logOutFunction();
    return(
        <>
        <p>You have been logged out.</p>
        <p>Being redirected to login...</p>
        </>
    )
}


export default LoggedOut;