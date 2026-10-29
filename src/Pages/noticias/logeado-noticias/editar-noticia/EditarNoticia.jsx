import React, { useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../../../../Context/AppContext';
import useCategorias from '../../../../hooks/useCategorias';
import { useEditarNoticia } from './hooks/useEditarNoticia';
import { EncabezadoEditarNoticia } from './components/EncabezadoEditarNoticia';
import { FormularioEditarNoticia } from './components/FormularioEditarNoticia';
import VistaPreviaNoticia from '../crear-noticia/components/VistaPreviaNoticia';
import {
  IconoEditar,
  IconoCheck,
  IconoAlerta,
} from '../crear-noticia/components/IconosNoticia';
import './styles/EditarNoticia.css';

const EditarNoticia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const noticiaInicial = location.state?.noticia || null;
  const { user } = useContext(AppContext);

  const [pestanaActiva, setPestanaActiva] = useState('editor'); // "editor" | "preview"

  const { categorias, cargando: cargandoCategorias, error: errorCategorias } = useCategorias();

  const {
    esAdmin,
    cargandoNoticia,
    errorCarga,
    noticiaOriginal,
    titulo,
    cuerpo,
    categoriaId,
    estado,
    imagenesExistentes,
    nuevasImagenes,
    totalImagenes,
    limiteAlcanzado,
    imagenesParaPreview,
    errores,
    errorImagenes,
    guardando,
    errorGuardado,
    mensajeExito,
    manejarCambioTitulo,
    manejarCambioCuerpo,
    manejarCambioCategoria,
    manejarCambioEstado,
    manejarAgregarImagenes,
    manejarCambioEpigrafeExistente,
    manejarCambioEpigrafeNueva,
    manejarEliminarExistente,
    manejarEliminarNueva,
    guardarCambios,
  } = useEditarNoticia(id, user, categorias, noticiaInicial);

  const manejarSubmit = async (e) => {
    if (e) e.preventDefault();
    const exito = await guardarCambios();
    if (!exito) {
      setPestanaActiva('editor');
    }
  };

  if (cargandoNoticia) {
    return (
      <div className="editar-noticia-pagina">
        <div className="editar-noticia__cargando-estado" role="status">
          <span className="spinner-border text-warning" aria-hidden="true" />
          <p className="mt-2 text-secondary">Cargando información de la noticia...</p>
        </div>
      </div>
    );
  }

  if (errorCarga) {
    return (
      <div className="editar-noticia-pagina">
        <div className="editar-noticia__error-estado" role="alert">
          <IconoAlerta />
          <h2>Error al cargar la noticia</h2>
          <p>{errorCarga}</p>
          <button
            type="button"
            className="crear-noticia__boton-secundario mt-3"
            onClick={() => navigate('/noticias/ver')}
          >
            Volver al listado de noticias
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-noticia-pagina">
      <div className="crear-noticia__contenedor-ancho">
        {/* Encabezado y navegación */}
        <EncabezadoEditarNoticia
          id={id}
          pestanaActiva={pestanaActiva}
          onCambiarPestana={setPestanaActiva}
        />

        {/* Mensaje de éxito al guardar */}
        {mensajeExito && (
          <section className="crear-noticia__exito-banner mb-4" role="status">
            <div className="crear-noticia__exito-icono">
              <IconoCheck />
            </div>
            <div className="crear-noticia__exito-texto">
              <h3>{mensajeExito}</h3>
              <p>Los cambios se guardaron correctamente en la plataforma.</p>
            </div>
            <div className="crear-noticia__exito-botones">
              <button
                type="button"
                className="crear-noticia__boton-exito-principal"
                onClick={() => navigate('/noticias/ver')}
              >
                Volver al listado
              </button>
            </div>
          </section>
        )}

        {/* Alerta de error en guardado */}
        {errorGuardado && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert">
            <IconoAlerta />
            <span>{errorGuardado}</span>
          </div>
        )}

        {/* Renderizado condicional según pestaña */}
        {pestanaActiva === 'preview' ? (
          <div className="crear-noticia__preview-seccion">
            <VistaPreviaNoticia
              valores={{ titulo, cuerpo, categoriaId }}
              categorias={categorias}
              imagenes={imagenesParaPreview}
              usuario={noticiaOriginal?.autor || user}
            />
            <div className="crear-noticia__preview-acciones-pie">
              <button
                type="button"
                className="crear-noticia__boton-secundario"
                onClick={() => setPestanaActiva('editor')}
              >
                <IconoEditar />
                <span>Volver al editor</span>
              </button>
              <button
                type="button"
                className="crear-noticia__boton-principal"
                onClick={manejarSubmit}
                disabled={guardando}
              >
                <span>Guardar cambios</span>
              </button>
            </div>
          </div>
        ) : (
          <FormularioEditarNoticia
            titulo={titulo}
            cuerpo={cuerpo}
            categoriaId={categoriaId}
            estado={estado}
            categorias={categorias}
            cargandoCategorias={cargandoCategorias}
            errorCategorias={errorCategorias}
            noticiaOriginal={noticiaOriginal}
            esAdmin={esAdmin}
            guardando={guardando}
            errores={errores}
            errorImagenes={errorImagenes}
            imagenesExistentes={imagenesExistentes}
            nuevasImagenes={nuevasImagenes}
            totalImagenes={totalImagenes}
            limiteAlcanzado={limiteAlcanzado}
            onChangeTitulo={manejarCambioTitulo}
            onChangeCuerpo={manejarCambioCuerpo}
            onChangeCategoria={manejarCambioCategoria}
            onChangeEstado={manejarCambioEstado}
            onAgregarImagenes={manejarAgregarImagenes}
            onCambiarEpigrafeExistente={manejarCambioEpigrafeExistente}
            onCambiarEpigrafeNueva={manejarCambioEpigrafeNueva}
            onEliminarExistente={manejarEliminarExistente}
            onEliminarNueva={manejarEliminarNueva}
            onSubmit={manejarSubmit}
            onVerPreview={() => setPestanaActiva('preview')}
            onCancelar={() => navigate('/noticias/ver')}
          />
        )}
      </div>
    </div>
  );
};

export default EditarNoticia;
