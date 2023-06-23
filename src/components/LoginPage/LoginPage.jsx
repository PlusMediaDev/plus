import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const history = useHistory();

  //Use states:
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='loginContainer'>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />


        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Create an Account
        </button>
   
      <div className='auto-fill-div'>
        <button className='auto-fill-btn' onClick={() => { setUsername("email1"); setPassword("123!") }}>1</button>
        <button className='auto-fill-btn' onClick={() => { setUsername("email2"); setPassword("123!") }}>2</button>
      </div>
    </div>
  );
}

export default LoginPage;
