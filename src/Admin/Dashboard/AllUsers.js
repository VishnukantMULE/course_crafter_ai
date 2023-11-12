import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/AllUsers.css';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API endpoint
    axios.get('https://coursecrafterai.onrender.com/allusers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="my-courses-container">
      <div className="user-cards-container">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <h3 className='usernamefl'>{`${user.firstName} ${user.lastName}`}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Number of Courses: {user.courses.length}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
