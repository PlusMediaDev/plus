import React from 'react';

import { useHistory } from 'react-router-dom';


function ShowcasePage() {

    const history = useHistory();

    return (
        <>
            <h1>Showcase Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
            <button onClick={() => {history.push("/reviewPage")}}> Review Button </button>
        </>
    )
}

export default ShowcasePage;

