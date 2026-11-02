import React from 'react';
import { BotonHerramienta } from './BotonHerramienta';
import {
  IconoBold,
  IconoItalic,
  IconoH2,
  IconoH3,
  IconoBulletList,
  IconoOrderedList,
  IconoLink,
  IconoAlignLeft,
  IconoAlignCenter,
  IconoAlignRight,
  IconoUndo,
  IconoRedo,
} from '../IconosNoticia';

export const EditorToolbar = ({ editor, establecerEnlace }) => {
  if (!editor) return null;

  return (
    <div
      className="editor-noticia__barra"
      role="toolbar"
      aria-label="Herramientas de formato de texto"
    >
      {/* 1. Formato de texto básico */}
      <div className="editor-noticia__grupo">
        <BotonHerramienta
          icono={<IconoBold />}
          accion={() => editor.chain().focus().toggleBold().run()}
          activo={editor.isActive('bold')}
          deshabilitado={!editor.can().chain().focus().toggleBold().run()}
          titulo="Negrita (Ctrl+B)"
        />
        <BotonHerramienta
          icono={<IconoItalic />}
          accion={() => editor.chain().focus().toggleItalic().run()}
          activo={editor.isActive('italic')}
          deshabilitado={!editor.can().chain().focus().toggleItalic().run()}
          titulo="Cursiva (Ctrl+I)"
        />
      </div>

      <span className="editor-noticia__separador" aria-hidden="true" />

      {/* 2. Encabezados */}
      <div className="editor-noticia__grupo">
        <BotonHerramienta
          icono={<IconoH2 />}
          accion={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          activo={editor.isActive('heading', { level: 2 })}
          titulo="Título principal (H2)"
        />
        <BotonHerramienta
          icono={<IconoH3 />}
          accion={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          activo={editor.isActive('heading', { level: 3 })}
          titulo="Subtítulo (H3)"
        />
      </div>

      <span className="editor-noticia__separador" aria-hidden="true" />

      {/* 3. Listas y enlaces */}
      <div className="editor-noticia__grupo">
        <BotonHerramienta
          icono={<IconoBulletList />}
          accion={() => editor.chain().focus().toggleBulletList().run()}
          activo={editor.isActive('bulletList')}
          titulo="Lista con viñetas"
        />
        <BotonHerramienta
          icono={<IconoOrderedList />}
          accion={() => editor.chain().focus().toggleOrderedList().run()}
          activo={editor.isActive('orderedList')}
          titulo="Lista numerada"
        />
        <BotonHerramienta
          icono={<IconoLink />}
          accion={establecerEnlace}
          activo={editor.isActive('link')}
          titulo="Insertar o editar enlace"
        />
      </div>

      <span className="editor-noticia__separador" aria-hidden="true" />

      {/* 4. Alineación */}
      <div className="editor-noticia__grupo">
        <BotonHerramienta
          icono={<IconoAlignLeft />}
          accion={() => editor.chain().focus().setTextAlign('left').run()}
          activo={editor.isActive({ textAlign: 'left' })}
          titulo="Alinear a la izquierda"
        />
        <BotonHerramienta
          icono={<IconoAlignCenter />}
          accion={() => editor.chain().focus().setTextAlign('center').run()}
          activo={editor.isActive({ textAlign: 'center' })}
          titulo="Centrar"
        />
        <BotonHerramienta
          icono={<IconoAlignRight />}
          accion={() => editor.chain().focus().setTextAlign('right').run()}
          activo={editor.isActive({ textAlign: 'right' })}
          titulo="Alinear a la derecha"
        />
      </div>

      <span className="editor-noticia__separador" aria-hidden="true" />

      {/* 5. Historial */}
      <div className="editor-noticia__grupo">
        <BotonHerramienta
          icono={<IconoUndo />}
          accion={() => editor.chain().focus().undo().run()}
          deshabilitado={!editor.can().undo()}
          titulo="Deshacer"
        />
        <BotonHerramienta
          icono={<IconoRedo />}
          accion={() => editor.chain().focus().redo().run()}
          deshabilitado={!editor.can().redo()}
          titulo="Rehacer"
        />
      </div>
    </div>
  );
};

export default EditorToolbar;

