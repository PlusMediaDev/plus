import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* allReviews() {
    try {
      const reviews= yield axios.get('/api/uploads/rating/status');
      yield put({ type: 'TOTAL_REVIEWS', payload: reviews.data});
      console.log('Here is the total reviews for the meme I uploaded', reviews.data);
    } catch (error) {
         console.log('User get request failed', error);
    }
  }
  
function* totalReviews() {
    yield takeLatest('SAGA_GET_TOTAL_REVIEWS', allReviews);
  }
  
  export default totalReviews;