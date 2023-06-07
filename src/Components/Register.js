import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Register() { 
    const navigate = useNavigate();
    async function sendLogIn() { 
        let result = await axios.post("http://localhost:5000/login", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });

        console.log(result);

        //if (result["data"]["success"]) {
            // save cookie, then redirect to dashboard
          //  sessionStorage.setItem("sessionId", result["data"]["cookie"]);
            //navigate("/home");
        //}
    }

    async function sendRegistration() { 
        // TODO: implement login post request to api
        let result = await axios.post("http://localhost:5000/sign-up", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });

        if (result["data"]["message"] === "success") await sendLogIn();
        console.log(result);
    }

    return( 
        <div> 
            <h1>Login</h1>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username"/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password"/>

            <button onClick={() => sendRegistration()}>Log In</button>
        </div>
    )
}

export default Register;