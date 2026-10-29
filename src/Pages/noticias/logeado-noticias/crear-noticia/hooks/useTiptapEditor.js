import { useCallback, useMemo, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import DOMPurify from "dompurify";
import { contarPalabras, tiempoLectura } from "../utils/formatearHelpers";

export const useTiptapEditor = ({ value = "", onChange }) => {
  const publicarCambio = useCallback(
    ({ editor }) => {
      const html = editor.isEmpty
        ? ""
        : DOMPurify.sanitize(editor.getHTML(), {
            USE_PROFILES: { html: true },
          });

      onChange?.(html);
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

  const establecerEnlace = () => {
    if (!editor) return;
    const enlaceActual = editor.getAttributes("link").href || "";
    const enlace = window.prompt(
      "Ingresá la URL del enlace (ej: https://upc.edu.ar):",
      enlaceActual
    );

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

  return {
    editor,
    palabras,
    lectura,
    establecerEnlace,
  };
};

export default useTiptapEditor;

