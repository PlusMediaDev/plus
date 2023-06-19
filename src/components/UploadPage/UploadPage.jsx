import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


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
            <form className='upload-form'>
                <input className='file-button' type="file" onChange={(event) => {setMedia(event.target.value)}} />
                <button className='upload-button' onClick={uploadMedia}>
                    Upload Media
                </button>
            </form>
        </div>

    )
}

export default UploadPage;

