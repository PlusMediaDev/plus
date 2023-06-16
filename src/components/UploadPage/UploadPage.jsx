import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react'; import { debounce } from 'redux-saga/effects';
import { func } from 'prop-types';
{ }
import FormData from 'form-data';


function UploadPage() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [file, setFile] = useState();

    //Dispatch function for a SAGA to take user input media file and send it to AWS:

    function handleChange(event) {
        event.preventDefault();
        setFile(event.target.files[0])
    }
    // file.name
    function handleSubmit(event) {
        event.preventDefault();
        console.log('You are in handleSubmit function!');
        console.log('This is current state of file', file);
        const formData = new FormData();
        formData.append('uploaded_media', file, file.name);
        // formData.append('file', file.name);

        console.log('This is current state of formData', formData);
        dispatch({
            type: 'SAGA_UPLOAD_MEDIA',
            payload: formData
        })
    }

    return (
        <>
            <h1>Upload Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} />
                <button type="submit"> Upload Media </button>
            </form>
            <button onClick={() => { history.push("/landingPage") }}> Back Button </button>
        </>
    )
}

export default UploadPage;

