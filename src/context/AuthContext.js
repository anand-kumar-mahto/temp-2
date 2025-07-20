import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Optionally, fetch user info here
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  const register = async (email, password, name, is_store_owner) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/auth/register', { email, password, name, is_store_owner });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout, register, loading, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 