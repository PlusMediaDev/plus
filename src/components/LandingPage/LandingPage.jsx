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

      <button className='landing-page-button'>  
        Upload
      </button>

      <button className='landing-page-button'>  
        Directions
      </button>

      <button className='landing-page-button'>  
        Profile
      </button>
    </>
  )
}

export default LandingPage;