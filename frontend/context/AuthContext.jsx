"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, register as apiRegister } from '../utils/auth'; // Asegúrate de que la ruta sea correcta

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el JWT o haz fetch al perfil del usuario
      setUser({ username: 'Usuario' }); // Aquí puedes hacer un fetch real
    }
    setLoading(false);
  }, []);

  const login = async (creds) => {
    const res = await apiLogin(creds);
    const { access_token } = res;
    localStorage.setItem('token', access_token);
    setUser({ username: creds.username });
    router.push('/tasks');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const register = async (creds) => {
    const res = await apiRegister(creds);
    const { access_token } = res;
    localStorage.setItem('token', access_token);
    setUser({ username: creds.username });
    router.push('/tasks');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;