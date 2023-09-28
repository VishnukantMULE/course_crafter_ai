import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <div>
        <button>
          <Link to="/login">Login</Link>
        </button>
        <button>
          <Link to="/registration">Sign Up</Link>
        </button>
      </div>
    </div>
  );
}
