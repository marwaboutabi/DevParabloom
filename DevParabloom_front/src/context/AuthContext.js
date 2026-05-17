import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const res = await api.get('/auth/user');
          if (res.success) {
            setUser(res.data);
          }
        } catch (err) {
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });

      if (res.success) {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('para_user', JSON.stringify(res.data.user)); 
      setUser(res.data.user);
      setShowAuth(false);
      if (res.data.user.role === 'admin') {
        window.location.href = '/admin';
      }
      } else {
        setError(res.message || 'Erreur de connexion');
      }
    } catch (err) {
      setError(err.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/register', { name, email, password });

      if (res.success) {
        localStorage.setItem('auth_token', res.data.token);
        setUser(res.data.user);
        setShowAuth(false);
      } else {
        setError(res.message || "Erreur d'inscription");
      }
    } catch (err) {
      setError(err.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, logout,
      showAuth, setShowAuth, authMode, setAuthMode,
      loading, error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);