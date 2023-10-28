import React from 'react';
import { useParams } from 'react-router-dom';
import './style/EmailVerify.css';

export default function EmailVerify() {
  const { firstname } = useParams();

  return (
    <div className="email-verification-container">
      <div className="email-verification-card">
        <h2 className="company-name">Coursecrafter AI</h2>
        <div className="email-verification-content">
          <h2 className="greeting">Hello, {firstname}!</h2>
          <p className="verification-message">
            Thank you for registering with Coursecrafter. Please verify your email address to ensure the security of your account.
          </p>
          <p className="terms">
            <strong>Terms & Conditions:</strong> By verifying your email, you agree to our terms and conditions.
          </p>
        </div>
        <div className="login-button-container">
          <a href="/login" className="login-button">Login</a>
        </div>
      </div>
    </div>
  );
}
