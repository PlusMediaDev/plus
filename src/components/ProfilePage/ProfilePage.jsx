import React from 'react';

import { useHistory } from 'react-router-dom';


function ProfilePage() {

    const history = useHistory();

    return (
        <>
            <h1>Profile Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
        </>
    )
}

export default ProfilePage;
