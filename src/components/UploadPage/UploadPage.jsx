import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormData from "form-data";
import axios from "axios";

function UploadPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // const canUpload = true; //This is a true or false boolean value:
  const canUpload = useSelector((store) => store.canUpload);

  const [file, setFile] = useState();

  useEffect(() => {
    dispatch({
      type: "SAGA_GET_CAN_UPLOAD",
    });
  }, []);

  //Dispatch function for a SAGA to take user input media file and send it to AWS:
  function handleChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }
  // file.name
  function handleSubmit(event) {
    event.preventDefault();
    console.log("You are in handleSubmit function!");
    console.log("This is current state of file", file);
    const formData = new FormData();
    formData.append("uploaded_media", file, file.name);
    // formData.append('file', file.name);

    console.log("This is current state of formData", formData);
    dispatch({
      type: "SAGA_UPLOAD_MEDIA",
      payload: formData,
    });
  }

  //Conditionally render DOM based on 'canUpload' const:
  //If user hasn't hit their 1 upload per day limit, the upload
  //form will render. Otherwise if they have hit their daily limit,
  //an H1 element will be rendered instead -saying that the user has
  //reached thier uloading limit for the day.
  function canUploadCondtionalRender() {
    if (canUpload) {
      return (
          <form className="formBox" onSubmit={handleSubmit} >
            <input className="file-button" type="file" onChange={handleChange} />
            <button type="submit" className="upload-button">
              Upload Media
            </button>
          </form>
      );
    } else {
      return (
        <div className="formBox">
          <h1 className="uploadLimitReachedH1"> Daily upload limit of (1) reached </h1>
        </div>
      );
    }
  }

  const handleSwipeLeftToRight = () => {
    history.push("/landingPage");
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
    <div className="uploadContianer" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      {canUploadCondtionalRender()}
    </div>
  );
}

export default UploadPage;
