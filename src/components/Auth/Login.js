import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

import './style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Access loginUser function from useAuth hook


  const handleLogin = () => {
    axios.post(`https://coursecrafterai.onrender.com/login`, { email, password })
      .then((response) => {
        if (response.data.message === 'Authentication successful') {
          loginUser(response.data.userId);

          navigate('/dashboard');
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        alert('Login Failed. Please try again.');
      });
  };

  const redirectToRegister = () => {
    navigate('/registration');
  };

  return (
    <div className='black-background'>
      <div className='container'>
        <div className='row justify-content-center align-items-center min-vh-100'>
          <div className='col-md-6 p-4 rounded login-form-container'>
            <h2 className='text-center mb-4'>Login</h2>
            <div className='mb-3'>
              <input
                type='text'
                className='form-input form-border '
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                className='form-input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3 d-flex justify-content-center'>
              <button className='primary-button me-2' onClick={handleLogin}>
                Login
              </button>
              <button className='secondary-button' onClick={redirectToRegister}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
