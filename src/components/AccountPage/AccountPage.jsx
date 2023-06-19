import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tokensWon = useSelector((store) => store.tokenWon);
  const allReviews = useSelector((store) => store.allReviews);
  
  const totalReviews = 50; 
  const currentReviews = 10;

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

  const progress = (currentReviews / totalReviews) * 100;

  return (
    <div className="directions" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <h1>Account Page</h1>
      <p>Here are your tokens won: {tokensWon}</p>
      <p>Review Progress</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <span className="percentage">{`${progress.toFixed(0)}%`}</span>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
