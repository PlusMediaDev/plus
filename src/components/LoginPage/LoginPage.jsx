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
    <div>
      <LoginForm 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Create an Account
        </button>
      </center>
      <div className='auto-fill-div'>
          <button onClick={() => {setUsername("user1@gmail.com"); setPassword("123")}}>1</button>
          <button onClick={() => {setUsername("user2@hotmail.com"); setPassword("123")}}>2</button>
          <button onClick={() => {setUsername("user3@yahoo.com"); setPassword("123")}}>3</button>
      </div>
    </div>
  );
}

export default LoginPage;
