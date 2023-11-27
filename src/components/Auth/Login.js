import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './style/Login.css';
import CustomAlert from '../../services/CustomAlert';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Loading from './Loading'
// import bgimage from '../Home/Images/Wallpaper/steptodown.com282175.jpg'

function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      setAlertMessage('Please fill out all the fields.');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setAlertMessage(" If we are taking time, please wait because we are on a serverless platform, so it takes time to start the server from sleeping mode. ⏳🛠️ Thank you for your patience! 😊");

    axios
      .post(`http://localhost:5000/user/login`, { email, password })
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
          errorMessage = `Login Failed: ${error.response.data.message}. ${error.response.data.reason}`;
        }
        console.error('Login error:', error);
        setAlertMessage(errorMessage);
        setShowAlert(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (

    <div className='custom-login-background' >

      <div className="custom-navbar">
        <h2 className='custom-nav-h2'>CourseCrafter AI</h2>
      </div>
      <div className='custom-container'>
        <div className='custom-row justify-content-center align-items-center min-vh-100'>
          <div className='custom-columns p-4 rounded custom-login-container'>
            <h2 className='text-center mb-4 custom-heading-nav'>Login</h2>
            <br />
            <div className='custom-mb-3'>
              <input
                type='text'
                className='custom-form-input'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='custom-mb-3'>
              <input
                type='password'
                className='custom-form-input'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='custom-mb-3 d-flex justify-content-center'>
              <button className='custom-primary-button me-2' onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="custom-glogin">
              <p>Don't have an account? Please <a href="/registration">Register</a></p>
            </div>
            <div className="custom-glogin">
              Or
            </div>
            <div className="custom-glogin">

              <GoogleLogin
                buttonText="continue_with"
                
                onSuccess={credentialResponse => {
                  const emailauth = jwtDecode(credentialResponse.credential);
                  const auth_email = emailauth.email;
                  console.log(emailauth.email);
                  setLoading(true);
                  axios
                    .post(`http://localhost:5000/user/authlogin`, { auth_email })
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
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
          <p className='sorrymessage'>If we are taking time, please wait because we are on a serverless platform, so it takes time to start the server from sleeping mode. ⏳🛠️ Thank you for your patience! 😊</p>
        </div>

      </div>
      {loading && <Loading />}
      {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </div>

  );
}

export default Login;
