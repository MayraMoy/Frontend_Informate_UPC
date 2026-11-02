import { useState, useEffect } from 'react';
import { usuarioService } from '../../../../../Services/usuarios/usuarioService';
import { listarNoticiasPublicadas } from '../../../../../Services/noticias/noticiasServices';
import { tieneRolAdministrador, tieneRolPersonalEscuela } from '../../../../../hooks/useRoles';
import {
  extraerNombreUsuario,
  verificarHuboModificacion,
  verificarEstaPublicada,
} from '../utils/trazabilidadHelpers';

/**
 * Hook para resolver la trazabilidad (creador, editor y publicador) de una noticia
 * evitando asignar al usuario de la sesión actual indiscriminadamente a todas las acciones.
 */
export const useTrazabilidadNoticia = (noticia, estadoActual, user) => {
  const puedeVerTrazabilidad = Boolean(user)
    ? tieneRolAdministrador(user) || tieneRolPersonalEscuela(user)
    : true;

  const huboModificacion = verificarHuboModificacion(noticia);
  const estaPublicada = verificarEstaPublicada(noticia, estadoActual);

  const [trazabilidad, setTrazabilidad] = useState({
    creador: '',
    editor: '',
    publicador: '',
  });

  useEffect(() => {
    let activo = true;

    const resolverTrazabilidad = async () => {
      if (!noticia) return;

      // ==========================================
      // A. RESOLVER CREADOR (Autor original)
      // ==========================================
      let cNombre =
        extraerNombreUsuario(noticia?.autor) ||
        extraerNombreUsuario(noticia?.creador) ||
        extraerNombreUsuario(noticia?.usuarioCreacion) ||
        extraerNombreUsuario(noticia?.usuario) ||
        noticia?.nombreAutor ||
        noticia?.autorNombre ||
        '';

      const idCreador =
        noticia?.idAutor ??
        noticia?.autorId ??
        noticia?.autor?.id ??
        noticia?.autor?.idUsuario ??
        (typeof noticia?.autor === 'number' ? noticia.autor : null) ??
        noticia?.creador?.id ??
        noticia?.usuarioCreacion?.id ??
        noticia?.usuarioId ??
        noticia?.idUsuario;

      if (!cNombre && idCreador) {
        if (String(idCreador) === String(user?.idUsuario ?? user?.id)) {
          cNombre = extraerNombreUsuario(user);
        } else {
          try {
            const u = await usuarioService.obtenerPorId(idCreador);
            cNombre = extraerNombreUsuario(u);
          } catch (err) {
            console.warn('No se pudo resolver creador por ID:', err);
          }
        }
      }

      // Fallback 1: Buscar en el listado de noticias públicas
      if (!cNombre && noticia?.id) {
        try {
          const publicadas = await listarNoticiasPublicadas();
          const listaPub = Array.isArray(publicadas) ? publicadas : publicadas?.data || [];
          const coincidencia = listaPub.find((item) => String(item.id) === String(noticia.id));
          if (coincidencia?.autor) {
            cNombre = extraerNombreUsuario(coincidencia.autor);
          }
        } catch (errPub) {
          console.warn('Fallback de autor en listado público:', errPub);
        }
      }

      // Fallback 2: Buscar en todos los usuarios si tenemos idCreador
      if (!cNombre && idCreador) {
        try {
          const todos = await usuarioService.obtenerTodos();
          const listaU = Array.isArray(todos) ? todos : todos?.data || [];
          const matchU = listaU.find((u) => String(u?.id ?? u?.idUsuario ?? '') === String(idCreador));
          if (matchU) {
            cNombre = extraerNombreUsuario(matchU);
          }
        } catch (errTodos) {
          console.warn('Fallback en obtenerTodos para creador:', errTodos);
        }
      }

      // ==========================================
      // B. RESOLVER EDITOR (Quien modificó la noticia)
      // ==========================================
      let eNombre = '';
      if (huboModificacion) {
        eNombre =
          extraerNombreUsuario(noticia?.editor) ||
          extraerNombreUsuario(noticia?.usuarioModificacion) ||
          extraerNombreUsuario(noticia?.usuarioEdicion) ||
          extraerNombreUsuario(noticia?.modificadoPor) ||
          extraerNombreUsuario(noticia?.editadoPor) ||
          noticia?.nombreEditor ||
          noticia?.ultimoEditor ||
          '';

        const idEditor =
          noticia?.editor?.id ??
          noticia?.editor?.idUsuario ??
          noticia?.idEditor ??
          noticia?.idUsuarioModificacion ??
          noticia?.idUsuarioEdicion;

        if (!eNombre && idEditor) {
          if (String(idEditor) === String(user?.idUsuario ?? user?.id)) {
            eNombre = extraerNombreUsuario(user);
          } else {
            try {
              const u = await usuarioService.obtenerPorId(idEditor);
              eNombre = extraerNombreUsuario(u);
            } catch (err) {
              console.warn('No se pudo resolver editor por ID:', err);
            }
          }
        }
      }

      // ==========================================
      // C. RESOLVER PUBLICADOR (Quien publicó)
      // ==========================================
      let pNombre = '';
      if (estaPublicada) {
        pNombre =
          extraerNombreUsuario(noticia?.publicador) ||
          extraerNombreUsuario(noticia?.usuarioPublicacion) ||
          extraerNombreUsuario(noticia?.publicadoPor) ||
          extraerNombreUsuario(noticia?.aprobadoPor) ||
          extraerNombreUsuario(noticia?.usuarioAprobacion) ||
          noticia?.nombrePublicador ||
          '';

        const idPublicador =
          noticia?.publicador?.id ??
          noticia?.publicador?.idUsuario ??
          noticia?.idPublicador ??
          noticia?.idUsuarioPublicacion;

        if (!pNombre && idPublicador) {
          if (String(idPublicador) === String(user?.idUsuario ?? user?.id)) {
            pNombre = extraerNombreUsuario(user);
          } else {
            try {
              const u = await usuarioService.obtenerPorId(idPublicador);
              pNombre = extraerNombreUsuario(u);
            } catch (err) {
              console.warn('No se pudo resolver publicador por ID:', err);
            }
          }
        }

        // Si fue publicada al mismo tiempo que fue creada y no hay publicador explícito separado,
        // quien la publicó fue el autor original (creador)
        if (!pNombre && cNombre) {
          const fPub = noticia?.fechaPublicacion ? new Date(noticia.fechaPublicacion).getTime() : null;
          const fCrea = noticia?.fechaCreacion ? new Date(noticia.fechaCreacion).getTime() : null;
          if (fPub && fCrea && Math.abs(fPub - fCrea) <= 60000) {
            pNombre = cNombre;
          }
        }
      }

      if (activo) {
        setTrazabilidad({
          creador: cNombre,
          editor: eNombre,
          publicador: pNombre,
        });
      }
    };

    resolverTrazabilidad();

    return () => {
      activo = false;
    };
  }, [noticia, huboModificacion, estaPublicada, user]);

  return {
    puedeVerTrazabilidad,
    huboModificacion,
    estaPublicada,
    trazabilidad,
  };
};

export default useTrazabilidadNoticia;
