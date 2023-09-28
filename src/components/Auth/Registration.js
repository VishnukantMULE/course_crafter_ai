import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleRegistration = () => {
    axios.post('http://localhost:3000/registration', { email, password })
      .then((response) => {
        if (response.data.message === "User was registered successfully!") {
          alert("Registration Successful");
        } else {
          alert("Registration Failed");
        }
      });
  };

  const handleGitHubRegistration = () => {
    loginWithRedirect({
      screen_hint: "signup",
      connection: "github",
    });
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <fieldset>
        <h2>Registration</h2>
        <br />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br></br>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleRegistration}>Registration</button>
        <br />
        <div>Already have an account? Please login</div>
        <button onClick={redirectToLogin}>Login</button>
        <br />
        {isAuthenticated && (
          <div>
            <button onClick={handleGitHubRegistration}>Continue with GitHub</button>
            <div>User: {user.name}</div>
            <div>Email: {user.email}</div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default Registration;
// http://localhost:3000/api/auth/callback/github