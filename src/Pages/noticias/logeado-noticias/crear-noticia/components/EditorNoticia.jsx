import { useCallback, useMemo, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import DOMPurify from "dompurify";
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
  IconoAlerta,
} from "./IconosNoticia";
import { contarPalabras, tiempoLectura } from "../utils/formatearHelpers";
import "../styles/EditorNoticia.css";

const EditorNoticia = ({
  value = "",
  onChange,
  error = "",
  requerido = true,
}) => {
  const publicarCambio = useCallback(
    ({ editor }) => {
      const html = editor.isEmpty
        ? ""
        : DOMPurify.sanitize(editor.getHTML(), {
            USE_PROFILES: { html: true },
          });

      onChange(html);
    },
    [onChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
    ],
    content: value,
    onUpdate: publicarCambio,
    editorProps: {
      attributes: {
        "aria-label": "Cuerpo redactado de la noticia",
        class: "editor-noticia__contenido",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (!value) {
      if (!editor.isEmpty) {
        editor.commands.clearContent();
      }
      return;
    }

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const palabras = useMemo(() => contarPalabras(value), [value]);
  const lectura = useMemo(() => tiempoLectura(palabras), [palabras]);

  if (!editor) return null;

  const establecerEnlace = () => {
    const enlaceActual = editor.getAttributes("link").href || "";
    const enlace = window.prompt("Ingresá la URL del enlace (ej: https://upc.edu.ar):", enlaceActual);

    if (enlace === null) return;

    if (!enlace.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      const url = new URL(enlace.trim());

      if (!["http:", "https:"].includes(url.protocol)) {
        window.alert("Solo se permiten enlaces HTTP o HTTPS.");
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: url.href,
          target: "_blank",
          rel: "noopener noreferrer",
        })
        .run();
    } catch {
      window.alert("Ingresá una dirección URL válida.");
    }
  };

  const boton = (icono, accion, activo = false, deshabilitado = false, titulo = "") => (
    <button
      key={titulo}
      type="button"
      title={titulo}
      aria-label={titulo}
      aria-pressed={activo}
      disabled={deshabilitado}
      className={`editor-noticia__boton ${
        activo ? "editor-noticia__boton--activo" : ""
      }`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={accion}
    >
      {icono}
    </button>
  );

  return (
    <div className={`editor-noticia ${error ? "editor-noticia--con-error" : ""}`}>
      <div className="editor-noticia__encabezado">
        <label className="editor-noticia__etiqueta">
          Cuerpo de la noticia
          {requerido && <span className="crear-noticia__requerido" aria-hidden="true"> *</span>}
        </label>
        <span className="editor-noticia__lectura-badge">
          {lectura} · {palabras} {palabras === 1 ? "palabra" : "palabras"}
        </span>
      </div>

      <div className="editor-noticia__contenedor-cuerpo">
        {/* Barra de herramientas organizada por grupos */}
        <div className="editor-noticia__barra" role="toolbar" aria-label="Herramientas de formato de texto">
          <div className="editor-noticia__grupo">
            {boton(<IconoBold />, () => editor.chain().focus().toggleBold().run(),
              editor.isActive("bold"), !editor.can().chain().focus().toggleBold().run(), "Negrita (Ctrl+B)")}
            {boton(<IconoItalic />, () => editor.chain().focus().toggleItalic().run(),
              editor.isActive("italic"), !editor.can().chain().focus().toggleItalic().run(), "Cursiva (Ctrl+I)")}
          </div>

          <span className="editor-noticia__separador" aria-hidden="true" />

          <div className="editor-noticia__grupo">
            {boton(<IconoH2 />, () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              editor.isActive("heading", { level: 2 }), false, "Título principal (H2)")}
            {boton(<IconoH3 />, () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              editor.isActive("heading", { level: 3 }), false, "Subtítulo (H3)")}
          </div>

          <span className="editor-noticia__separador" aria-hidden="true" />

          <div className="editor-noticia__grupo">
            {boton(<IconoBulletList />, () => editor.chain().focus().toggleBulletList().run(),
              editor.isActive("bulletList"), false, "Lista con viñetas")}
            {boton(<IconoOrderedList />, () => editor.chain().focus().toggleOrderedList().run(),
              editor.isActive("orderedList"), false, "Lista numerada")}
            {boton(<IconoLink />, establecerEnlace,
              editor.isActive("link"), false, "Insertar o editar enlace")}
          </div>

          <span className="editor-noticia__separador" aria-hidden="true" />

          <div className="editor-noticia__grupo">
            {boton(<IconoAlignLeft />, () => editor.chain().focus().setTextAlign("left").run(),
              editor.isActive({ textAlign: "left" }), false, "Alinear a la izquierda")}
            {boton(<IconoAlignCenter />, () => editor.chain().focus().setTextAlign("center").run(),
              editor.isActive({ textAlign: "center" }), false, "Centrar")}
            {boton(<IconoAlignRight />, () => editor.chain().focus().setTextAlign("right").run(),
              editor.isActive({ textAlign: "right" }), false, "Alinear a la derecha")}
          </div>

          <span className="editor-noticia__separador" aria-hidden="true" />

          <div className="editor-noticia__grupo">
            {boton(<IconoUndo />, () => editor.chain().focus().undo().run(),
              false, !editor.can().undo(), "Deshacer")}
            {boton(<IconoRedo />, () => editor.chain().focus().redo().run(),
              false, !editor.can().redo(), "Rehacer")}
          </div>
        </div>

        <EditorContent editor={editor} />
      </div>

      <div className="editor-noticia__pie">
        {error && (
          <span className="crear-noticia__error" role="alert">
            <IconoAlerta />
            <span>{error}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default EditorNoticia;
