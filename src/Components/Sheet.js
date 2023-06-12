import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DocView from "./DocView.js"

function Sheet() { 
    const [title, setTitle] = useState("");
    const [sheetUrl, setSheetUrl] = useState("");
    const [composer, setComposer] = useState("");
    const [instrument, setInstrument] = useState("");
    const [bpm, setBpm] = useState("");
    let {sheetId} = useParams()

    useEffect(() => { 
        console.log(sheetId)
        async function getSheet() { 
            let result = await axios.post("http://localhost:5000/get-sheet", {
                sheetId: sheetId   
            })

            console.log(result);
            if (result["data"]["message"] === "success" && result["data"]["sheet"] != null) { 
                setTitle(result["data"]["sheet"]["title"])
                setSheetUrl(result["data"]["sheet"]["sheet"])
                setComposer(result["data"]["sheet"]["composer"])
                setInstrument(result["data"]["sheet"]["instrument"])
                setBpm(result["data"]["sheet"]["bpm"])
            }
        }

        getSheet()

    }, [])
    return( 
        <div class="columns"> 
            <div class="column"> 
                <DocView sheetUrl={sheetUrl} title="sheet" />
            </div>
            <div class="column"> 
                <p>Title: {title} </p>
                <p>Composer: {composer}</p>
                <p>Instrument: {instrument}</p>
                <p>Tempo: {bpm}</p>
            </div>

        </div>
    )
}

export default Sheet