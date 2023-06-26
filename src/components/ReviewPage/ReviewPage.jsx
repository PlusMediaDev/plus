import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../UniversalCss.css';
import styles from "./ReviewPage.module.css";
import range from "../../utils/range";

function ReviewPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const randomMeme = useSelector((store) => store.memeStorage);
  const [ratings] = useState(range(10, 1));

  const showRatings = () => {
    return ratings.map((rating) => {
      let info = null;
      switch (rating) {
        case 10: {
          info = "Awesome!";
          break;
        }
        case 8: {
          info = "Nice!"
          break;
        }
        case 6: {
          info = "Ok";
          break;
        }
        case 3: {
          info = "Meh"
          break;
        }
        case 1: {
          info = "Awful";
          break;
        }
      }
      return (
        <div key={rating} className={styles["review"]}>
          <button
            onClick={() => handleButtonClick(rating)}
            className={styles["review-button"]}
          >
            {rating}
          </button>
          <p>{info}</p>
        </div>
      );
    });
  };

  function handleButtonClick(reviewNumber) {
    dispatch({
      type: "SAGA_REVIEW_NUMBER",
      payload: {
        rating: reviewNumber,
        id: randomMeme.id,
      },
    });
    history.push("/showcasePage");
  }

  const renderButtons = () => {
    const buttons = [];
    for (let i = 10; i > 0; i--) {
      buttons.push(
        <button
          className={styles["review-button"]}
          key={i}
          onClick={() => handleButtonClick(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (

    <div className={`${styles["container"]} reviewContainer`}>
      <div className={styles["ratings-container"]}>{showRatings()}</div>
    </div>
  );
}

export default ReviewPage;
