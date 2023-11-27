import React, { useState, useEffect } from 'react';
import './Style/Profile.css'; // Import your external CSS file for styling
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../Auth/Loading';
import ProfilePng from './Style/ICONS/profile-user.png';
import editicon from './Course/Generator/style/ICONS/edit.png';
import logouticon from './Style/ICONS/logout.png';
import saveicon from './Style/ICONS/save-instagram.png';
import verifiedpng from './Style/ICONS/check.png';
import notverifiedpng from './Style/ICONS/decline.png';

export default function Profile() {
  const navigate = useNavigate();
  const { userId, logoutUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    // Fetch user profile data from the API endpoint using the userId from the context
    fetch(`https://coursecrafterai.onrender.com/user/profile`, {
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
    // Send a PUT request to update the user profile
    fetch(`https://coursecrafterai.onrender.com/user/updateprofile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        updatedUserData: editedData, // Send only the edited data
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user profile data: ', error);
      });
  };

  const handleLogout = () => {
    logoutUser();
    // Navigate to the home page after logout
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-heading">User Profile</h2>
        <div className="profile-photo-container">
          <img src={ProfilePng} alt="Profile" className="profile-photo" />
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-field">
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
        </div>
        <div className="profile-field">
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
        </div>
        <div className="profile-field">
          <strong>Email:</strong>{' '}
          {isEditing ? (
            <input
              type="email"
              value={editedData.email}
              onChange={(e) =>
                setEditedData({ ...editedData, email: e.target.value })
              }
              readOnly // Set the readOnly attribute when editing is true
            />
          ) : (
            <>
              {userData.email}{' '}
              {userData.verified ? (
                <span>
                  <img className='verificationimg' src={verifiedpng} alt="" />
                </span>
              ) : (
                <span>
                  <img className='verificationimg' src={notverifiedpng} alt="" />
                </span>
              )}
            </>
          )}
        </div>
        <div className="profile-field">
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
        </div>
        <div className="profile-field">
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
        </div>
        <div className="profile-field">
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
        </div>
        <div className="profile-field">
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
        </div>
      </div>
      <div className="profile-actions">
        {isEditing ? (
          <button className="orange-button" onClick={handleSave}>
            <img src={saveicon} alt="Save" />
            Save
          </button>
        ) : (
          <button className="orange-button" onClick={handleEdit}>
            <img src={editicon} alt="Edit" />
            Edit
          </button>
        )}
        <button className="orange-button" onClick={handleLogout}>
          <img src={logouticon} alt="Logout" />
          Logout
        </button>
      </div>
    </div>
  );
}
