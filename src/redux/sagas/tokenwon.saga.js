import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTokens() {
    try {
      const token = yield axios.get('/api/user/tokens');
      yield put({ type: 'TOKENS_WON', payload: token.data.tokens});
      console.log('Here is the number of tokens won', token.data.tokens);
    } catch (error) {
         console.log('User get request failed', error);
    }
  }
  
function* Tokens() {
    yield takeLatest('SAGA_GET_TOKENS_WON', getTokens);
  }
  
  export default Tokens;