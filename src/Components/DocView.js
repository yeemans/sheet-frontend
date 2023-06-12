import  React from 'react';

function DocView(props) {
    const url = "https://docs.google.com/viewerng/viewer?url=" + props.sheetUrl + "&embedded=true";
    return <iframe style={props.style} src={url}></iframe>
}

export default DocView;