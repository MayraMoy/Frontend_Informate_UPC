import { useState, useContext } from "react";
import AppContext from "../../../../../Context/AppContext";
import CamposNoticia from "./CamposNoticia";
import AccionesFormulario from "./AccionesFormulario";
import VistaPreviaNoticia from "./VistaPreviaNoticia";
import useFormularioNoticia from "../hooks/useFormularioNoticia";
import useCrearNoticia from "../../../../../hooks/useCrearNoticia";
import {
  IconoEditar,
  IconoOjo,
  IconoCheck,
} from "./IconosNoticia";
import "../styles/CrearNoticia.css";

const FormularioNoticia = ({
  categorias = [],
  cargandoCategorias = false,
  errorCategorias = "",
}) => {
  const { user } = useContext(AppContext);
  const formulario = useFormularioNoticia();
  const creacion = useCrearNoticia();

  const [pestanaActiva, setPestanaActiva] = useState("editor"); // "editor" | "preview"
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [confirmacionLimpiarAbierta, setConfirmacionLimpiarAbierta] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // Primer paso: validar y pedir confirmación.
  const manejarEnvio = (event) => {
    event.preventDefault();
    setMensajeExito("");

    if (creacion.guardando || !formulario.validar()) {
      setPestanaActiva("editor");
      return;
    }

    setConfirmacionAbierta(true);
  };

  // Segundo paso: enviar la noticia después de aceptar en el modal.
  const confirmarCreacion = async () => {
    if (creacion.guardando) return;

    setConfirmacionAbierta(false);
    setMensajeExito("");

    const resultado = await creacion.crearNoticia(
      formulario.obtenerDatos(),
      user?.idUsuario,
      formulario.imagenes
    );

    if (!resultado?.exito) return;

    formulario.limpiar();
    setMensajeExito("¡La noticia se publicó exitosamente!");
  };

  const cancelarCreacion = () => {
    setConfirmacionAbierta(false);
  };

  const solicitarLimpieza = () => {
    const tieneAlgo =
      Boolean(formulario.valores.titulo.trim()) ||
      Boolean(formulario.valores.cuerpo.trim()) ||
      formulario.imagenes.length > 0;

    if (tieneAlgo) {
      setConfirmacionLimpiarAbierta(true);
    } else {
      formulario.limpiar();
    }
  };

  const confirmarLimpieza = () => {
    formulario.limpiar();
    setConfirmacionLimpiarAbierta(false);
    setMensajeExito("");
  };

  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id) === String(formulario.valores.categoriaId)
  );

  return (
    <div className="crear-noticia-pagina">
      <div className="crear-noticia__contenedor-ancho">
        {/* Encabezado limpio con pestañas integradas */}
        <header className="crear-noticia__encabezado-principal">
          <div className="crear-noticia__titulo-bloque">
            <h1 className="crear-noticia__titulo">Crear noticia</h1>
            <p className="crear-noticia__subtitulo">
              Redactá, adjuntá imágenes y publicá novedades institucionales en el portal
            </p>
          </div>

          {/* Pestañas Editor / Vista previa integradas */}
          <div className="crear-noticia__pestanas" role="tablist" aria-label="Modo de trabajo">
            <button
              type="button"
              role="tab"
              aria-selected={pestanaActiva === "editor"}
              className={`crear-noticia__pestana-btn ${
                pestanaActiva === "editor" ? "crear-noticia__pestana-btn--activa" : ""
              }`}
              onClick={() => setPestanaActiva("editor")}
            >
              <IconoEditar />
              <span>Redactar</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={pestanaActiva === "preview"}
              className={`crear-noticia__pestana-btn ${
                pestanaActiva === "preview" ? "crear-noticia__pestana-btn--activa" : ""
              }`}
              onClick={() => setPestanaActiva("preview")}
            >
              <IconoOjo />
              <span>Vista previa</span>
              {(formulario.valores.titulo || formulario.imagenes.length > 0) && (
                <span className="crear-noticia__pestana-punto-activo" title="Contenido disponible" />
              )}
            </button>
          </div>
        </header>

        {/* Banner de éxito */}
        {mensajeExito && (
          <section className="crear-noticia__exito-banner" role="status">
            <div className="crear-noticia__exito-icono">
              <IconoCheck />
            </div>
            <div className="crear-noticia__exito-texto">
              <h3>{mensajeExito}</h3>
              <p>La noticia ya se encuentra registrada en el sistema.</p>
            </div>
            <div className="crear-noticia__exito-botones">
              <button
                type="button"
                className="crear-noticia__boton-exito-principal"
                onClick={() => {
                  setMensajeExito("");
                  setPestanaActiva("editor");
                }}
              >
                Crear otra noticia
              </button>
            </div>
          </section>
        )}

        {/* Contenido según pestaña */}
        {pestanaActiva === "preview" ? (
          <div className="crear-noticia__preview-seccion">
            <VistaPreviaNoticia
              valores={formulario.valores}
              categorias={categorias}
              imagenes={formulario.imagenes}
              usuario={user}
            />
            <div className="crear-noticia__preview-acciones-pie">
              <button
                type="button"
                className="crear-noticia__boton-secundario"
                onClick={() => setPestanaActiva("editor")}
              >
                <IconoEditar />
                <span>Volver a redactar</span>
              </button>
              <button
                type="button"
                className="crear-noticia__boton-principal"
                onClick={manejarEnvio}
                disabled={creacion.guardando}
              >
                <span>Publicar noticia</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            className="crear-noticia__form"
            onSubmit={manejarEnvio}
            noValidate
          >
            <CamposNoticia
              valores={formulario.valores}
              errores={formulario.errores}
              categorias={categorias}
              cargandoCategorias={cargandoCategorias}
              errorCategorias={errorCategorias}
              onChange={formulario.manejarCambio}
              imagenes={formulario.imagenes}
              errorImagenes={formulario.errorImagenes}
              onSeleccionarImagen={formulario.manejarSeleccionImagen}
              onCambiarEpigrafe={formulario.manejarCambioEpigrafe}
              onQuitarImagen={formulario.manejarQuitarImagen}
              accionesSlot={(
                <AccionesFormulario
                  guardando={creacion.guardando}
                  error={creacion.error}
                  onLimpiar={solicitarLimpieza}
                  onVerPreview={() => setPestanaActiva("preview")}
                />
              )}
            />
          </form>
        )}
      </div>

      {/* Modal de confirmación para publicar */}
      {confirmacionAbierta && (
        <div className="crear-noticia__overlay" role="presentation">
          <section
            className="crear-noticia__dialogo"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirmacion-titulo"
            aria-describedby="confirmacion-descripcion"
          >
            <h2 id="confirmacion-titulo">
              ¿Confirmás la publicación?
            </h2>

            <p id="confirmacion-descripcion">
              Verificá los datos antes de publicar:
            </p>

            <div className="crear-noticia__dialogo-resumen">
              <div className="crear-noticia__dialogo-resumen-item">
                <span className="crear-noticia__dialogo-label">Título:</span>
                <strong className="crear-noticia__dialogo-valor">
                  {formulario.valores.titulo}
                </strong>
              </div>
              <div className="crear-noticia__dialogo-resumen-item">
                <span className="crear-noticia__dialogo-label">Categoría:</span>
                <span className="crear-noticia__dialogo-valor">
                  {categoriaSeleccionada ? categoriaSeleccionada.nombre : "Sin categoría"}
                </span>
              </div>
              <div className="crear-noticia__dialogo-resumen-item">
                <span className="crear-noticia__dialogo-label">Imágenes:</span>
                <span className="crear-noticia__dialogo-valor">
                  {formulario.imagenes.length} {formulario.imagenes.length === 1 ? "imagen" : "imágenes"}
                </span>
              </div>
            </div>

            <div className="crear-noticia__acciones-dialogo">
              <button
                type="button"
                className="crear-noticia__boton-secundario"
                onClick={cancelarCreacion}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="crear-noticia__boton-principal"
                onClick={confirmarCreacion}
              >
                Confirmar y publicar
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Modal de confirmación para limpiar formulario */}
      {confirmacionLimpiarAbierta && (
        <div className="crear-noticia__overlay" role="presentation">
          <section
            className="crear-noticia__dialogo"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="limpiar-titulo"
            aria-describedby="limpiar-descripcion"
          >
            <h2 id="limpiar-titulo">¿Limpiar formulario?</h2>

            <p id="limpiar-descripcion">
              Se restablecerán el título, el contenido y las imágenes seleccionadas.
            </p>

            <div className="crear-noticia__acciones-dialogo">
              <button
                type="button"
                className="crear-noticia__boton-secundario"
                onClick={() => setConfirmacionLimpiarAbierta(false)}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="crear-noticia__boton-peligro"
                onClick={confirmarLimpieza}
              >
                Limpiar campos
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Overlay de carga */}
      {creacion.guardando && (
        <div
          className="crear-noticia__overlay"
          role="status"
          aria-live="polite"
        >
          <section className="crear-noticia__dialogo crear-noticia__dialogo--carga">
            <span className="crear-noticia__spinner" aria-hidden="true" />
            <h2>Guardando noticia...</h2>
            <p>Por favor, esperá un momento mientras se suben los datos.</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default FormularioNoticia;
