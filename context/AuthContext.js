// frontend/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  // On mount, check for token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Verify token with backend
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      })
      .then(res => {
        setIsLoggedIn(true);
        setUserData(res.data.user);
        setToken(storedToken);
      })
      .catch(err => {
        console.error(err);
        setIsLoggedIn(false);
        setUserData(null);
        setToken(null);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const handleLogin = (user, token) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUserData(user);
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      showLogin,
      setShowLogin,
      userData,
      handleLogin,
      handleLogout,
      token
    }}>
      {children}
    </AuthContext.Provider>
  );
};