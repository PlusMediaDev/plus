import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">



      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <Link className="navLinkProfile" to="/accountPage">
            ☃️
          </Link>
        </>
      )}

      <Link to="/landingPage">
        <h2 className="nav-title">✚</h2>
      </Link>

      {user.id && (
        <>
          <LogOutButton className="navLinkLogOut" />
        </>
      )}
      


    </div>
  );
}

export default Nav;
