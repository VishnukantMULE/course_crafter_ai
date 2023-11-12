import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import UserDashboard from './components/Dashboard/UserDashboard';
import CourseLanding from './components/Dashboard/Course/Learning/CourseLanding';
import CoursePage from './components/Dashboard/Course/Learning/CoursePage';
import EmailVerify from './components/Auth/EmailVerify';
import { AuthProvider } from './components/Auth/AuthContext';
import AuthRegister from './components/Auth/AuthRegister';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/course/:courseId" element={<CourseLanding />} />
          <Route path="/coursepage/:courseId" element={<CoursePage />} />
          <Route
            path="/dashboard/"
            element={<UserDashboard />}
          />
          <Route path='/verify/:firstname' element={<EmailVerify />} />
          <Route path='/authregister' element={<AuthRegister/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;
