import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconoEditar } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const EncabezadoDetalleNoticia = ({ noticia, imagenes = [], esAdmin }) => {
  const navigate = useNavigate();

  const handleVolver = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else if (esAdmin) {
      navigate('/noticias/ver');
    } else {
      navigate('/noticias');
    }
  };

  const handleEditar = () => {
    if (!noticia?.id) return;
    const listaImagenes =
      Array.isArray(noticia.imagenes) && noticia.imagenes.length > 0
        ? noticia.imagenes
        : Array.isArray(imagenes) && imagenes.length > 0
        ? imagenes
        : [];

    const noticiaAEditar = {
      ...noticia,
      imagenes: listaImagenes,
    };

    navigate(`/noticias/editar/${noticia.id}`, { state: { noticia: noticiaAEditar } });
  };

  return (
    <header className="detalle-noticia-header" aria-label="Encabezado de lectura">
      <nav className="detalle-noticia-header-breadcrumb" aria-label="Migas de pan">
        <span className="detalle-noticia-breadcrumb-tag">Módulo Institucional</span>
        <span className="detalle-noticia-breadcrumb-separador" aria-hidden="true">/</span>
        <button
          type="button"
          className="detalle-noticia-breadcrumb-btn-volver"
          onClick={handleVolver}
          title="Volver al listado de noticias"
        >
          Volver a Noticias
        </button>
      </nav>

      {esAdmin && noticia && (
        <button
          type="button"
          className="detalle-noticia-btn-editar"
          onClick={handleEditar}
          title="Editar esta noticia"
          aria-label={`Editar noticia: ${noticia.titulo || ''}`}
        >
          <IconoEditar />
          <span>Editar noticia</span>
        </button>
      )}
    </header>
  );
};

export default EncabezadoDetalleNoticia;
