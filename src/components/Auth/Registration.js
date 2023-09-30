import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style/Register.css'


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

  function redirectToLogin() {
    navigate('/login')
  }


  const handleRegistration = () => {
    axios.post('http://localhost:5000/users/registration', {
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
          alert("Registration Failed");
        }
      });
  };



  return (
    <div className="container">
    <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 p-4 rounded registration-form">
        <h2 className="text-center mb-4">Registration</h2>
        <div className='mb-3'>
          <label htmlFor="firstName" className='form-label'>First Name:</label>
          <input type="text" id="firstName" className='form-control' onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="lastName" className='form-label'>Last Name:</label>
          <input type="text" id="lastName" className='form-control' onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="phoneNumber" className='form-label'>Phone Number:</label>
          <input type="tel" id="phoneNumber" className='form-control' onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="email" className='form-label'>Email:</label>
          <input type="email" id="email" className='form-control' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="password" className='form-label'>Password:</label>
          <input type="password" id="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="dob" className='form-label'>Date of Birth:</label>
          <input type="date" id="dob" className='form-control' onChange={(e) => setDob(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="organization" className='form-label'>Current Organization/University:</label>
          <input type="text" id="organization" className='form-control' onChange={(e) => setOrganization(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label htmlFor="course" className='form-label'>Current Course:</label>
          <input type="text" id="course" className='form-control' onChange={(e) => setCourse(e.target.value)} />
        </div>

        <div className='mb-3 d-flex justify-content-center'>
          <button className='btn btn-primary me-2' onClick={handleRegistration}>Register</button>
          <button className='btn btn-secondary' onClick={redirectToLogin}>Login</button>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Registration;
