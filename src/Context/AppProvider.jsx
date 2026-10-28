import { useState, useEffect } from 'react';
import AppContext from './AppContext';
import { obtenerSesionValida, limpiarCredencialesLocales } from '../utils/authStorage';

const AppProvider = ({ children }) => {
  // Estado global compartido con persistencia local validada contra expiración de token
  const [user, setUser] = useState(() => obtenerSesionValida());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleAuthLogout = () => {
      limpiarCredencialesLocales();
      setUser(null);
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, []);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
