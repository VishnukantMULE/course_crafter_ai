import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useNavigate } from 'react-router-dom';
import './style/Register.css'; // Updated CSS file path
import CustomAlert from '../../services/CustomAlert';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Registration() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [organization, setOrganization] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();
  const [gender, setGender] = useState('male');



  const handleRegistration = () => {
    if (!firstName || !lastName || !phone || !email || !password || !dob || !organization || !course) {
      setAlertMessage('Please fill out all the fields.');
      setShowAlert(true);
      return;
    }
    setAlertMessage(  " If we are taking time, please wait because we are on a serverless platform, so it takes time to start the server from sleeping mode. ⏳🛠️ Thank you for your patience! 😊"
    )
    axios
      .post(`https://coursecrafterai.onrender.com/user/registration`, {
        firstName,
        lastName,
        phone,
        email,
        password,
        dob,
        organization,
        course,
      })
      .then((response) => {
        if (response.data.message === 'User was registered successfully!') {
          alert('Registration Successful');
        } else {
          alert('Registration Done : ' + response.data.message);
          navigate(`/verify/${firstName}`);
        }
      })
      .catch((error) => {
        if (error.response) {
          setAlertMessage('Registration Failed: ' + error.message);
          setShowAlert(true);
        } else if (error.request) {
          setAlertMessage('Registration Failed: Please Do After Some Time');
          setShowAlert(true);
        } else {
          setAlertMessage('Registration Failed:' + error.message);
          setShowAlert(true);
        }
      });
  };

  return (
    <div className='custom-login-background'>
      <div className='custom-navbare'>
        <h2 className='custom-navh2'>CourseCrafter AI</h2>
      </div>
      <div className='custom-container mt-5 custom-regis'>
        <div className='custom-row justify-content-center'>
          <div className='custom-col-md-6 p-4 rounded custom-register-container'>
          <h2 className='text-center mb-4 custom-heading-nav'>Register</h2>

            <div className='custom-mb-3'>
              {/* <label htmlFor='firstName' className='custom-form-label'> */}
                {/* First Name: */}
              {/* </label> */}
              <input placeholder="Enter Your First Name" type='text' id='firstName' className='custom-form-input' onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='lastName' className='custom-form-label'> */}
                {/* Last Name: */}
              {/* </label> */}
              <input placeholder="Enter Your Last Name" type='text' id='lastName' className='custom-form-input' onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='phone' className='custom-form-label'> */}
                {/* Phone Number: */}
              {/* </label> */}
              <PhoneInput international defaultCountry='IN' value={phone} onChange={(value) => setPhone(value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='gender' className='custom-form-label'> */}
                {/* Gender: */}
              {/* </label> */}
              <select  id='gender' className='custom-form-input' value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>

            

            <div className='custom-mb-3'>
              {/* <label htmlFor='email' className='custom-form-label'> */}
                {/* Email: */}
              {/* </label> */}
              <input placeholder='Enter the Email ID' type='email' id='email' className='custom-form-input' onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='password' className='custom-form-label'>
                Password:
              </label> */}
              <input placeholder='Enter the Password' type='password' id='password' className='custom-form-input' onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              <label htmlFor='dob' className='custom-form-label'>
                Date of Birth:
              </label>
              <input type='date' id='dob' className='custom-form-input' onChange={(e) => setDob(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='organization' className='custom-form-label'>
                Current Organization/University:
              </label> */}
              <input placeholder='Enter Organization name' type='text' id='organization' className='custom-form-input' onChange={(e) => setOrganization(e.target.value)} />
            </div>

            <div className='custom-mb-3'>
              {/* <label htmlFor='course' className='custom-form-label'>
                Current Course:
              </label> */}
              <input placeholder='Enter your current course' type='text' id='course' className='custom-form-input' onChange={(e) => setCourse(e.target.value)} />
            </div>

            <div className='custom-mb-3 d-flex justify-content-center'>
              <button className='custom-primary-button me-2' onClick={handleRegistration}>
                Register
              </button>
            </div>

            <div className='custom-glogin'>

              <p>
                Already have an account? Please <a href='/login'>Login</a>
              </p>
            </div>

            <div className='custom-glogin'>Or</div>
            <div className='custom-glogin'>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  let cr = jwtDecode(credentialResponse.credential);
                  let email = cr.email;
                  let fname = cr.name.split(' ').slice(0, -1).join(' ');
                  let lastName = cr.name.split(' ')[cr.name.split(' ').length - 1];
                  console.log('First Name :' + fname);
                  console.log('Last Name :' + lastName);
                  console.log('Email :' + email);
                  navigate(`/authregister?fname=${fname}&lname=${lastName}&email=${email}`);
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
      {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </div>
  );
}

export default Registration;
