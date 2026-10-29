import React from 'react';
import CampoTexto from '../../crear-noticia/components/CampoTexto';
import EditorNoticia from '../../crear-noticia/components/EditorNoticia';
import CampoCategoria from '../../crear-noticia/components/CampoCategoria';
import { PanelPublicacionEditar } from './PanelPublicacionEditar';
import { PanelImagenesEditar } from './PanelImagenesEditar';
import { LIMITES_EDICION } from '../data/editarNoticiaData';

export const FormularioEditarNoticia = ({
  titulo,
  cuerpo,
  categoriaId,
  estado,
  categorias = [],
  cargandoCategorias = false,
  errorCategorias = '',
  noticiaOriginal,
  esAdmin,
  guardando,
  errores = {},
  errorImagenes = '',
  imagenesExistentes = [],
  nuevasImagenes = [],
  totalImagenes = 0,
  limiteAlcanzado = false,
  onChangeTitulo,
  onChangeCuerpo,
  onChangeCategoria,
  onChangeEstado,
  onAgregarImagenes,
  onCambiarEpigrafeExistente,
  onCambiarEpigrafeNueva,
  onEliminarExistente,
  onEliminarNueva,
  onSubmit,
  onVerPreview,
  onCancelar,
}) => {
  return (
    <form className="crear-noticia__form" onSubmit={onSubmit} noValidate>
      <div className="crear-noticia__layout-grid">
        {/* Columna Principal (Izquierda): Título y Editor enriquecido */}
        <div className="crear-noticia__columna-principal">
          <div className="crear-noticia__card-panel">
            <CampoTexto
              id="titulo"
              label="Título de la noticia"
              value={titulo}
              onChange={(e) => onChangeTitulo(e.target.value)}
              error={errores.titulo}
              maxLength={LIMITES_EDICION.titulo}
              placeholder="Ingresá un título descriptivo y claro"
              requerido
            />

            <EditorNoticia
              value={cuerpo}
              onChange={onChangeCuerpo}
              error={errores.cuerpo}
              requerido
            />
          </div>
        </div>

        {/* Columna Lateral (Derecha): Publicación, Estado, Fechas, Categoría e Imágenes */}
        <aside className="crear-noticia__columna-lateral">
          {/* 1. Panel de Publicación, Estado según Rol y Fechas */}
          <PanelPublicacionEditar
            estado={estado}
            onChangeEstado={onChangeEstado}
            esAdmin={esAdmin}
            noticia={noticiaOriginal}
            guardando={guardando}
            onSubmit={onSubmit}
            onVerPreview={onVerPreview}
            onCancelar={onCancelar}
          />

          {/* 2. Panel de Categoría */}
          <div className="crear-noticia__card-sidebar">
            <CampoCategoria
              categorias={categorias}
              cargando={cargandoCategorias}
              errorCarga={errorCategorias}
              value={categoriaId}
              onChange={(e) => onChangeCategoria(typeof e === 'object' && e?.target ? e.target.value : e)}
              error={errores.categoriaId}
              requerido
            />
          </div>

          {/* 3. Panel de Imágenes con Epígrafe Obligatorio */}
          <div className="crear-noticia__card-sidebar">
            <PanelImagenesEditar
              imagenesExistentes={imagenesExistentes}
              nuevasImagenes={nuevasImagenes}
              totalImagenes={totalImagenes}
              limiteAlcanzado={limiteAlcanzado}
              error={errorImagenes}
              onAgregarImagenes={onAgregarImagenes}
              onCambiarEpigrafeExistente={onCambiarEpigrafeExistente}
              onCambiarEpigrafeNueva={onCambiarEpigrafeNueva}
              onEliminarExistente={onEliminarExistente}
              onEliminarNueva={onEliminarNueva}
            />
          </div>
        </aside>
      </div>
    </form>
  );
};

