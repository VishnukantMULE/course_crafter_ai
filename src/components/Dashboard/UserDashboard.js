import React, { useState } from 'react';
import CreateCourse from './Course/CreateCourse';

import Notes from './Course/Notes';
import DashbordNav from './DashbordNav';
import Mycourses from './Course/Mycourses';
import CompletedCourse from './Course/CompletedCourse';


export default function UserDashboard() {
  const [selectedOption, setSelectedOption] = useState('create-course');
  const userid="651875acb5b131e72e7673ba";

  const renderComponent = () => {
    switch (selectedOption) {
      case 'create-course':
        return <CreateCourse />;
      case 'my-learning':
        return <Mycourses userid={userid}/>;
      case 'completed-courses':
        return <CompletedCourse />;
      case 'notes':
        return <Notes />;
      default:
        return <CreateCourse />;
    }
  };

  return (
    <div>
      <DashbordNav setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
      <div className="content">{ renderComponent()}</div>
    </div>
  );
}
