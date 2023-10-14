function  Welcome () {
    
    return(
        <div className="container border rounded p-4 my-3">
            <h1>Welcome {localStorage.getItem('username')}</h1>
            <h2>Logged in! </h2>
        </div>
    )
}

export default Welcome;