import { useState } from 'react';

const useSidebarMenu = () => {
  const [grupoAbierto, setGrupoAbierto] = useState(null);

  const alternarGrupo = (grupoId) => {
    setGrupoAbierto((actual) => (actual === grupoId ? null : grupoId));
  };

  return { grupoAbierto, alternarGrupo };
};

export default useSidebarMenu;
