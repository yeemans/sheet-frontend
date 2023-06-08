import React, {useState, useEffect} from "react"
import axios from "axios"

function Home() { 
    const [user, setUser] = useState("Guest");
    const [file, setFile] = useState();

    const handleFileChange = (e) => {
        console.log("clicked")
        if (e.target.files) {
        setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        console.log("clicked")
        if (!file) return;
        console.log(file)
    }

    useEffect(() => {
        console.log(("sessionId" in sessionStorage))
        if (!("sessionId" in sessionStorage)) return;
        // check if user is logged in with a post request to the backend
        async function checkLoggedIn(){
            let result = await axios.post("http://localhost:5000/is-logged-in", {
                sessionId: sessionStorage["sessionId"]
            });

            console.log(result)
            if (result["data"]["message"] === "success") { 
                console.log('yes');
                setUser(result["data"]["user"]);
            }
                
        }
        
        checkLoggedIn();
        
    }, [])

    return(
        <div> 
            <h2>hi {user} </h2>
            <div>{file && `${file.name} - ${file.type}`}</div>

        

            <input type="file" id="newFile" onChange={(e) => handleFileChange(e)} />
            <button onClick={() => handleUploadClick()}>Upload</button>
        </div>
    )
}


export default Home;