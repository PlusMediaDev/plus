import React from 'react';

import { useHistory } from 'react-router-dom';


function UploadPage() {

    const history = useHistory();

    return (
        <>
            <h1>Upload Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
        </>
    )
}

export default UploadPage;

