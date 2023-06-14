import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState} from "react";

function ReviewPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const [buttonNumber, setButtonNumber] = useState(0);

  const handleButtonClick = (reviewNumber) => {
    setButtonNumber(reviewNumber);
    dispatch({
        type: 'SAGA_REVIEW_NUMBER',
        payload: buttonNumber
      });
    history.push("/Showcase");
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
  console.log('Here is the button number', buttonNumber);
  return (
    <div>
      <div>
        {renderButtons()}
      </div>
    </div>
  );
}

export default ReviewPage;
