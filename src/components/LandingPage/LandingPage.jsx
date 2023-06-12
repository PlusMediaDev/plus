import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ShowcasePage from '../ShowcasePage/ShowcasePage'

function LandingPage() {

  const history = useHistory();

  return (
    <>
      <button className='landing-page-button' onClick={() => {history.push("/showcasePage")}}>  
        Showcase
      </button>

      <button className='landing-page-button' onClick={() => {history.push("/uploadPage")}}>  
        Upload
      </button>

      <button className='landing-page-button' onClick={() => {history.push("/directionsPage")}}>  
        Directions
      </button>

      <button className='landing-page-button' onClick={() => {history.push("/profilePage")}}>  
        Profile
      </button>
    </>
  )
}

export default LandingPage;