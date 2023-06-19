import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tokensWon = useSelector((store) => store.tokenWon);
  const allReviews = useSelector((store) => store.allReviews);
  console.log('Here is allReviews', allReviews);

  useEffect(() => {
    dispatch({
      type: 'SAGA_GET_TOKENS_WON'
    });
    dispatch({
      type: 'SAGA_GET_TOTAL_REVIEWS'
    })
  }, []);

  const handleSwipeLeftToRight = () => {
    history.push('/landingPage');
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


  if (allReviews === null) {
    return (
      <p>Loading</p>
    );
  }

  const totalReviews = allReviews.ratingsNeeded;
  const currentReviews = allReviews.uploads[0]?.totalRatings;
  const reviewProgress = (currentReviews / totalReviews) * 100;

  const totalMatches = 50;
  const currentMatches = 3;
  const matchesProgress = (currentMatches / totalMatches) * 100;


  return (
    <div className="directions" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <h1>Account Page</h1>
      <p>Here are your tokens won: {tokensWon}</p>
      {/* Should not show any progress if they have not uploaded */}
      {reviewProgress < 100 ? (
        <>
          <p>Review Progress: {reviewProgress}%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${reviewProgress}%` }}></div>
          </div>
        </>
        // The reviewProgress gets a null, then it should go to automated stage 
      ) : (
        <>
          <p>Meme has been rated, please wait for the meme to be matched</p>
          <p>Automated Progress: {matchesProgress}%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${matchesProgress}%` }}></div>
          </div>
        </>
      )}
      {/* No more progress */}
      {/* Need a sentence that says the matching system has ended. Please check your tokens */}
      {/* Have a sentense that just says there is no progress */}
    </div>
  );
}

export default AccountPage;
