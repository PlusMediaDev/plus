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
      <>
        <h1 className='formBox yourtokensWonText'>Your Tokens Won!</h1>
        <p className='tokensWon'>{tokensWon}</p>
      </>
    );
  };

  /**
   * @param {number} progress
   */
  const showReviewProgress = (progress) => {
    return (
      <div className="formBox">
        <p className="progressLabel">Rating Stage: {progress}%</p>
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
      <div className="formBox">
        <p className="progressLabel">Automated Matching Stage: {progress}%</p>
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
        
          <h3 className='formBox'>No upload in progress {';('}</h3>
        
      );
    }
  };

  return (
    <div className="accountContainer" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      
      {showTokensWon()}
      {showProgress()}

    </div>
  );
}

export default AccountPage;
