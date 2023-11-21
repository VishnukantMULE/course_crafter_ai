import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAdminContext } from "../Login/AdminContext"; 
import { useNavigate } from "react-router-dom"; 
import "../style/AllUsers.css";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const { adminToken } = useAdminContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token Get is :"+adminToken)

    if (!adminToken) {
      navigate("/adminlogin");
      return;
    }

    axios
      .get("http://localhost:5000/allusers", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (error.response) {
          console.error('Server Error:', error.response.status);
        } else if (error.request) {
          console.error('Network Error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, [adminToken, navigate]);

  return (
    <div className="alluserclas">

    <div className="my-courses-container">
      <div className="user-cards-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3 className="usernamefl">{`${user.firstName} ${user.lastName}`}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Number of Courses: {user.courses.length}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
  );
}
