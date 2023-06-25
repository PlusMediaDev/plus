import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Nav.module.css";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <div className={styles["container"]}>
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
