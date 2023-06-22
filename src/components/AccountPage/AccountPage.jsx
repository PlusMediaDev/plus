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
  const allMatches = useSelector((store) => store.allMatches);
  console.log('Here is allMatches', allMatches);


  useEffect(() => {
    dispatch({
      type: 'SAGA_GET_TOKENS_WON'
    });
    dispatch({
      type: 'SAGA_GET_TOTAL_REVIEWS'
    });
    dispatch({
      type: 'SAGA_GET_TOTAL_MATCHES'
    });
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

  if (allReviews === null || !allReviews.uploads || allReviews.uploads.length === 0) {
    return (
      <>
      <h1 className='formPanelPages'>Your Tokens You Won!</h1>
          <p className='tokensWon'>{tokensWon}</p>
      <h3 className='formPanelPages'>No upload in progress {';('}</h3>
      </>
    );
  }

  const totalReviews = allReviews.ratingsNeeded;
  const currentReviews = allReviews.uploads[0]?.totalRatings;
  const reviewProgress = (currentReviews / totalReviews) * 100;

  const totalMatches = allMatches.matchLimit;
  const currentMatches = allMatches.uploads[0]?.totalMatches;
  const matchesProgress = (currentMatches / totalMatches) * 100;

  return (

    <div className="directions" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <h1>Account Page</h1>
      {allReviews && reviewProgress < 100 ? (
        <>
          <p>Your Tokens You Won!</p>
          <p>{tokensWon}</p>
          <p>Review Progress: {reviewProgress}%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${reviewProgress}%` }}></div>
          </div>
        </>
      ) : (
        <>
          {allReviews && reviewProgress === 100 && matchesProgress < 100 ? (
            <>
              <p>Your Tokens You Won!</p>
              <p> {tokensWon}</p>
              <p>Meme has been rated, please wait for the meme to be matched</p>
              <p>Automated Progress: {matchesProgress}%</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${matchesProgress}%` }}></div>
              </div>
            </>
          ) : (
            <>
            <p>Your Tokens You Won!</p>
            <p>{tokensWon}</p>
            <p>No upload in progress</p>
            </>
          )}
        </>
      )}
    </div>
  );

}

export default AccountPage;

