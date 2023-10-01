import React, { useState } from 'react';
import CreateCourse from './Course/CreateCourse';

import Notes from './Course/Notes';
import DashbordNav from './DashbordNav';
import Mycourses from './Course/Mycourses';
import CompletedCourse from './Course/CompletedCourse';

export default function UserDashboard() {
  const [selectedOption, setSelectedOption] = useState('create-course');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'create-course':
        return <CreateCourse />;
      case 'my-learning':
        return <Mycourses />;
      case 'completed-courses':
        return <CompletedCourse />;
      case 'notes':
        return <Notes />;
      default:
        return <CreateCourse />; // Default to CreateCourse if option not recognized
    }
  };

  return (
    <div>
      <DashbordNav setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      <div className="content">{renderComponent()}</div>
    </div>
  );
}
