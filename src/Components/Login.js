import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios"

function Login(props) { 
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => { 
        console.log(location)
        if (location.state != null && "error" in location.state) setErrorMessage(location.state.error)
    }, [])
    async function sendLogIn() { 
        let result = await axios.post("http://localhost:5000/login", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });

        console.log(result);

        if (result["data"]["message"] === "success") {
            // save session, then redirect to dashboard
            sessionStorage.setItem("sessionId", result["data"]["session"]);
            console.log(sessionStorage)
            navigate("/home");
            return;
        }

        // account not recognized 
        setErrorMessage(result["data"]["message"])
    }

    return( 
        <div> 
            <p>{errorMessage}</p>
            <h1>Login</h1>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username"/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password"/>

            <button onClick={() => sendLogIn()}>Log In</button>
        </div>
    )
}

export default Login;