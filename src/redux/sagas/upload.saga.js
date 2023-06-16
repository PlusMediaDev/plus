import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// SAGA for handling uploads to AWS and storing the URL from AWS into our database.
function* uploadMedia(action) {
  try {
    console.log("formData ->", action.payload);
    const formData = action.payload;
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    // Post media to ASW:
    yield axios.post('api/uploads/aws', formData, config);

    // Take the url response from AWS and post it to the database:
    // yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Error with uploading media:', error);
  }
  console.log("Hey I'm in the UPLOAD SAGA!");
}


function* uploadSaga() {
  yield takeLatest('SAGA_UPLOAD_MEDIA', uploadMedia);
}

export default uploadSaga;
