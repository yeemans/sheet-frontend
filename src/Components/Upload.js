import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"

function Upload() {
    const [title, setTitle] = useState("");
    const [fileType, setFileType] = useState(""); 
    const [composer, setComposer] = useState("");
    const [instrument, setInstrument] = useState("");
    const [bpm, setBpm] = useState("");
    const [userId, setUserId] = useState("");
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

            console.log(result)
            setUserId(result["data"]["userId"])
        }        
        checkLoggedIn();
    }, [])

    function randomSheetName(length) { 
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    async function submit() {
        let formData = new FormData();
        let sheet = document.getElementById("sheet").files[0];
        formData.append("sheet", sheet, randomSheetName(13) + ".pdf");

        console.log(formData);
        // post request the file, which returns an amazon s3 url
        // make another post request with the userId and s3_url to store a sheet document
        let result = await axios({
            method: "POST",
            url:"http://localhost:5000/upload-sheet",
            headers: { "content-type": "multipart/form-data" },
            data: formData, 
        })

        console.log(result);
        console.log(userId);
        if (result["data"]["message"] !== "success") return; 

        let fileUrl = result["data"]["s3_url"]
        result = await axios.post(("http://localhost:5000/upload-sheet"), { 
            "title": title,
            "sheet": fileUrl,
            "userId": userId,
            "composer": composer, 
            "instrument": instrument,
            "bpm": bpm, 
        })
        console.log(result)
    }

    function preventRefresh(e) { 
        e.preventDefault();
        console.log("refresh prevented");
    }

    function submitButton() { 
        if (fileType.type === "application/pdf")
            return <input type="button" value="Submit" onClick = {() => submit()}/>
        return 
    }

    function sheetInfo() { 
        if (fileType.type !== "application/pdf") return 
        return(
            <div> 
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)}></input>

                <label htmlFor="composer">Composer</label>
                <input type="text" id="composer" value={composer} onChange={e => setComposer(e.target.value)}></input>
               
                <label htmlFor="instrument">Instrument</label>
                <input type="text" id="instrument" value={instrument} onChange={e => setInstrument(e.target.value)}></input>
                
                <label htmlFor="bpm">BPM</label>
                <input type="number" id="bpm" value={bpm} onChange={e => setBpm(e.target.value)}></input>
            </div>
        )
    }

    return(
        <form action="http://localhost:5000/upload-sheet" onSubmit={() => preventRefresh()} 
            method="POST" encType="multipart/form-data">

            Select music sheet(pdf) to upload:
            <input type="file" name="sheet" id="sheet" onChange={(e) => setFileType(e.target.files[0])}/>
            {sheetInfo()}
            {submitButton()}
        </form>
    )
}

export default Upload;