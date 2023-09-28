import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const Client_Id="b04aca659fdf2f798ab7096009a8a8291f736aca";
  const Client_Id="29cdd8d66bee20aae31e";

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
  function loginwithgithub()
  {
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+Client_Id);
  }

  return (
    <div>
      <fieldset>

      <h2>Login</h2>
      <br />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
      <br />
      <div>Dont have an account please signup</div>
      <button onClick={redirectToRegister}>Sign Up</button>
      <hr />
      <br />
      <div>or</div>
      <br />
      <button  onClick={loginwithgithub}>Login with Github</button>
      </fieldset>

    </div>
  );
}

export default Login;
