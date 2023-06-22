import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    
    <form className="formPanel" onSubmit={registerUser}>
      <h1 className='login-register-title'>Registration</h1>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>

      <h4 className='username-h6'>Email</h4>

        <label htmlFor="username">
          
          <input
            className='username-password-textbox'
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn-login-register" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
