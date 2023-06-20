import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* allMatches() {
    try {
      const matches= yield axios.get('/api/uploads/matching/status');
      yield put({ type: 'TOTAL_MATCHES', payload: matches.data});
      console.log('Here is the total reviews for the meme I uploaded', matches.data);
    } catch (error) {
         console.log('User get request failed', error);
    }
  }
  
function* totalMatches() {
    yield takeLatest('SAGA_GET_TOTAL_MATCHES', allMatches);
  }
  
  export default totalMatches;