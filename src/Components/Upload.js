import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"

function Upload() {
    const [fileType, setFileType] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => { 
        // if not logged in, send back to login page
        if (!("sessionId" in sessionStorage)) sessionStorage["sessionId"] = "None";
        // check if user is logged in with a post request to the backend
        async function checkLoggedIn(){
            let result = await axios.post("http://localhost:5000/is-logged-in", {
                sessionId: sessionStorage["sessionId"]
            });

            if (result["data"]["message"] !== "success") 
                navigate("/login", {state: {error: "Please log in before uploading sheet music."}})
        }        
        checkLoggedIn();
    }, [])

    function submitButton() { 
        if (fileType.type === "application/pdf")
            return <input type="submit" value="Upload Sheet" name="submit" />
        return 
    }

    function sheetInfo() { 
        if (fileType.type !== "application/pdf") return 
        return(
            <div> 
                <label htmlFor="composer">Composer</label>
                <input type="text" name="composer" id="composer"></input>
                <label htmlFor="instrument">Instrument</label>
                <input type="text" name="instrument" id="instrument"></input>
                <label htmlFor="bpm">BPM</label>
                <input type="number" name="bpm" id="bpm"></input>
            </div>
        )
    }

    return(
        <form action="http://localhost:5000/upload-sheet" method="POST" encType="multipart/form-data">
            Select music sheet(pdf) to upload:
            <input type="file" name="sheet" id="sheet" onChange={(e) => setFileType(e.target.files[0])}/>
            {sheetInfo()}
            {submitButton()}
        </form>
    )
}

export default Upload;