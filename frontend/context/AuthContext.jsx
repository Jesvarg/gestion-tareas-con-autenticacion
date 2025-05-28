"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, register as apiRegister } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/validate', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Token inválido');
        }
        return response.json();
      })
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error de autenticación:', error);
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [router]);

  const login = async (creds) => {
    try {
      const response = await apiLogin(creds);
      const { access_token, user } = response;
      localStorage.setItem('token', access_token);
      setUser(user);
      router.push('/tasks');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const register = async (creds) => {
    try {
      const response = await apiRegister(creds);
      const { access_token, user } = response;
      localStorage.setItem('token', access_token);
      setUser(user);
      router.push('/tasks');
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return context;
};
