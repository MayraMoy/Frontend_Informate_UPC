import React from 'react';

export const NoticiasListadoHeader = () => {
  return (
    <header className="ver-noticias-header">
      <div className="ver-noticias-header-texto">
        <h1 id="noticias-titulo" className="ver-noticias-titulo">
          Noticias Institucionales
        </h1>
        <p className="ver-noticias-subtitulo">
          Consultá las novedades publicadas y filtrá por categoría o fecha.
        </p>
      </div>
    </header>
  );
};

