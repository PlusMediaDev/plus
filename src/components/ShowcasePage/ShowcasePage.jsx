import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ShowcasePage() {
  const dispatch = useDispatch();
  const randomMeme = useSelector((store) => store.memeStorage);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'SAGA_GET_A_RANDOM_MEME'
    });
  }, []);

  console.log("Random Meme", randomMeme);

  const handleSwipeUp = () => {
      history.push('/reviewPage');
  };

  const handleSwipeLeftToRight = () => {
    history.push('/landingPage');
  };

  let startY;
  let startX;


  const touchStart = (event) => {
    const touch = event.touches[0];
    startY = touch.clientY;
    startX = touch.clientX;
  };

  const touchEnd = (event) => {
    const touch = event.changedTouches[0];
    const deltaY = touch.clientY - startY;
    const deltaX = touch.clientX - startX;


    if (deltaY < -50) {
      handleSwipeUp();
    }

    if (deltaX > 50) {
      handleSwipeLeftToRight();
    }
  };

  return (
    <div
      className="memeName"
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
    >
      {<img src={randomMeme && randomMeme.contentUrl}/>}
    </div>
  );
}

export default ShowcasePage;
