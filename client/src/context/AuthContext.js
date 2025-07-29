import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ token, userId: decoded.userId });
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log('Login response:', res.data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ token, userId: decoded.userId });
    } catch (err) {
      console.error('Login error:', err.message, err.response?.data);
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (username, email, password) => {
    try {
      console.log('Attempting signup with:', { username, email });
      const res = await axios.post('http://localhost:4000/api/auth/signup', { username, email, password });
      console.log('Signup response:', res.data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ token, userId: decoded.userId });
    } catch (err) {
      console.error('Signup error:', err.message, err.response?.data);
      throw new Error(err.response?.data?.message || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};