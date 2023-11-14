// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { userId } = useAuth();

  return userId ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
