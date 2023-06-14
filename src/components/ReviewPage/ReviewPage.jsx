import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ReviewPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const randomMeme = useSelector((store) => store.memeStorage);


  function handleButtonClick (reviewNumber) {
    dispatch({
        type: 'SAGA_REVIEW_NUMBER',
        payload: {
          rating: reviewNumber,
          id: randomMeme.id
        }
      });
    history.push('/showcasePage');

  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 10; i++) {
      buttons.push(
        <button key={i} onClick={() => handleButtonClick(i)}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <div>
        {renderButtons()}
      </div>
    </div>
  );
}

export default ReviewPage;
