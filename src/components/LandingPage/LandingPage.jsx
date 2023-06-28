import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../UniversalCss.css';
import ShowcasePage from '../ShowcasePage/ShowcasePage'

function LandingPage() {

  const history = useHistory();

  return (
    <div className='landingPageContainer'>
      <button className='landingPageButton' onClick={() => {history.push("/showcasePage")}}>  
        Showcase
      </button>

      <button className='landingPageButton'onClick={() => {history.push("/uploadPage")}}>  
        Upload
      </button>

      <button className='landingPageButton' onClick={() => {history.push("/directionsPage")}}>  
        Directions
      </button>

      <button className='landingPageButton' onClick={() => {history.push("/accountPage")}}>  
        Account
      </button>
    </div>
  )
}

export default LandingPage;