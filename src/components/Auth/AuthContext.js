import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  const loginUser = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logoutUser = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userId, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
