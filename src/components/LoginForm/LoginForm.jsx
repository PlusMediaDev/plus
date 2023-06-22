import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm(props) {

  const username=props.username;
  const setUsername=props.setUsername
  const password=props.password
  const setPassword=props.setPassword
  
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>

      <h1 className='login-register-title'>Login</h1>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className='username-div'>

        <h4 className='username-h6'>Email</h4>

        <label htmlFor="username">

          <input
            className='username-password-textbox'
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <h4 className='username-h6'>Password</h4>

        <label htmlFor="password">

          <input
            className='username-password-textbox'
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn-login-register" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
