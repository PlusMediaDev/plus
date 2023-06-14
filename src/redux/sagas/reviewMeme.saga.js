import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* reviewMemes(action) {
    try {
      yield axios.post('/api/uploads/rating', action.payload);
    } catch (error) {
         console.log('Could not send the review number', error);
    }
  }

function* reviewMeme() {
    yield takeLatest('SAGA_REVIEW_NUMBER', reviewMemes);
}
  
  export default reviewMeme;