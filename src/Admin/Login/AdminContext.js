import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    const storedToken = localStorage.getItem('adminToken');
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken && !adminToken) {
      setAdminToken(storedToken);
    }
  }, [adminToken]);

  const setToken = (token) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  const value = { adminToken, setToken, logout };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
