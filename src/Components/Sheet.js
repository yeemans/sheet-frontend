import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";

function Sheet() { 
    const [sheet, setSheet] = useState();
    let {sheetId} = useParams()

    useEffect(() => { 
        const url = new URL(window.location.href); 
        const getParam = url.searchParams.get("sheetId"); 

        console.log("GETPARAMS: " + sheetId) 

    }, [])
    return( 
        <div> 
            <h1>hello sheet</h1>
        </div>
    )
}

export default Sheet