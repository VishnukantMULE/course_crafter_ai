// AdminLogin.js
import React, { useState } from "react";
import "../style/AdminLogin.css";
import { useNavigate } from "react-router-dom";

import { useAdminContext } from "./AdminContext";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAdminContext();

  const handleLogin = () => {
    // Assuming your backend server is running on http://localhost:5000
    const apiUrl = "http://localhost:5000/admin/adminlogin";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Success:", data.message);
          setToken(data.token);
          console.log("Token Get is :" + data.token);

          navigate("/admindashboard");
        } else {
          console.error("Error:", data.message);
          setAlertMessage(data.message);
          setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="authbg">
      <div className="new-login-background new-admin-login">
        <h2 className="new-admin-login-title">Hello Sir ... </h2>
        <hr />
        <form>
          <label>
            ID:
            <input
              className="inputforadmin"
              type="text"
              placeholder="Enter Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              className="inputforadmin"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" className="buttonw" onClick={handleLogin}>
            Login
          </button>
          <hr />

          <button
            className=" buttonw new-alert-close-button"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>

          {/* Alert section */}
          {showAlert && (
            <div className="new-alert-container new-admin-alert">
              <p class="para">
                Unauthorized! Find the secret handshake or face the password
                fairy's magic! 🚪✨
              </p>

              <p className="new-alert-message">{alertMessage}</p>
              <button
                className="new-alert-close-button"
                onClick={() => setShowAlert(false)}
              >
                Close
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
