import React from 'react';

import { useHistory } from 'react-router-dom';


function DirectionsPage() {

    const history = useHistory();

    return (
        <>
            <h1>Directions Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
        </>
    )
}

export default DirectionsPage;
