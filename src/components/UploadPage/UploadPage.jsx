import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

 
 const handleSwipeLeftToRight = () => {
    history.push('/landingPage');
  };

  
  let startX;


  const touchStart = (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
  };

  const touchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;


    if (deltaX > 50) {
      handleSwipeLeftToRight();
    }
  };

    return (
        <div
        className="upload"
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        >
            <h1 className='login-register-title'>Upload Page</h1>
            <form className='upload-form' onSubmit={handleSubmit}>
                <input className='file-button' type="file" onChange={handleChange} />
                <button type="submit" className='upload-button'>
                    Upload Media
                </button>
            </form>
        </div>
    )
}

export default UploadPage;

