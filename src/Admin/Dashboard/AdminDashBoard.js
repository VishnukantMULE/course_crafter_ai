import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AllCourses from './AllCourses';
import AllUsers from './AllUsers';
import { AdminProvider, useAdminContext } from '../Login/AdminContext';
import AdminLogin from '../Login/AdminLogin';

export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('allusers');
  const { adminToken } = useAdminContext();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Render the content only if the adminToken is present
  return (
    <AdminProvider>
      {adminToken ? (
        <div>
          <AdminNavbar onOptionChange={handleOptionChange} />
          {selectedOption === 'allusers' && <AllUsers />}
          {selectedOption === 'allcourses' && <AllCourses />}
        </div>
      ) : (
        <AdminLogin />
        // You can also use <Navigate to="/adminlogin" /> for redirection
      )}
    </AdminProvider>
  );
}
