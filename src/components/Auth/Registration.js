import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/Register.css';

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [organization, setOrganization] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const [gender, setGender] = useState("male"); // Default value for gender
  const [languages, setLanguages] = useState([]);

  function redirectToLogin() {
    navigate('/login');
  }

  const handleLanguageChange = (language) => {
    if (languages.includes(language)) {
      // Remove language if it already exists in the array
      setLanguages(languages.filter((lang) => lang !== language));
    } else {
      // Add language to the array
      setLanguages([...languages, language]);
    }
  };

  const handleRegistration = () => {
    axios.post(`${process.env.URL}/registration`, {
      firstName,
      lastName,
      phone,
      email,
      password,
      dob,
      organization,
      course
    })
    .then((response) => {
      if (response.data.message === "User was registered successfully!") {
        alert("Registration Successful");
      } else {
        alert("Registration Done : " + response.data.message);
        navigate(`/verify/${firstName}`);
      }
    })
    .catch((error) => {
      if (error.response) {
        alert("Registration Failed1: " + error.response.data.message);
      } else if (error.request) {
        alert("Registration Failed: No response from the server");
      } else {
        alert("Registration Failed2: " + error.message);
      }
    });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6 col-lg-4'>
          <div className='registration-container'>
            <h2 className='text-center mb-4'>Register with CourseCrafter</h2>
            <div className='mb-3'>
              <label htmlFor='firstName' className='form-label'>First Name:</label>
              <input type='text' id='firstName' className='form-input' onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='lastName' className='form-label'>Last Name:</label>
              <input type='text' id='lastName' className='form-input' onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='phoneNumber' className='form-label'>Phone Number:</label>
              <input type='tel' id='phoneNumber' className='form-input' onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className='mb-3'>
        <label htmlFor='gender' className='form-label'>Gender:</label>
        <select id='gender' className='form-input' value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Languages Spoken:</label>
        <div className='checkbox-group'>
          <div className='checkbox-label'>
            <input
              type='checkbox'
              id='english'
              className='checkbox-input'
              checked={languages.includes('English')}
              onChange={() => handleLanguageChange('English')}
            />
            <label htmlFor='english'>English</label>
          </div>
          <div className='checkbox-label'>
            <input
              type='checkbox'
              id='Hindi'
              className='checkbox-input'
              checked={languages.includes('Hindi')}
              onChange={() => handleLanguageChange('Hindi')}
            />
            <label htmlFor='Hindi'>Hindi</label>
          </div>
          <div className='checkbox-label'>
            <input
              type='checkbox'
              id='Marathi'
              className='checkbox-input'
              checked={languages.includes('Marathi')}
              onChange={() => handleLanguageChange('Marathi')}
            />
            <label htmlFor='Marathi'>Marathi</label>
          </div>
          {/* Add more languages as needed */}
        </div>
      </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input type='email' id='email' className='form-input' onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password:</label>
              <input type='password' id='password' className='form-input' onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='dob' className='form-label'>Date of Birth:</label>
              <input type='date' id='dob' className='form-input' onChange={(e) => setDob(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='organization' className='form-label'>Current Organization/University:</label>
              <input type='text' id='organization' className='form-input' onChange={(e) => setOrganization(e.target.value)} />
            </div>

            <div className='mb-3'>
              <label htmlFor='course' className='form-label'>Current Course:</label>
              <input type='text' id='course' className='form-input' onChange={(e) => setCourse(e.target.value)} />
            </div>

            <div className='mb-3 d-flex justify-content-center'>
              <button className='primary-button me-2' onClick={handleRegistration}>Register</button>
              <button className='secondary-button' onClick={redirectToLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
