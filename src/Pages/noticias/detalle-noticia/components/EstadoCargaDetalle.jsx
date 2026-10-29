import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconoAlerta, IconoVolver } from '../../logeado-noticias/crear-noticia/components/IconosNoticia';

export const EstadoCargaDetalle = ({ cargando = false, error = '' }) => {
  const navigate = useNavigate();

  if (cargando) {
    return (
      <div className="detalle-noticia-estado-cargando" role="status" aria-live="polite">
        <div className="spinner-border text-warning" aria-hidden="true" />
        <p className="mt-3 text-secondary fw-semibold">Cargando noticia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-noticia-estado-error" role="alert">
        <div className="detalle-noticia-error-icono">
          <IconoAlerta />
        </div>
        <h2 className="detalle-noticia-error-titulo">No se pudo cargar la noticia</h2>
        <p className="detalle-noticia-error-desc">{error}</p>
        <button
          type="button"
          className="detalle-noticia-btn-error-volver"
          onClick={() => navigate('/noticias/ver')}
        >
          <IconoVolver />
          <span>Volver al listado de noticias</span>
        </button>
      </div>
    );
  }

  return null;
};

export default EstadoCargaDetalle;

