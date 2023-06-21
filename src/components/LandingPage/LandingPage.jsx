import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import ShowcasePage from '../ShowcasePage/ShowcasePage'

function LandingPage() {

  const history = useHistory();

  return (
    <div className='landing-page-css'>
      <button className='showcase-page-button' onClick={() => {history.push("/showcasePage")}}>  
        Showcase
      </button>

      <button className='upload-page-button' onClick={() => {history.push("/uploadPage")}}>  
        Upload
      </button>

      <button className='directions-page-button' onClick={() => {history.push("/directionsPage")}}>  
        Directions
      </button>

      <button className='account-page-button' onClick={() => {history.push("/accountPage")}}>  
        Account
      </button>
    </div>
  )
}

export default LandingPage;