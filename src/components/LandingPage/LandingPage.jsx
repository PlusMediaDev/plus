import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LandingPage() {

  return (
    <>
      <button className='landing-page-button'>  
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