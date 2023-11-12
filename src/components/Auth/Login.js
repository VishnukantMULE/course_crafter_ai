import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './style/Login.css';
import CustomAlert from '../../services/CustomAlert';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      setAlertMessage('Please fill out all the fields.');
      setShowAlert(true);
      return;
    }
  
    axios
    .post(`https://coursecrafterai.onrender.com/login`, { email, password })
    .then((response) => {
      if (response.data.message === 'Authentication successful') {
        loginUser(response.data.userId);
        navigate('/dashboard');
      } else {
        setAlertMessage(`Login Failed: ${response.data.message}. ${response.data.reason}`);
        setShowAlert(true);
      }
    })
    .catch((error) => {
      let errorMessage = 'Login Failed: ' + error.message;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `Login Failed: ${error.response.data.message}. ${error.response.data.reason}`;
      }
      console.error('Login error:', error);
      setAlertMessage(errorMessage);
      setShowAlert(true);
    });
  
  };
  

  const redirectToRegister = () => {
    navigate('/registration');
  };

  return (
    <div className='login-background'>
      <div className="navbare">
        <h2 className='navh2'>CourseCrafter AI</h2>
      </div>
      <div className='container'>
        <div className='row justify-content-center align-items-center min-vh-100'>
          <div className='col-md-6 p-4 rounded login-container'>
            <h2 className='text-center mb-4 headingnav'>Login</h2>
            <br />
            {/* <h3
            <br /> className='text-center mb-4'>Login</h3> */}
            <div className='mb-3'>
              <input
                type='text'
                className='form-input'
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
            <div className="glogin">
              Or
            </div>
            <div className="glogin">

              <GoogleLogin
                onSuccess={credentialResponse => {
                  // navigate('/dashboard');

                  const emailauth=jwtDecode(credentialResponse.credential)
                  const auth_email=emailauth.email;
                  console.log(emailauth.email);
                  axios
                    .post(`https://coursecrafterai.onrender.com/authlogin`, { auth_email})
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
                      setAlertMessage('Login Failed: ' + error.message);
                      setShowAlert(true);
                    });
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}

    </div>
  );
}

export default Login;
