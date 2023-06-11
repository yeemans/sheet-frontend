import React, {useState, useEffect} from "react"
import axios from "axios"

function Home() { 
    const [user, setUser] = useState("Guest");

    useEffect(() => {
        console.log(("sessionId" in sessionStorage))
        if (!("sessionId" in sessionStorage)) return;
        // check if user is logged in with a post request to the backend
        async function checkLoggedIn(){
            let result = await axios.post("http://localhost:5000/is-logged-in", {
                sessionId: sessionStorage["sessionId"]
            });

            if (result["data"]["message"] === "success") { 
                console.log(result["data"]["user"])
                setUser(result["data"]["user"]);
            }
                
        }        
        checkLoggedIn();
    }, [])

    return(
        <div> 
            <h2>hi {user} </h2>
        </div>
    )
}


export default Home;