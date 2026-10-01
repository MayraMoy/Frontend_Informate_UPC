import React, { useState, useEffect, useMemo } from 'react';
import { FiltrosResoluciones } from '../../Components/resoluciones/FiltrosResoluciones';
import { TablaResoluciones } from '../../Components/resoluciones/TablaResoluciones';
import { ResolucionCardDestacada } from '../../Components/resoluciones/ResolucionCardDestacada';
import { ModalDetalleResolucion } from '../../Components/resoluciones/ModalDetalleResolucion';
import { PaginacionResoluciones } from '../../Components/resoluciones/PaginacionResoluciones';
import { resolucionesService } from '../../Services/resoluciones/resolucionesService';
import { categoriasResolucionService } from '../../Services/resoluciones/categoriasResolucionService';
import { resolucionesMock, categoriasMock } from './data/resolucionesMock';
import './ResolucionesPage.css';

/**
 * Página principal del módulo de Resoluciones Académicas (Foro UPC).
 * Conecta con el Backend y cuenta con datos de respaldo que reflejan fielmente el diseño de referencia.
 */
export const ResolucionesPage = () => {
  // Estados de datos
  const [resoluciones, setResoluciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados de filtros
  const [busqueda, setBusqueda] = useState('');
  const [anio, setAnio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState('');

  // Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const resolucionesPorPagina = 3;

  // Estado del modal de detalle
  const [resolucionSeleccionada, setResolucionSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Carga inicial de datos desde Backend con fallback en Mock
  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        // Intenta obtener datos reales del Backend
        const [resBackend, catBackend] = await Promise.allSettled([
          resolucionesService.obtenerTodas(),
          categoriasResolucionService.obtenerTodas()
        ]);

        if (resBackend.status === 'fulfilled' && Array.isArray(resBackend.value) && resBackend.value.length > 0) {
          setResoluciones(resBackend.value);
        } else {
          setResoluciones(resolucionesMock);
        }

        if (catBackend.status === 'fulfilled' && Array.isArray(catBackend.value) && catBackend.value.length > 0) {
          setCategorias(catBackend.value);
        } else {
          setCategorias(categoriasMock);
        }
      } catch (err) {
        console.warn('Aviso: Utilizando datos mock de resoluciones por indisponibilidad del backend:', err);
        setResoluciones(resolucionesMock);
        setCategorias(categoriasMock);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

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

  return (
    <main className="resoluciones-page-container">
      {/* 1. Encabezado Institucional */}
      <header className="resoluciones-header">
        <span className="resoluciones-tag-eyebrow">
          COMUNIDAD UNIVERSITARIA
        </span>
        <h1 className="resoluciones-main-title">
          Resoluciones Académicas
        </h1>
        <p className="resoluciones-subtitle">
          Consulta y descarga las disposiciones oficiales, normativas y actas del Consejo Superior de la Universidad Provincial de Córdoba.
        </p>
      </header>

      {/* 2. Barra de Búsqueda y Filtros Avanzados */}
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
      />

      {/* 3. Indicador de carga o Tabla Principal */}
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: 'var(--color-primary-orange)' }} role="status">
            <span className="visually-hidden">Cargando resoluciones...</span>
          </div>
        </div>
      ) : (
        <>
          <TablaResoluciones
            resoluciones={resolucionesPaginadas}
            onVerDetalle={handleVerDetalle}
          />

          {/* Sección de Resoluciones Destacadas o Recientes */}
          {resolucionesDestacadas.length > 0 && !busqueda && !anio && !categoria && !estado && (
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
      />
    </main>
  );
};

export default ResolucionesPage;
