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
    <div className="directionsConatiner" onTouchStart={touchStart} onTouchEnd={touchEnd}>
      <div className='formBox'>
        <h1>About Plus</h1>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quas culpa, ipsa expedita porro ut aliquid quasi a magni voluptates, modi rem sunt ducimus inventore ex nobis. Quasi, repellendus voluptas.</h3>
        <h2>How to play: </h2>
        <h3>- Be nice <br /> - Put out funny memes <br /> - Rate funny memes </h3>
        <h2>Privacy Policy:</h2>
        <h3>provided by client</h3>

      </div>
    </div>
  )
}

export default DirectionsPage;
