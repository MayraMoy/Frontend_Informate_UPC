import { useState } from 'react';
import {
  editarNoticia,
  eliminarNoticia,
} from '../../../../../Services/noticias/noticiasServices';

export const usePendientesAcciones = (user, cargarNoticias) => {
  const [accionEnProgreso, setAccionEnProgreso] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [errorAccion, setErrorAccion] = useState('');

  // Acción: Publicar Noticia en el portal institucional
  const handlePublicar = async (noticia) => {
    if (!window.confirm(`¿Publicar la noticia "${noticia.titulo}" en el portal oficial?`)) {
      return;
    }
    setAccionEnProgreso(noticia.id);
    setErrorAccion('');
    setMensajeExito('');
    try {
      const idAutor =
        noticia?.idAutor ??
        noticia?.autorId ??
        noticia?.autor?.id ??
        user?.idUsuario ??
        user?.id;

      const payload = {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo || noticia.descripcion || noticia.resumen || '',
        categoriaId: Number(
          noticia.categoriaId ||
          noticia.categoriaNoticiaId ||
          noticia?.categoriaNoticia?.id ||
          1,
        ),
        estado: 'PUBLICADA',
        ...(idAutor ? { idAutor: Number(idAutor), autorId: Number(idAutor) } : {}),
      };

      await editarNoticia(noticia.id, payload, idAutor);
      setMensajeExito(`Noticia "${noticia.titulo}" publicada exitosamente en el portal.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setErrorAccion(
        `Error al publicar: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

  // Acción: Cambiar Estado (Borrador, Archivada, Suspendida)
  const handleCambiarEstado = async (noticia, nuevoEstado) => {
    const nombresAccion = {
      ARCHIVADA: 'archivar',
      SUSPENDIDA: 'suspender',
      BORRADOR: 'marcar como borrador',
    };
    const accion = nombresAccion[nuevoEstado] || 'actualizar el estado de';

    if (!window.confirm(`¿Deseas ${accion} la noticia "${noticia.titulo}"?`)) {
      return;
    }

    setAccionEnProgreso(noticia.id);
    setErrorAccion('');
    setMensajeExito('');
    try {
      const idAutor =
        noticia?.idAutor ??
        noticia?.autorId ??
        noticia?.autor?.id ??
        user?.idUsuario ??
        user?.id;

      const payload = {
        titulo: noticia.titulo,
        cuerpo: noticia.cuerpo || noticia.descripcion || noticia.resumen || '',
        categoriaId: Number(
          noticia.categoriaId ||
          noticia.categoriaNoticiaId ||
          noticia?.categoriaNoticia?.id ||
          1,
        ),
        estado: nuevoEstado,
        ...(idAutor ? { idAutor: Number(idAutor), autorId: Number(idAutor) } : {}),
      };

      await editarNoticia(noticia.id, payload, idAutor);
      setMensajeExito(`Estado de "${noticia.titulo}" actualizado a ${nuevoEstado}.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setErrorAccion(
        `Error al cambiar estado: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

  // Acción: Eliminar Noticia definitivamente
  const handleEliminar = async (noticia) => {
    if (
      !window.confirm(
        `¿Eliminar definitivamente la noticia "${noticia.titulo}"? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }
    setAccionEnProgreso(noticia.id);
    setErrorAccion('');
    setMensajeExito('');
    try {
      await eliminarNoticia(noticia.id);
      setMensajeExito(`Noticia "${noticia.titulo}" eliminada correctamente.`);
      await cargarNoticias();
      setTimeout(() => setMensajeExito(''), 4500);
    } catch (err) {
      setErrorAccion(
        `Error al eliminar noticia: ${
          err?.response?.data?.message || err?.message || 'Error de servidor'
        }`,
      );
    } finally {
      setAccionEnProgreso(null);
    }
  };

  return {
    accionEnProgreso,
    mensajeExito,
    setMensajeExito,
    errorAccion,
    setErrorAccion,
    handlePublicar,
    handleCambiarEstado,
    handleEliminar,
  };
};

export default usePendientesAcciones;

