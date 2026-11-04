import { useState, useEffect } from 'react';
import { comentariosService } from '../../../Services/resoluciones/comentariosService.js';
import { resolucionesService } from '../../../Services/resoluciones/resolucionesService.js';
import { listarNoticiasPublicadas } from '../../../Services/noticias/noticiasServices.js';

export const useDetalleUsuarioActividad = (usuario, onCopiarEmail) => {
  const [pestanaActiva, setPestanaActiva] = useState('comentarios');
  const [copiado, setCopiado] = useState(false);
  const [cargandoActividad, setCargandoActividad] = useState(true);

  const [comentarios, setComentarios] = useState([]);
  const [resoluciones, setResoluciones] = useState([]);
  const [noticias, setNoticias] = useState([]);

  const nombreCompleto = usuario
    ? `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario'
    : '';
  const inicial = (usuario?.nombre || 'U').charAt(0).toUpperCase();
  const rol = (usuario?.nombreRol || usuario?.rol?.nombre || 'ESTUDIANTE').toUpperCase();
  const estado = (usuario?.estado || 'ACTIVO').toUpperCase();
  const esEstudiante = rol === 'ESTUDIANTE';

  useEffect(() => {
    if (!usuario) return;

    let cancelado = false;
    setCargandoActividad(true);

    const userId = usuario.idUsuario || usuario.id;
    const userEmail = (usuario.email || '').toLowerCase().trim();
    const userNombre = nombreCompleto.toLowerCase();

    Promise.allSettled([
      comentariosService.obtenerTodos(),
      resolucionesService.obtenerTodas(),
      listarNoticiasPublicadas(),
    ]).then(([resComentarios, resResoluciones, resNoticias]) => {
      if (cancelado) return;

      // 1. Filtrar Comentarios en resoluciones
      if (resComentarios.status === 'fulfilled' && Array.isArray(resComentarios.value)) {
        const filtrados = resComentarios.value.filter((c) => {
          const matchId = c.idUsuario && String(c.idUsuario) === String(userId);
          const matchEmail = c.emailUsuario && c.emailUsuario.toLowerCase().trim() === userEmail;
          return matchId || matchEmail;
        });
        setComentarios(filtrados);
        if (filtrados.length === 0 && !esEstudiante) {
          setPestanaActiva('info');
        }
      }

      // 2. Filtrar Resoluciones oficiales creadas
      if (resResoluciones.status === 'fulfilled' && Array.isArray(resResoluciones.value)) {
        const filtradas = resResoluciones.value.filter((r) => {
          const matchId = r.idAutor && String(r.idAutor) === String(userId);
          const matchObj = r.autor?.id && String(r.autor.id) === String(userId);
          return matchId || matchObj;
        });
        setResoluciones(filtradas);
      }

      // 3. Filtrar Noticias redactadas
      if (resNoticias.status === 'fulfilled') {
        const lista = Array.isArray(resNoticias.value)
          ? resNoticias.value
          : resNoticias.value?.content || resNoticias.value?.data || [];

        const filtradas = lista.filter((n) => {
          const matchId =
            (n.idAutor && String(n.idAutor) === String(userId)) ||
            (n.usuarioId && String(n.usuarioId) === String(userId));
          const matchNombre = n.autor && String(n.autor).toLowerCase().includes(userNombre);
          return matchId || matchNombre;
        });
        setNoticias(filtradas);
      }
    }).finally(() => {
      if (!cancelado) setCargandoActividad(false);
    });

    return () => {
      cancelado = true;
    };
  }, [usuario, nombreCompleto, esEstudiante]);

  const handleCopiarEmail = (e) => {
    e?.stopPropagation();
    if (!usuario?.email) return;
    navigator.clipboard.writeText(usuario.email);
    onCopiarEmail?.(usuario.email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return 'Sin registro';
    try {
      return new Date(fechaStr).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return fechaStr;
    }
  };

  const formatearSoloFecha = (fechaStr) => {
    if (!fechaStr) return 'Reciente';
    try {
      return new Date(fechaStr).toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return fechaStr;
    }
  };

  return {
    pestanaActiva,
    setPestanaActiva,
    copiado,
    handleCopiarEmail,
    cargandoActividad,
    comentarios,
    resoluciones,
    noticias,
    nombreCompleto,
    inicial,
    rol,
    estado,
    esEstudiante,
    formatearFecha,
    formatearSoloFecha,
  };
};

export default useDetalleUsuarioActividad;

