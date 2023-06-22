import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AccountPage.css";

function AccountPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tokensWon = useSelector((store) => store.tokenWon);
  const allReviews = useSelector((store) => store.allReviews);
  const allMatches = useSelector((store) => store.allMatches);

  const reviewProgress = useMemo(() => {
    if (!allReviews) {
      return null;
    }

    const lastUpload = allReviews.uploads[0] || null;
    if (!lastUpload) {
      return null;
    }

    return (lastUpload.totalRatings / allReviews.ratingsNeeded) * 100;
  }, [allReviews]);

  const matchProgress = useMemo(() => {
    if (!allMatches) {
      return null;
    }

    const lastUpload = allMatches.uploads[0] || null;
    if (!lastUpload) {
      return null;
    }

    return (lastUpload.totalMatches / allMatches.matchLimit) * 100;
  }, [allMatches]);

  useEffect(() => {
    dispatch({
      type: "SAGA_GET_TOKENS_WON",
    });
    dispatch({
      type: "SAGA_GET_TOTAL_REVIEWS",
    });
    dispatch({
      type: "SAGA_GET_TOTAL_MATCHES",
    });
  }, []);

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

  const showTokensWon = () => {
    return (
      <div>
        <h2>You've Won</h2>
        <h1>{tokensWon}</h1>
        <h2>Tokens!</h2>
      </div>
    );
  };

  /**
   * @param {number} progress
   */
  const showReviewProgress = (progress) => {
    return (
      <div>
        <p>Review Progress: {progress}%</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  /**
   * @param {number} progress
   */
  const showMatchProgress = (progress) => {
    return (
      <div>
        <p>Automated Progress: {progress}%</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  const showProgress = () => {
    if (matchProgress !== null) {
      return showMatchProgress(matchProgress);
    } else if (reviewProgress !== null) {
      return showReviewProgress(reviewProgress);
    } else {
      return (
        <div>
          <p>
            Looks like you don't have any in-progress uploads. Make one if you
            haven't already today!
          </p>
        </div>
      );
    }
  };

  return (
    <div className="directions" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <h1>Account Page</h1>
      <p>Here are your tokens won: {tokensWon}</p>
      {showTokensWon()}
      {showProgress()}
    </div>
  );
}

export default AccountPage;
