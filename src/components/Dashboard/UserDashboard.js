import React, { useState } from 'react';
import CreateCourse from './Course/CreateCourse';
import Notes from './Course/Notes';
import DashbordNav from './DashbordNav';
import Mycourses from './Course/Mycourses';
import CompletedCourse from './Course/CompletedCourse';
import Profile from './Profile';
import { useAuth } from '../Auth/AuthContext';


export default function UserDashboard() {
  const { userId } = useAuth();

  const [selectedOption, setSelectedOption] = useState('create-course');
  // const userid = "653c2da36a955f89e0ec2897";

  const renderComponent = () => {
    switch (selectedOption) {
      case 'create-course':
        return <CreateCourse />;
      case 'my-learning':
        return <Mycourses userid={userId} />;
      case 'completed-courses':
        return <CompletedCourse />;
      case 'notes':
        return <Notes />;
      case 'profile':
        return <Profile userid={userId}/>;
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
