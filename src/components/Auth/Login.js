import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    axios.post('http://localhost:5000/login', { email, password })
      .then((response) => {
        if (response.data.message === 'Authentication successful') {
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
    <div className='balck-bg'>
      <div className='container '>
        <div className='row justify-content-center align-items-center min-vh-100'>
          <div className='col-md-6 p-4 rounded login-form'>
            <h2 className='text-center mb-4'>Login</h2>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control form-border '
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-3 d-flex justify-content-center'>
              <button className='btn btn-primary me-2' onClick={login}>
                Login
              </button>
              <button className='btn btn-secondary' onClick={redirectToRegister}>
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
