import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login() { 
    const navigate = useNavigate();
    async function sendLogIn() { 
        let result = await axios.post("http://localhost:5000/login", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });

        console.log(result);

        if (result["data"]["message"] === "success") {
            // save cookie, then redirect to dashboard
            sessionStorage.setItem("sessionId", result["data"]["session"]);
            console.log(sessionStorage)
            // navigate("/home");
        }
    }

    return( 
        <div> 
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