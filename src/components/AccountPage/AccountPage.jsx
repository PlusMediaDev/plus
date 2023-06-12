import React from 'react';

import { useHistory } from 'react-router-dom';


function AccountPage() {

    const history = useHistory();

    return (
        <>
            <h1>Account Page</h1>
            <button onClick={() => {history.push("/landingPage")}}> Back Button </button>
        </>
    )
}

export default AccountPage;
