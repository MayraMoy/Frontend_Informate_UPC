import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiltrosResoluciones } from '../../Components/resoluciones/FiltrosResoluciones';
import { TablaResoluciones } from '../../Components/resoluciones/TablaResoluciones';
import { DocumentosResoluciones } from '../../Components/resoluciones/DocumentosResoluciones';
import { ResolucionCardDestacada } from '../../Components/resoluciones/ResolucionCardDestacada';
import { ModalDetalleResolucion } from '../../Components/resoluciones/ModalDetalleResolucion';
import { ModalEditarResolucion } from '../../Components/resoluciones/ModalEditarResolucion';
import { PaginacionResoluciones } from '../../Components/resoluciones/PaginacionResoluciones';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import AppContext from '../../Context/AppContext';
import { puedeAccederGestion } from '../../hooks/useRoles';
import './ResolucionesPage.css';

/**
 * Página principal del módulo de Resoluciones Académicas (Foro UPC).
 * Conecta con el Backend y cuenta con datos de respaldo que reflejan fielmente el diseño de referencia.
 */
export const ResolucionesPage = ({
  headingLevel = 1,
  mostrarBuscador = true,
  mostrarFiltros = true,
  variante = 'tabla',
}) => {
  const SectionHeading = headingLevel === 2 ? 'h2' : 'h1';
  const { user } = useContext(AppContext);
  const esAdmin = puedeAccederGestion(user);

  // Estados de datos
  const [resoluciones, setResoluciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');
  const [intentoCarga, setIntentoCarga] = useState(0);

  // Estados de filtros
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');
  const [busqueda, setBusqueda] = useState(queryParam || '');
  const [anio, setAnio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    if (typeof queryParam === 'string') {
      setBusqueda(queryParam);
      setPaginaActual(1);
    }
  }, [queryParam]);

  // Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const resolucionesPorPagina = 3;

  // Estado del modal de detalle
  const [resolucionSeleccionada, setResolucionSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Estado del modal de edición de administrador
  const [resolucionAEditar, setResolucionAEditar] = useState(null);
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

  // Carga resoluciones y categorías desde el backend.
  useEffect(() => {
    let activa = true;

    const cargarDatos = async () => {
      setCargando(true);
      setErrorCarga('');

      try {
        const [resBackend, catBackend] = await Promise.all([
          user
            ? resolucionesService.obtenerTodas()
            : resolucionesService.listar6Resoluciones(),
          categoriasResolucionService.obtenerTodas(),
        ]);

        if (!Array.isArray(resBackend) || !Array.isArray(catBackend)) {
          throw new Error('El backend devolvió un formato de datos inesperado.');
        }

        if (!activa) return;

        // Regla de Negocio: Los usuarios sin sesión iniciada solo pueden ver resoluciones aprobadas (VIGENTE).
        const resolucionesFinales = user
          ? resBackend
          : resBackend.filter((r) => String(r.estado).toUpperCase() === 'VIGENTE');

        setResoluciones(resolucionesFinales);
        setCategorias(catBackend);
      } catch (err) {
        if (!activa) return;
        setErrorCarga(
          err instanceof Error
            ? err.message
            : 'No se pudieron cargar las resoluciones desde el backend.',
        );
      } finally {
        if (activa) setCargando(false);
      }
    };

    cargarDatos();

    return () => {
      activa = false;
    };
  }, [intentoCarga, user]);

  // Lista de años disponibles basados en las resoluciones
  const aniosDisponibles = useMemo(() => {
    const aniosSet = new Set();
    resoluciones.forEach((res) => {
      if (res.fechaCreacion) {
        const year = new Date(res.fechaCreacion).getFullYear();
        if (!isNaN(year)) aniosSet.add(year);
      }
    });
    return Array.from(aniosSet).sort((a, b) => b - a);
  }, [resoluciones]);

  // Filtrado reactivo en memoria
  const resolucionesFiltradas = useMemo(() => {
    return resoluciones.filter((res) => {
      // 1. Filtro por texto libre (busca en número, título o descripción)
      const q = busqueda.trim().toLowerCase();
      if (q) {
        const matchNumero = res.numeroResolucion?.toLowerCase().includes(q);
        const matchTitulo = res.titulo?.toLowerCase().includes(q);
        const matchDesc = res.descripcion?.toLowerCase().includes(q);
        if (!matchNumero && !matchTitulo && !matchDesc) return false;
      }

      // 2. Filtro por año
      if (anio) {
        const resYear = new Date(res.fechaCreacion).getFullYear();
        if (String(resYear) !== String(anio)) return false;
      }

      // 3. Filtro por categoría
      if (categoria) {
        const resCat = (res.nombreCategoria || '').toLowerCase();
        if (resCat !== categoria.toLowerCase()) return false;
      }

      // 4. Filtro por estado
      if (estado) {
        const resEstado = (res.estado || '').toLowerCase();
        if (resEstado !== estado.toLowerCase()) return false;
      }

      return true;
    });
  }, [resoluciones, busqueda, anio, categoria, estado]);

  // Cálculo de paginación
  const totalPaginas = Math.ceil(resolucionesFiltradas.length / resolucionesPorPagina) || 1;
  const indiceInicio = (paginaActual - 1) * resolucionesPorPagina;
  const resolucionesPaginadas = resolucionesFiltradas.slice(indiceInicio, indiceInicio + resolucionesPorPagina);

  // Resoluciones para la sección de recientes o destacadas
  const resolucionesDestacadas = useMemo(() => {
    return resoluciones.slice(3, 5);
  }, [resoluciones]);

  // Handler para resetear todos los filtros
  const handleLimpiarFiltros = () => {
    setBusqueda('');
    setAnio('');
    setCategoria('');
    setEstado('');
    setPaginaActual(1);
  };

  // Abrir modal de detalle
  const handleVerDetalle = (res) => {
    setResolucionSeleccionada(res);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setResolucionSeleccionada(null);
    setModalAbierto(false);
  };

  // Abrir modal de edición
  const handleEditarResolucion = (res) => {
    setResolucionAEditar(res);
    setModalEdicionAbierto(true);
  };

  const handleCerrarModalEdicion = () => {
    setResolucionAEditar(null);
    setModalEdicionAbierto(false);
  };

  // Callback cuando se guarda la edición exitosamente
  const handleGuardadoExitoso = () => {
    setIntentoCarga((prev) => prev + 1);
  };

  return (
    <section id="resoluciones" className="resoluciones-page-container" aria-labelledby="resoluciones-titulo">
      {/* 1. Encabezado Institucional */}
      <header className="resoluciones-header">
        <div className="resoluciones-header-content">
          <SectionHeading id="resoluciones-titulo" className="resoluciones-main-title">
            {user ? 'Resoluciones Académicas' : 'Ver Últimas Resoluciones'}
          </SectionHeading>
        </div>
        {user ? (
          <Link className="resoluciones-more-link" to="/resoluciones">
            Ver todas las resoluciones <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <Link className="resoluciones-more-link" to="/login">
            Saber más <span aria-hidden="true">→</span>
          </Link>
        )}
      </header>

      {/* 2. Barra de Búsqueda y Filtros Avanzados */}
      {mostrarFiltros && (
        <FiltrosResoluciones
          busqueda={busqueda}
          setBusqueda={(val) => { setBusqueda(val); setPaginaActual(1); }}
          anio={anio}
          setAnio={(val) => { setAnio(val); setPaginaActual(1); }}
          aniosDisponibles={aniosDisponibles}
          categoria={categoria}
          setCategoria={(val) => { setCategoria(val); setPaginaActual(1); }}
          categorias={categorias}
          estado={estado}
          setEstado={(val) => { setEstado(val); setPaginaActual(1); }}
          onLimpiarFiltros={handleLimpiarFiltros}
          esPublico={!user}
          mostrarBuscador={mostrarBuscador}
        />
      )}

      {/* 3. Indicador de carga o Tabla Principal */}
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: 'var(--color-primary-orange)' }} role="status">
            <span className="visually-hidden">Cargando resoluciones...</span>
          </div>
        </div>
      ) : errorCarga ? (
        <div className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3" role="alert">
          <span>No se pudieron cargar los datos desde el backend: {errorCarga}</span>
          <button
            type="button"
            className="btn btn-outline-danger resolucion-retry flex-shrink-0"
            onClick={() => setIntentoCarga((intento) => intento + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          {variante === 'documentos' ? (
            <DocumentosResoluciones
              resoluciones={resolucionesPaginadas}
              onVerDetalle={handleVerDetalle}
              onEditar={handleEditarResolucion}
              esAdmin={esAdmin}
            />
          ) : (
            <TablaResoluciones
              resoluciones={resolucionesPaginadas}
              onVerDetalle={handleVerDetalle}
              onEditar={handleEditarResolucion}
              esAdmin={esAdmin}
            />
          )}

          {/* Sección de Resoluciones Destacadas o Recientes (solo en vista tabla completa) */}
          {variante !== 'documentos' && resolucionesDestacadas.length > 0 && !busqueda && !anio && !categoria && !estado && (
            <section className="seccion-destacadas mb-4">
              <div className="row g-3">
                {resolucionesDestacadas.map((item) => (
                  <div className="col-12 col-md-6" key={item.idResolucion || item.codigoResolucion}>
                    <ResolucionCardDestacada
                      resolucion={item}
                      onVerDetalle={handleVerDetalle}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Paginación */}
          <PaginacionResoluciones
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={(nuevaPag) => setPaginaActual(nuevaPag)}
          />
        </>
      )}

      {/* 4. Modal Detalle de Resolución */}
      <ModalDetalleResolucion
        resolucion={resolucionSeleccionada}
        isOpen={modalAbierto}
        onClose={handleCerrarModal}
        onEditar={handleEditarResolucion}
        esAdmin={esAdmin}
      />

      {/* 5. Modal de Edición de Administrador */}
      {modalEdicionAbierto && (
        <ModalEditarResolucion
          resolucion={resolucionAEditar}
          categorias={categorias}
          isOpen={modalEdicionAbierto}
          onClose={handleCerrarModalEdicion}
          onGuardadoExitoso={handleGuardadoExitoso}
        />
      )}
    </section>
  );
};

export default ResolucionesPage;
