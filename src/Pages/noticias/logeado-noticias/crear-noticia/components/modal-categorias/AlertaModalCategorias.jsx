import React from 'react';
import { IconoCheck, IconoAlerta } from '../IconosNoticia';

export const AlertaModalCategorias = ({ alerta }) => {
  if (!alerta) return null;

  return (
    <div
      className={`modal-categorias__alerta modal-categorias__alerta--${alerta.tipo}`}
      role="alert"
    >
      {alerta.tipo === 'exito' ? <IconoCheck /> : <IconoAlerta />}
      <span>{alerta.texto}</span>
    </div>
  );
};

export default AlertaModalCategorias;

