import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AccountPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const tokensWon = useSelector((store) => store.tokenWon);

   useEffect(() => {
    dispatch({
      type: 'SAGA_GET_TOKENS_WON'
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

  return (
      <div
      className="directions"
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}>
          <h1 className='login-register-title'>Account Page</h1>
          <p className='formPanelAccountPage' >Your Total Amount of Tokens!</p>
          <h1 className='tokensWon'>{tokensWon}</h1>
      </div>
  )
}

export default AccountPage;
