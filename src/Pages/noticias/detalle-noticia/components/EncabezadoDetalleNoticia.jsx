import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconoEditar } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const EncabezadoDetalleNoticia = ({ noticia, imagenes = [], esAdmin }) => {
  const navigate = useNavigate();

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
      <div className="detalle-noticia-header-breadcrumb">
        <span className="detalle-noticia-breadcrumb-tag">Módulo Institucional</span>
        <span className="detalle-noticia-breadcrumb-separador">/</span>
        <span className="detalle-noticia-breadcrumb-pagina">Noticias</span>
      </div>

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
