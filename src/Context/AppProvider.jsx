import { useState } from 'react';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  // Estado global compartido con persistencia local
  const [user, setUser] = useState(() => {
    try {
      const sesionGuardada = localStorage.getItem('usuarioSesion');
      return sesionGuardada ? JSON.parse(sesionGuardada) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

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
