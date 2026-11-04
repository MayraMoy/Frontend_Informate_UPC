import { useState, useEffect } from 'react';
import { comentariosService } from '../../../Services/resoluciones/comentariosService.js';
import { resolucionesService } from '../../../Services/resoluciones/resolucionesService.js';
import {
  listarNoticiasPublicadas,
  listarNoticiasPendientes,
} from '../../../Services/noticias/noticiasServices.js';

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

    const userId = usuario.idUsuario ?? usuario.id;
    const strUserId = userId != null ? String(userId) : '';
    const userEmail = (usuario.email || '').toLowerCase().trim();
    const userNombre = nombreCompleto.toLowerCase().trim();
    const userNombreSimple = (usuario.nombre || '').toLowerCase().trim();
    const userApellidoSimple = (usuario.apellido || '').toLowerCase().trim();

    Promise.allSettled([
      comentariosService.obtenerTodos(),
      resolucionesService.obtenerTodas(),
      listarNoticiasPublicadas(),
      listarNoticiasPendientes().catch(() => []),
    ]).then(([resComentarios, resResoluciones, resNoticiasPub, resNoticiasPen]) => {
      if (cancelado) return;

      // 1. Filtrar Comentarios en resoluciones
      if (resComentarios.status === 'fulfilled' && Array.isArray(resComentarios.value)) {
        const filtrados = resComentarios.value.filter((c) => {
          const matchId = strUserId && c.idUsuario && String(c.idUsuario) === strUserId;
          const matchEmail = c.emailUsuario && c.emailUsuario.toLowerCase().trim() === userEmail;
          return matchId || matchEmail;
        });
        setComentarios(filtrados);
      }

      // 2. Filtrar Resoluciones oficiales creadas
      if (resResoluciones.status === 'fulfilled' && Array.isArray(resResoluciones.value)) {
        const filtradas = resResoluciones.value.filter((r) => {
          const idAutor =
            r.idAutor ??
            r.autorId ??
            r.idUsuario ??
            r.usuarioId ??
            r.autor?.id ??
            r.autor?.idUsuario ??
            r.usuario?.id ??
            r.usuario?.idUsuario ??
            (typeof r.autor === 'number' ? r.autor : null);

          if (strUserId && idAutor != null && String(idAutor) === strUserId) {
            return true;
          }

          const autorTexto =
            typeof r.autor === 'object' && r.autor !== null
              ? `${r.autor.nombre || ''} ${r.autor.apellido || ''} ${r.autor.email || ''}`.toLowerCase()
              : typeof r.autor === 'string'
              ? r.autor.toLowerCase()
              : '';

          if (userEmail && autorTexto.includes(userEmail)) return true;
          if (userNombre && autorTexto.includes(userNombre)) return true;
          return false;
        });
        setResoluciones(filtradas);
      }

      // 3. Filtrar Noticias redactadas (Publicadas + Pendientes / Borradores)
      const noticiasBrutas = [];
      if (resNoticiasPub.status === 'fulfilled') {
        const listaPub = Array.isArray(resNoticiasPub.value)
          ? resNoticiasPub.value
          : resNoticiasPub.value?.content || resNoticiasPub.value?.data || [];
        noticiasBrutas.push(...listaPub);
      }
      if (resNoticiasPen.status === 'fulfilled') {
        const listaPen = Array.isArray(resNoticiasPen.value)
          ? resNoticiasPen.value
          : resNoticiasPen.value?.content || resNoticiasPen.value?.data || [];
        noticiasBrutas.push(...listaPen);
      }

      // Deduplicar noticias por ID
      const idsVistos = new Set();
      const noticiasUnicas = noticiasBrutas.filter((item) => {
        const idNot = item.id ?? item.idNoticia;
        if (!idNot) return true;
        if (idsVistos.has(idNot)) return false;
        idsVistos.add(idNot);
        return true;
      });

      const noticiasUsuario = noticiasUnicas.filter((n) => {
        // Coincidencia por ID de autor/usuario
        const idCandidatos = [
          n.idAutor,
          n.autorId,
          n.usuarioId,
          n.idUsuario,
          n.autor?.id,
          n.autor?.idUsuario,
          n.usuario?.id,
          n.usuario?.idUsuario,
          typeof n.autor === 'number' ? n.autor : null,
          typeof n.usuario === 'number' ? n.usuario : null,
        ];
        if (strUserId && idCandidatos.some((id) => id != null && String(id) === strUserId)) {
          return true;
        }

        // Coincidencia por Email
        const emailCandidatos = [
          n.autor?.email,
          n.usuario?.email,
          typeof n.autor === 'string' && n.autor.includes('@') ? n.autor : null,
          typeof n.usuario === 'string' && n.usuario.includes('@') ? n.usuario : null,
        ].map((e) => (e ? String(e).toLowerCase().trim() : null));

        if (userEmail && emailCandidatos.some((e) => e && e === userEmail)) {
          return true;
        }

        // Coincidencia por Nombre y Apellido
        const nombreObjAutor =
          typeof n.autor === 'object' && n.autor !== null
            ? `${n.autor.nombre || ''} ${n.autor.apellido || ''}`.trim()
            : typeof n.autor === 'string'
            ? n.autor.trim()
            : '';

        const nombreObjUsuario =
          typeof n.usuario === 'object' && n.usuario !== null
            ? `${n.usuario.nombre || ''} ${n.usuario.apellido || ''}`.trim()
            : typeof n.usuario === 'string'
            ? n.usuario.trim()
            : '';

        const nombresAComparar = [
          nombreObjAutor,
          nombreObjUsuario,
          n.nombreAutor,
          n.autorNombre,
        ]
          .filter(Boolean)
          .map((nom) => String(nom).toLowerCase().trim());

        if (userNombre && nombresAComparar.some((nom) => nom.includes(userNombre))) {
          return true;
        }
        if (
          userNombreSimple &&
          userApellidoSimple &&
          nombresAComparar.some(
            (nom) => nom.includes(userNombreSimple) && nom.includes(userApellidoSimple)
          )
        ) {
          return true;
        }

        return false;
      });

      setNoticias(noticiasUsuario);

      // Si no tiene comentarios pero sí noticias o resoluciones, ajustar pestaña
      if (
        filtradosComentariosDefault(comentarios, noticiasUsuario, esEstudiante) === 'noticias'
      ) {
        setPestanaActiva('noticias');
      }
    }).finally(() => {
      if (!cancelado) setCargandoActividad(false);
    });

    return () => {
      cancelado = true;
    };
  }, [usuario, nombreCompleto, esEstudiante]);

  const filtradosComentariosDefault = (coms, nots, estudiante) => {
    if (coms.length > 0 || estudiante) return 'comentarios';
    if (nots.length > 0) return 'noticias';
    return 'info';
  };

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
