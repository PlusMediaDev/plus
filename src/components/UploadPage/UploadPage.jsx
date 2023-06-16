import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';{}


function UploadPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [media, setMedia] = useState(null);

    //Dispatch function for a SAGA to take user input media file and send it to AWS:
    function uploadMedia() {
        console.log('This is current state of media', media);
        dispatch({
            type: 'SAGA_UPLOAD',
            payload: {media: media}
        })
    }

    return (
        <>
            <h1 className='login-register-title'>Upload Page</h1>
            <form className='upload-form'>
                <input className='file-button' type="file" onChange={(event) => {setMedia(event.target.value)}} />
                <button className='upload-button' onClick={uploadMedia}>
                    Upload Media
                </button>
            </form>
            {/* <button onClick={() => {history.push("/landingPage")}}> Back Button </button> */}
        </>
    )
}

export default UploadPage;

