import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import UserDashboard from './components/Dashboard/UserDashboard';


function App() {





  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard/*"
          element={<UserDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
