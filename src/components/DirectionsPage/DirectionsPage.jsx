import React from 'react';

import { useHistory } from 'react-router-dom';


function DirectionsPage() {

    const history = useHistory();
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
            <h1>Directions Page</h1>
        </div>
    )
}

export default DirectionsPage;
