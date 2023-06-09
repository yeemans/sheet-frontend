import React, {useState} from "react";
function Upload() {
    const [fileType, setFileType] = useState(""); 
    function submitButton() { 
        if (fileType.type === "application/pdf")
            return <input type="submit" value="Upload Image" name="submit" />

        return 
    }
    return(
        <form action="http://localhost:5000/upload-sheet" method="POST" encType="multipart/form-data">
            Select music sheet(pdf) to upload:
            <input type="file" name="sheet" id="sheet" onChange={(e) => setFileType(e.target.files[0])}/>
            {submitButton()}
        </form>
    )
}

export default Upload;