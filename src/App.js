import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import UserDashboard from './components/Dashboard/UserDashboard';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Protect the UserDashboard route and its child routes */}
        <Route
          path="/dashboard/*"
          element={<UserDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
