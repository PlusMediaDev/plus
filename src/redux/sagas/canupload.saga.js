import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* saga() {
  try {
    const response = yield axios.get("/api/user/can-upload");
    console.log("Can upload response:", response.data)
    yield put({ type: "SET_CAN_UPLOAD", payload: response.data.canUpload });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* canUpload() {
  yield takeLatest("SAGA_GET_CAN_UPLOAD", saga);
}

export default canUpload;
