import React, { useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AppContext from '../../../Context/AppContext';
import { useDetalleNoticia } from './hooks/useDetalleNoticia';
import { EncabezadoDetalleNoticia } from './components/EncabezadoDetalleNoticia';
import { MetadatosNoticia } from './components/MetadatosNoticia';
import { GaleriaImagenesNoticia } from './components/GaleriaImagenesNoticia';
import { CuerpoNoticia } from './components/CuerpoNoticia';
import { SidebarDetalleNoticia } from './components/SidebarDetalleNoticia';
import { EstadoCargaDetalle } from './components/EstadoCargaDetalle';
import './styles/DetalleNoticia.css';

const DetalleNoticia = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useContext(AppContext);

  const {
    noticia,
    cargando,
    error,
    esAdmin,
    categoriaNombre,
    categoriaBadgeClass,
    nombreAutor,
    palabras,
    tiempoLectura,
    fechaPublicacion,
    fechaActualizacion,
    fechaCreacion,
    imagenes,
    imagenSeleccionada,
    imagenActivaIndice,
    setImagenActivaIndice,
  } = useDetalleNoticia(id, user, location.state?.noticia || null);

  if (cargando) {
    return (
      <div className="detalle-noticia-pagina">
        <div className="detalle-noticia-contenedor">
          <EstadoCargaDetalle cargando />
        </div>
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div className="detalle-noticia-pagina">
        <div className="detalle-noticia-contenedor">
          <EstadoCargaDetalle error={error || 'No se encontró la noticia solicitada.'} />
        </div>
      </div>
    );
  }

  return (
    <main className="detalle-noticia-pagina">
      <div className="detalle-noticia-contenedor">
        {/* Encabezado superior amplio con botón de Edición */}
        <EncabezadoDetalleNoticia
          noticia={{
            ...noticia,
            nombreAutor,
            autor: noticia?.autor || (typeof nombreAutor === 'string' ? { nombre: nombreAutor } : nombreAutor),
          }}
          imagenes={imagenes}
          esAdmin={esAdmin}
        />

        {/* Layout en grilla amplia: Columna Principal de Lectura y Columna Lateral Informativa */}
        <div className="detalle-noticia-grid">
          {/* Columna Principal: Contenido y multimedia de la noticia */}
          <article className="detalle-noticia-card">
            <MetadatosNoticia
              categoriaNombre={categoriaNombre}
              categoriaBadgeClass={categoriaBadgeClass}
              tiempoLectura={tiempoLectura}
              nombreAutor={nombreAutor}
              fechaPublicacion={fechaPublicacion}
              fechaActualizacion={fechaActualizacion}
              fechaCreacion={fechaCreacion}
            />

            <h1 className="detalle-noticia-titulo">{noticia.titulo}</h1>

            {/* Galería de imágenes institucionales con epígrafe sin emojis */}
            <GaleriaImagenesNoticia
              imagenes={imagenes}
              imagenSeleccionada={imagenSeleccionada}
              imagenActivaIndice={imagenActivaIndice}
              onSeleccionarImagen={setImagenActivaIndice}
              tituloNoticia={noticia.titulo}
            />

            {/* Cuerpo enriquecido del artículo */}
            <CuerpoNoticia cuerpo={noticia.cuerpo} />
          </article>

          {/* Columna Lateral: Ficha complementaria que aprovecha el ancho completo de la pantalla */}
          <SidebarDetalleNoticia
            noticia={noticia}
            categoriaNombre={categoriaNombre}
            categoriaBadgeClass={categoriaBadgeClass}
            nombreAutor={nombreAutor}
            fechaPublicacion={fechaPublicacion}
            fechaActualizacion={fechaActualizacion}
            fechaCreacion={fechaCreacion}
            tiempoLectura={tiempoLectura}
            palabras={palabras}
            esAdmin={esAdmin}
          />
        </div>
      </div>
    </main>
  );
};

export default DetalleNoticia;
