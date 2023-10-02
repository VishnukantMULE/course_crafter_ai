import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './style/Login.css';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const login = () => {
    axios.post('http://localhost:3000/login', { email, password })
      .then((response) => {
        if (response.data.message === "Login Successful") {
          navigate('/dashboard');
        } else {
          alert("Login Failed");
        }
      });
  };

  const redirectToRegister = () => {
    navigate('/registration');
  };

  const loginWithGithub = () => {
    loginWithRedirect({
      connection: "github"
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 p-4 rounded login-form">
          <h2 className="text-center mb-4">Login</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex justify-content-center">
            <button className="btn btn-primary me-2" onClick={login}>
              Login
            </button>
            <button className="btn btn-secondary" onClick={redirectToRegister}>
              Sign Up
            </button>
          </div>
          <hr />
          <div className="text-center my-4">or</div>
          <div className="mb-3 d-flex justify-content-center">
            <button className="btn btn-dark" onClick={loginWithGithub}>
              Login with Github
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
