import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* meme() {
    try {
      const randomMeme = yield axios.get('/api/uploads/rating/random');
      yield put({ type: 'RANDOM_MEME', payload: randomMeme.data.data});
      console.log('Here is the Random Meme', randomMeme);
    } catch (error) {
         console.log('User get request failed', error);
    }
  }
  
function* Showcase() {
    yield takeLatest('SAGA_GET_A_RANDOM_MEME', meme);
  }
  
  export default Showcase;