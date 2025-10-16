import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const login = async ({ email, password }) => {
    const res = await api.post('/users/login', { email, password });
    const { token: t, user: u } = res.data;
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    setToken(t);
    setUser(u);
    return u;
  };

  const register = async ({ email, password, name }) => {
    const res = await api.post('/users/register', { email, password, name });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = () => user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
