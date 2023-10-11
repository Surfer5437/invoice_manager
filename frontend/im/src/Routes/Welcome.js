function  Welcome () {
    
    return(
        <div className="container">
            <h1>Welcome {localStorage.getItem('username')}</h1>
            <h2>Thank you for using Jobly!</h2>
        </div>
    )
}

export default Welcome;