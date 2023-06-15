import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

//Landing Page buttons:
import ShowcasePage from '../ShowcasePage/ShowcasePage'
import ReviewPage from '../ReviewPage/ReviewPage';
import DirectionsPage from '../DirectionsPage/DirectionsPage';
import AccountPage from '../AccountPage/AccountPage';

import './App.css';
import UploadPage from '../UploadPage/UploadPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>

      <div className='background-image'>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/landingPage" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /landing page
              <Redirect to="/landingPage" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/landingPage" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>



          <ProtectedRoute
            exact
            path="/landingPage"
          >
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/showcasePage"
          >
            <ShowcasePage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/reviewPage"
          >
            <ReviewPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/uploadPage"
          >
            <UploadPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/directionsPage"
          >
            <DirectionsPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/accountPage"
          >
            <AccountPage />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
