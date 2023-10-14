import Login from "./Login";
import Welcome from "./Welcome";
import ImApi from "./api";

function Home() {

    function logout(){
        localStorage.clear()
        ImApi.logoutUser()
        window.location.reload();
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