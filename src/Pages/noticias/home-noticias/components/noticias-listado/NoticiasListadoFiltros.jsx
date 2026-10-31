import React from 'react';
import { BuscadorNoticias } from '../../../logeado-noticias/ver-noticias/components/BuscadorNoticias.jsx';

export const NoticiasListadoFiltros = ({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  categorias,
  fecha,
  setFecha,
  onCambioFiltro,
}) => {
  return (
    <div className="ver-noticias-filtros-card">
      <BuscadorNoticias
        busqueda={busqueda}
        setBusqueda={onCambioFiltro(setBusqueda)}
        categoria={categoria}
        setCategoria={onCambioFiltro(setCategoria)}
        categorias={categorias}
        fecha={fecha}
        setFecha={onCambioFiltro(setFecha)}
      />
    </div>
  );
};

