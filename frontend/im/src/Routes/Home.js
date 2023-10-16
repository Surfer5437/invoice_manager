import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";

function Home() {
  const navigate = useNavigate();
    function logout(){
        navigate('/loggedOut')
        }

return (
    <div className="container">
    <div className="row">
      <div className="col-md-6 custom-container mx-auto">
    {localStorage.getItem('username')?<Welcome />:<><Login /></>}
    {localStorage.getItem('username')?<button className="btn btn-primary btn-block" onClick={logout}>Logout</button>:null}
        </div>
      </div>
    </div>
)
}

export default Home;