import React from 'react';
import { IconoAlerta } from '../IconosNoticia';

export const EditorPie = ({ error = '' }) => {
  return (
    <div className="editor-noticia__pie">
      {error && (
        <span className="crear-noticia__error" role="alert">
          <IconoAlerta />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};

export default EditorPie;

