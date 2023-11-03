import React, { useState, useEffect } from 'react';
import CreateCourse from './Course/CreateCourse';
import Notes from './Course/Notes';
import DashbordNav from './DashbordNav';
import Mycourses from './Course/Mycourses';
import CompletedCourse from './Course/CompletedCourse';
import Profile from './Profile';
import { useAuth } from '../Auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';



export default function UserDashboard() {
  const { userId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  const [selectedOption, setSelectedOption] = useState('create-course');
  // const userid = "653c2da36a955f89e0ec2897";
  useEffect(() => {
    if (location.state?.from === 'course-landing') {
      setSelectedOption('my-learning');
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);




  const renderComponent = () => {
    switch (selectedOption) {
      case 'create-course':
        return <CreateCourse userid={userId} />;
      case 'my-learning':
        return <Mycourses userid={userId} />;
      case 'completed-courses':
        return <CompletedCourse />;
      case 'notes':
        return <Notes />;
      case 'profile':
        return <Profile userid={userId} />;
      default:
        return <CreateCourse />;
    }
  };

  return (
    <div>
      <DashbordNav setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      <div className="content">{renderComponent()}</div>
    </div>
  );
}
