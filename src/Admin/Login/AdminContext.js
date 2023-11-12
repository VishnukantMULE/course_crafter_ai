// AdminContext.js
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);

  const setToken = (token) => {
    setAdminToken(token);
  };

  const logout = () => {
    setAdminToken(null);
  };

  const value = { adminToken, setToken, logout };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
