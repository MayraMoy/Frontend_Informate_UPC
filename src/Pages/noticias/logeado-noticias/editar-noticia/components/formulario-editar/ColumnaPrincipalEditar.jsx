import React from 'react';
import CampoTexto from '../../../crear-noticia/components/CampoTexto';
import EditorNoticia from '../../../crear-noticia/components/EditorNoticia';
import { LIMITES_EDICION } from '../../data/editarNoticiaData';

export const ColumnaPrincipalEditar = ({
  titulo,
  cuerpo,
  errores = {},
  onChangeTitulo,
  onChangeCuerpo,
}) => {
  return (
    <div className="crear-noticia__columna-principal">
      <div className="crear-noticia__card-panel">
        <CampoTexto
          id="titulo"
          label="Título de la noticia"
          value={titulo}
          onChange={(e) => onChangeTitulo(e.target.value)}
          error={errores.titulo}
          maxLength={LIMITES_EDICION.titulo}
          placeholder="Ingresá un título descriptivo y claro"
          requerido
        />

        <EditorNoticia
          value={cuerpo}
          onChange={onChangeCuerpo}
          error={errores.cuerpo}
          requerido
        />
      </div>
    </div>
  );
};

export default ColumnaPrincipalEditar;

