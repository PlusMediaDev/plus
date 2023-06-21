import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// SAGA for handling uploads to AWS and storing the URL from AWS into our database.
function* uploadMedia(action) {


  //function for getting files from sw3:


  try {
    console.log("formData ->", action.payload);
    const formData = action.payload;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    // Post media to ASW:
    const response = yield axios.post('api/uploads/', formData, config);

    // console.log("this is the response from the aws media post", response.data );

    //Once the media file is uploaded to S3, get the identifiying key for that file in the 
    //s3 bucket:
    // yield axios.get(`api/uploads/aws/${response.data}`);

  } catch (error) {
    console.log('Error with uploading media:', error);
  }
  console.log("Hey I'm in the UPLOAD SAGA!");
}


function* uploadSaga() {
  yield takeLatest('SAGA_UPLOAD_MEDIA', uploadMedia);
}

export default uploadSaga;
