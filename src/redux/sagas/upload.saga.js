import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// SAGA for handling uploads to AWS and storing the URL from AWS into our database.
function* uploadMedia(action) {
//   try {
//     // clear any existing error on the login page
//     // yield put({ type: 'CLEAR_LOGIN_ERROR' });

//     // const config = {
//     //   headers: { 'Content-Type': 'application/json' },
//     //   withCredentials: true,
//     // };

//     // Post media to ASW:
//     // yield axios.post('/api/user/upload', action.payload);


//     // Take the url response from AWS and post it to the database:
//     // yield put({ type: 'FETCH_USER' });
//   } catch (error) {
//     console.log('Error with uploading media:', error);
//   }
console.log("Hey I'm in the UPLOAD SAGA!");
}


function* uploadSaga() {
  yield takeLatest('SAGA_UPLOAD', uploadMedia);
}

export default uploadSaga;
