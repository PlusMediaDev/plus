import React from 'react';

import { useHistory } from 'react-router-dom';


function ReviewPage() {

    const history = useHistory();

    return (
        <>
            <h1>Review Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
            <button onClick={() => {history.push("/showcasePage")}}> Showcase Button </button>
        </>
    )
}

export default ReviewPage;
