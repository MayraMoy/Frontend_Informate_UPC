import React, { useState } from 'react';
import {
  formatearFechaHoy,
  tiempoLectura,
  contarPalabras,
} from '../utils/formatearHelpers';
import {
  VistaPreviaVacia,
  VistaPreviaHeader,
  VistaPreviaGaleria,
  VistaPreviaCuerpo,
} from './vista-previa';

const VistaPreviaNoticia = ({
  valores = {},
  categorias = [],
  imagenes = [],
  usuario = null,
}) => {
  const [imagenActivaIndice, setImagenActivaIndice] = useState(0);

  const categoria = categorias.find(
    (c) => String(c.id) === String(valores.categoriaId)
  );

  const tieneTitulo = Boolean(valores.titulo?.trim());
  const tieneCuerpo = Boolean(valores.cuerpo?.trim());
  const palabras = contarPalabras(valores.cuerpo);
  const lectura = tiempoLectura(palabras);
  const fechaHoy = formatearFechaHoy();
  const nombreAutor = usuario?.nombre || usuario?.username || 'Redacción Informate UPC';

  if (!tieneTitulo && !tieneCuerpo && imagenes.length === 0) {
    return <VistaPreviaVacia />;
  }

  return (
    <article className="crear-noticia__preview-articulo">
      <VistaPreviaHeader
        categoria={categoria}
        lectura={lectura}
        titulo={valores.titulo}
        tieneTitulo={tieneTitulo}
        nombreAutor={nombreAutor}
        fechaHoy={fechaHoy}
      />

      <VistaPreviaGaleria
        imagenes={imagenes}
        imagenActivaIndice={imagenActivaIndice}
        setImagenActivaIndice={setImagenActivaIndice}
        titulo={valores.titulo}
      />

      <VistaPreviaCuerpo
        cuerpo={valores.cuerpo}
        tieneCuerpo={tieneCuerpo}
      />
    </article>
  );
};

export default VistaPreviaNoticia;
