import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // You might want to validate the token here
      setUser({ role: 'Admin' }); // Mock user for now
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@foodiehub.com' && password === 'admin123') {
        const mockToken = 'mock-admin-token';
        localStorage.setItem('adminToken', mockToken);
        setToken(mockToken);
        setUser({ email, role: 'Admin' });
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};