
import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import universalCss from '../UniversalCss.css';
import { useSelector, useDispatch } from 'react-redux';
import plusLogo from '../../images/Plus-App-Prime-Client-Project-Sample-1.png';
import styles from "./Nav.module.css";


function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (

    <div className={`${styles["container"]} navContainer`}>

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <Link to="/accountPage">
            <img
              src="images/account-icon-white.png"
              alt="Account"
              className={styles["nav-icon"]}
            />
          </Link>
        </>
      )}

      <Link to="landingPage">
        <img
          src="images/plus-icon-white.png"
          alt="Home"
          className={styles["nav-icon"]}
        />
      </Link>

      {user.id && (
        <>
          <a onClick={() => dispatch({ type: "LOGOUT" })}>
            <img
              src="images/logout-icon-white-2.png"
              alt="Logout"
              className={styles["nav-icon"]}
            />
          </a>
        </>
      )}
    </div>
  );
}

export default Nav;
