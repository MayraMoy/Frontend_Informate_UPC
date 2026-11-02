import React from 'react';
import { EditorContent } from '@tiptap/react';
import { useTiptapEditor } from '../hooks/useTiptapEditor';
import {
  EditorHeader,
  EditorToolbar,
  EditorPie,
} from './editor-noticia';
import '../styles/EditorNoticia.css';

const EditorNoticia = ({
  value = '',
  onChange,
  error = '',
  requerido = true,
}) => {
  const { editor, palabras, lectura, establecerEnlace } = useTiptapEditor({
    value,
    onChange,
  });

  if (!editor) return null;

  return (
    <div className={`editor-noticia ${error ? 'editor-noticia--con-error' : ''}`}>
      <EditorHeader
        requerido={requerido}
        lectura={lectura}
        palabras={palabras}
      />

      <div className="editor-noticia__contenedor-cuerpo">
        <EditorToolbar
          editor={editor}
          establecerEnlace={establecerEnlace}
        />
        <EditorContent editor={editor} />
      </div>

      <EditorPie error={error} />
    </div>
  );
};

export default EditorNoticia;
