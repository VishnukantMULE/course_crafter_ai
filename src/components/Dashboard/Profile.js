import React, { useState, useEffect } from 'react';
import './Style/Profile.css'; // Import your external CSS file for styling
import { useAuth } from '../Auth/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate(); // Access the navigate function
  const { userId, logoutUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const handleLogout = () => {
    logoutUser();
    // Navigate to the home page after logout
    navigate('/');
  };

  useEffect(() => {
    // Fetch user profile data from the API endpoint using the userId from the context
    fetch(`https://coursecrafterai.onrender.com/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    .then((response) => response.json())
    .then((data) => {
      setUserData(data.user);
      setEditedData(data.user); // Initialize editedData with the user's data

      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching user profile data: ', error);
      setLoading(false);
    });
  }, [userId]);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save the edited data here, for example, send it to the server
    setIsEditing(false);
  };
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="your-profile-photo-url.jpg"
          alt="Profile"
          className="profile-photo"
        />
        <h2 className="profile-heading">User Profile</h2>
      </div>
      <ul className="profile-list">
        <li>
          <strong>First Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={editedData.firstName}
              onChange={(e) =>
                setEditedData({ ...editedData, firstName: e.target.value })
              }
            />
          ) : (
            userData.firstName
          )}
        </li>
        <li>
          <strong>Last Name:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={editedData.lastName}
              onChange={(e) =>
                setEditedData({ ...editedData, lastName: e.target.value })
              }
            />
          ) : (
            userData.lastName
          )}
        </li>
        <li>
          <strong>Email:</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              value={editedData.email}
              onChange={(e) =>
                setEditedData({ ...editedData, email: e.target.value })
              }
            />
          ) : (
            userData.email
          )}
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={editedData.phone}
              onChange={(e) =>
                setEditedData({ ...editedData, phone: e.target.value })
              }
            />
          ) : (
            userData.phone
          )}
        </li>
        <li>
          <strong>Date of Birth:</strong>{' '}
          {isEditing ? (
            <input
              type="date"
              value={editedData.dob}
              onChange={(e) =>
                setEditedData({ ...editedData, dob: e.target.value })
              }
            />
          ) : (
            userData.dob
          )}
        </li>
        <li>
          <strong>Organization:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={editedData.organization}
              onChange={(e) =>
                setEditedData({ ...editedData, organization: e.target.value })
              }
            />
          ) : (
            userData.organization
          )}
        </li>
        <li>
          <strong>Course:</strong>{' '}
          {isEditing ? (
            <input
              type="text"
              value={editedData.course}
              onChange={(e) =>
                setEditedData({ ...editedData, course: e.target.value })
              }
            />
          ) : (
            userData.course
          )}
        </li>
      </ul>
      <div className="profile-actions">
        {isEditing ? (
          <button className="orange-button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="orange-button" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="orange-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}