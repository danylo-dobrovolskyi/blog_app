'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const { data } = await axios.post(
        `http://localhost:1337/api/auth/local`,
        {
          identifier,
          password,
        },
      );
      setUser(data.user);
      localStorage.setItem('authToken', data.jwt);
    } catch (error) {
      console.error(
        error.response ? error.response.data : error,
      );
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
