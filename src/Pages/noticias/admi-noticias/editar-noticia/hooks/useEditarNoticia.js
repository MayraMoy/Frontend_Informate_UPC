import { useState, useEffect, useRef, useCallback } from 'react';
import { tieneRolAdministrador } from '../../../../../hooks/useRoles';
import {
  consultarNoticia,
  editarNoticia,
  listarNoticiasPublicadas,
} from '../../../../../Services/noticias/noticiasServices';
import {
  agregarImagen,
  modificarImagen,
  eliminarImagen,
  consultarImagenesPorNoticia,
} from '../../../../../Services/noticias/imagenesServices';
import archivoService from '../../../../../Services/archivos/archivoService';
import { LIMITES_EDICION } from '../data/editarNoticiaData';
import { normalizarImagenes, formatearImagenesParaPreview } from '../utils/imagenHelpers';
import { resolverCategoriaId } from '../utils/categoriaHelpers';
import { validarEdicionNoticia } from '../utils/validarEdicionNoticia';

export { normalizarImagenes, resolverCategoriaId };

/**
 * Hook centralizado para la gestión del estado, validación y persistencia
 * en el módulo de edición de noticias institucionales.
 */
export const useEditarNoticia = (id, user, categorias = [], noticiaInicial = null) => {
  const esAdmin = tieneRolAdministrador(user);

  // Estados de carga e información original
  const [cargandoNoticia, setCargandoNoticia] = useState(!noticiaInicial);
  const [errorCarga, setErrorCarga] = useState('');
  const [noticiaOriginal, setNoticiaOriginal] = useState(noticiaInicial);

  // Estados de formulario
  const [titulo, setTitulo] = useState(noticiaInicial?.titulo || '');
  const [cuerpo, setCuerpo] = useState(noticiaInicial?.cuerpo || '');
  const [categoriaId, setCategoriaId] = useState(() => resolverCategoriaId(noticiaInicial, categorias));
  const [estado, setEstado] = useState(
    noticiaInicial?.estado ? String(noticiaInicial.estado).toUpperCase() : 'BORRADOR'
  );

  // Estados de imágenes
  const [imagenesExistentes, setImagenesExistentes] = useState(() => {
    const raw =
      noticiaInicial?.imagenes ||
      noticiaInicial?.imagenNoticias ||
      noticiaInicial?.imagenesNoticias ||
      noticiaInicial?.imagen;
    return normalizarImagenes(raw);
  });
  const [nuevasImagenes, setNuevasImagenes] = useState([]);
  const [imagenesAEliminar, setImagenesAEliminar] = useState([]);
  const [errorImagenes, setErrorImagenes] = useState('');

  // Estados de validación y guardado
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const siguienteIdNuevo = useRef(0);

  // Cargar noticia desde el backend
  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        if (!noticiaInicial) {
          setCargandoNoticia(true);
        }
        setErrorCarga('');
        const data = await consultarNoticia(id);

        if (!activo) return;

        // Intentar resolver la categoría con data, noticiaInicial o fallback de listado público
        let idCat = resolverCategoriaId(data, categorias);
        if (!idCat && noticiaInicial) {
          idCat = resolverCategoriaId(noticiaInicial, categorias);
        }
        if (!idCat) {
          try {
            const listaPublicas = await listarNoticiasPublicadas();
            const coincidencia = (Array.isArray(listaPublicas) ? listaPublicas : []).find(
              (n) => String(n.id) === String(id)
            );
            if (coincidencia) {
              idCat = resolverCategoriaId(coincidencia, categorias);
            }
          } catch (errLista) {
            console.warn('Fallback de categoría en lista de noticias:', errLista);
          }
        }

        // Preservar autor y datos de trazabilidad previos si el endpoint puntual vino sin ellos
        let autorResuelto =
          data?.autor ||
          noticiaInicial?.autor ||
          data?.usuario ||
          noticiaInicial?.usuario;

        let nombreAutorResuelto =
          data?.nombreAutor ||
          noticiaInicial?.nombreAutor;

        let idAutorResuelto =
          data?.idAutor ||
          noticiaInicial?.idAutor ||
          data?.autorId ||
          noticiaInicial?.autorId ||
          (typeof autorResuelto === 'number' ? autorResuelto : autorResuelto?.id);

        if (!autorResuelto && !nombreAutorResuelto && id) {
          try {
            const listaPublicas = await listarNoticiasPublicadas();
            const coincidencia = (Array.isArray(listaPublicas) ? listaPublicas : []).find(
              (n) => String(n.id) === String(id)
            );
            if (coincidencia) {
              autorResuelto = coincidencia.autor || coincidencia.usuario;
              nombreAutorResuelto = coincidencia.nombreAutor || coincidencia.autorNombre;
              idAutorResuelto = coincidencia.idAutor || coincidencia.autorId || coincidencia.autor?.id;
            }
          } catch (errLista) {
            console.warn('Fallback de autor en lista de noticias:', errLista);
          }
        }

        const noticiaCombinada = {
          ...(noticiaInicial || {}),
          ...data,
          autor: autorResuelto || data?.autor || noticiaInicial?.autor,
          nombreAutor: nombreAutorResuelto || data?.nombreAutor || noticiaInicial?.nombreAutor,
          idAutor: idAutorResuelto || data?.idAutor || noticiaInicial?.idAutor,
          ...(idCat ? { categoriaId: idCat } : {}),
        };

        setNoticiaOriginal(noticiaCombinada);
        setTitulo(data.titulo || noticiaInicial?.titulo || '');
        setCuerpo(data.cuerpo || noticiaInicial?.cuerpo || '');

        if (idCat) {
          setCategoriaId(String(idCat));
        }

        const estadoNoticia =
          data.estado || noticiaInicial?.estado || 'PUBLICADA';
        setEstado(String(estadoNoticia).toUpperCase());

        // 1. Extraer imágenes de data o de noticiaInicial
        let imgsFinales = normalizarImagenes(
          data.imagenes || data.imagenNoticias || data.imagenesNoticias || data.imagen
        );

        if (imgsFinales.length === 0 && noticiaInicial) {
          imgsFinales = normalizarImagenes(
            noticiaInicial.imagenes ||
            noticiaInicial.imagenNoticias ||
            noticiaInicial.imagenesNoticias ||
            noticiaInicial.imagen
          );
        }

        // 2. Si aún no hay imágenes, consultar el endpoint específico de imágenes de la noticia
        if (imgsFinales.length === 0 && id) {
          try {
            const respImgs = await consultarImagenesPorNoticia(id);
            const rawImgs = Array.isArray(respImgs)
              ? respImgs
              : Array.isArray(respImgs?.data)
              ? respImgs.data
              : [];
            const imgsNormalizadas = normalizarImagenes(rawImgs);
            if (imgsNormalizadas.length > 0) {
              imgsFinales = imgsNormalizadas;
            }
          } catch (errImgs) {
            console.warn('No se encontraron imágenes en consultarImagenesPorNoticia:', errImgs);
          }
        }

        // 3. Fallback de imágenes en listado de noticias públicas
        if (imgsFinales.length === 0 && id) {
          try {
            const listaPublicas = await listarNoticiasPublicadas();
            const coincidencia = (Array.isArray(listaPublicas) ? listaPublicas : []).find(
              (n) => String(n.id) === String(id)
            );
            if (coincidencia) {
              const imgsPub = normalizarImagenes(
                coincidencia.imagenes ||
                coincidencia.imagenNoticias ||
                coincidencia.imagenesNoticias ||
                coincidencia.imagen
              );
              if (imgsPub.length > 0) {
                imgsFinales = imgsPub;
              }
            }
          } catch (errLista) {
            console.warn('Fallback de imágenes en lista de noticias:', errLista);
          }
        }

        if (imgsFinales.length > 0) {
          setImagenesExistentes(imgsFinales);
        }
      } catch (err) {
        if (!activo) return;
        console.error('Error al cargar noticia:', err);
        if (!noticiaInicial) {
          setErrorCarga('No se pudo cargar la información de la noticia solicitada.');
        }
      } finally {
        if (activo) setCargandoNoticia(false);
      }
    };

    if (id) {
      cargar();
    }

    return () => {
      activo = false;
    };
  }, [id]);

  // Sincronizar y resolver categoriaId cuando lleguen las categorías de la API
  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setCategoriaId((catActual) => {
        const obtenerId = (c) =>
          String(
            c?.id ??
            c?.idCategoria ??
            c?.id_categoria ??
            c?.idCategoriaNoticia ??
            c?.id_categoria_noticia ??
            ''
          ).trim();

        // 1. Si el id actual ya coincide exactamente con una categoría cargada, conservarlo
        const coincideId = categorias.some((c) => obtenerId(c) === String(catActual));
        if (coincideId) return catActual;

        // 2. Si el valor actual era un nombre textual, buscarlo por nombre
        if (catActual) {
          const normalizar = (txt) =>
            String(txt || '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .trim()
              .toLowerCase();
          const porNombre = categorias.find((c) => normalizar(c.nombre) === normalizar(catActual));
          if (porNombre) {
            return obtenerId(porNombre);
          }
        }

        // 3. Resolver desde noticiaOriginal o noticiaInicial
        const objeto = noticiaOriginal || noticiaInicial;
        if (objeto) {
          const resuelto = resolverCategoriaId(objeto, categorias);
          if (resuelto) return String(resuelto);
        }

        return catActual;
      });
    }
  }, [categorias, noticiaOriginal, noticiaInicial]);

  // Limpiar URLs de preview al desmontar
  useEffect(() => {
    return () => {
      nuevasImagenes.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, [nuevasImagenes]);

  const totalImagenes = imagenesExistentes.length + nuevasImagenes.length;
  const limiteAlcanzado = totalImagenes >= LIMITES_EDICION.maxImagenes;

  // Modificadores de campos básicos
  const manejarCambioTitulo = (nuevoTitulo) => {
    setTitulo(nuevoTitulo);
    if (errores.titulo) {
      setErrores((prev) => ({ ...prev, titulo: '' }));
    }
  };

  const manejarCambioCuerpo = (nuevoCuerpo) => {
    setCuerpo(nuevoCuerpo);
    if (errores.cuerpo) {
      setErrores((prev) => ({ ...prev, cuerpo: '' }));
    }
  };

  const manejarCambioCategoria = (nuevaCategoriaId) => {
    setCategoriaId(nuevaCategoriaId);
    if (errores.categoriaId) {
      setErrores((prev) => ({ ...prev, categoriaId: '' }));
    }
  };

  const manejarCambioEstado = (nuevoEstado) => {
    if (esAdmin) {
      setEstado(nuevoEstado);
    }
  };

  // Manejadores de imágenes
  const manejarAgregarImagenes = (archivosSeleccionados) => {
    const archivos = Array.from(archivosSeleccionados || []);
    const disponibles = LIMITES_EDICION.maxImagenes - totalImagenes;
    const nuevos = [];
    const erroresSubida = [];

    if (archivos.length > disponibles) {
      erroresSubida.push(`Solo podés agregar ${disponibles} imagen(es) más.`);
    }

    for (const archivo of archivos.slice(0, disponibles)) {
      if (!LIMITES_EDICION.tiposPermitidos.includes(archivo.type)) {
        erroresSubida.push(`${archivo.name}: formato no permitido (usá JPG, PNG o WEBP).`);
        continue;
      }

      if (archivo.size > LIMITES_EDICION.maxTamanoBytes) {
        erroresSubida.push(`${archivo.name}: supera el límite de 5 MB.`);
        continue;
      }

      const preview = URL.createObjectURL(archivo);
      nuevos.push({
        tempId: ++siguienteIdNuevo.current,
        archivo,
        epigrafe: '',
        preview,
      });
    }

    if (nuevos.length > 0) {
      setNuevasImagenes((prev) => [...prev, ...nuevos]);
    }

    setErrorImagenes(erroresSubida.join(' '));
  };

  const manejarCambioEpigrafeExistente = (idImg, epigrafe) => {
    setImagenesExistentes((prev) => {
      const actualizadas = prev.map((img) => (img.id === idImg ? { ...img, epigrafe } : img));
      const todasCompletas =
        actualizadas.every((img) => (img.epigrafe || '').trim().length > 0) &&
        nuevasImagenes.every((img) => (img.epigrafe || '').trim().length > 0);

      if (todasCompletas && errorImagenes.toLowerCase().includes('epígrafe')) {
        setErrorImagenes('');
      }
      return actualizadas;
    });
  };

  const manejarCambioEpigrafeNueva = (tempId, epigrafe) => {
    setNuevasImagenes((prev) => {
      const actualizadas = prev.map((img) => (img.tempId === tempId ? { ...img, epigrafe } : img));
      const todasCompletas =
        imagenesExistentes.every((img) => (img.epigrafe || '').trim().length > 0) &&
        actualizadas.every((img) => (img.epigrafe || '').trim().length > 0);

      if (todasCompletas && errorImagenes.toLowerCase().includes('epígrafe')) {
        setErrorImagenes('');
      }
      return actualizadas;
    });
  };

  const manejarEliminarExistente = (idImg) => {
    setImagenesExistentes((prev) => {
      const filtradas = prev.filter((img) => img.id !== idImg);
      const todasCompletas =
        filtradas.every((img) => (img.epigrafe || '').trim().length > 0) &&
        nuevasImagenes.every((img) => (img.epigrafe || '').trim().length > 0);

      if (todasCompletas) setErrorImagenes('');
      return filtradas;
    });
    setImagenesAEliminar((prev) => [...prev, idImg]);
  };

  const manejarEliminarNueva = (tempId) => {
    setNuevasImagenes((prev) => {
      const img = prev.find((i) => i.tempId === tempId);
      if (img?.preview) URL.revokeObjectURL(img.preview);
      const filtradas = prev.filter((i) => i.tempId !== tempId);

      const todasCompletas =
        imagenesExistentes.every((img) => (img.epigrafe || '').trim().length > 0) &&
        filtradas.every((img) => (img.epigrafe || '').trim().length > 0);

      if (todasCompletas) setErrorImagenes('');
      return filtradas;
    });
  };

  // Validación completa delegada a la función utilitaria
  const validarFormulario = useCallback(() => {
    const { esValido, errores: errs, errorImagenes: errImgs } = validarEdicionNoticia({
      titulo,
      cuerpo,
      categoriaId,
      imagenesExistentes,
      nuevasImagenes,
      errorImagenesActual: errorImagenes,
    });

    setErrores(errs);
    setErrorImagenes(errImgs);
    return esValido;
  }, [titulo, cuerpo, categoriaId, imagenesExistentes, nuevasImagenes, errorImagenes]);

  // Guardar cambios
  const guardarCambios = async () => {
    setErrorGuardado('');
    setMensajeExito('');

    if (!validarFormulario()) {
      return false;
    }

    setGuardando(true);

    try {
      // Determinar idAutor requerido por el backend (priorizar el autor original para no sobreescribir la creación)
      const idAutor =
        noticiaOriginal?.idAutor ??
        noticiaOriginal?.autorId ??
        noticiaOriginal?.autor?.id ??
        noticiaOriginal?.autor?.idUsuario ??
        (typeof noticiaOriginal?.autor === 'number' ? noticiaOriginal.autor : null) ??
        noticiaInicial?.idAutor ??
        noticiaInicial?.autorId ??
        noticiaInicial?.autor?.id ??
        noticiaInicial?.autor?.idUsuario ??
        user?.idUsuario ??
        user?.id;

      // 1. Datos base
      const payload = {
        titulo: titulo.trim(),
        cuerpo: cuerpo.trim(),
        categoriaId: Number(categoriaId),
        ...(idAutor ? { idAutor: Number(idAutor), autorId: Number(idAutor) } : {}),
      };

      // Si es ADMINISTRADOR se actualiza el estado; si es PERSONAL_ESCOLAR se mantiene el original
      if (esAdmin && estado) {
        payload.estado = estado;
      } else if (noticiaOriginal?.estado || noticiaInicial?.estado) {
        payload.estado = noticiaOriginal?.estado || noticiaInicial?.estado;
      }

      await editarNoticia(id, payload, idAutor);

      // 2. Eliminar imágenes marcadas
      for (const idImg of imagenesAEliminar) {
        try {
          await eliminarImagen(idImg);
        } catch (errDel) {
          console.warn(`Error al eliminar imagen ${idImg}:`, errDel);
        }
      }

      // 3. Actualizar epígrafes modificados en imágenes existentes
      for (const img of imagenesExistentes) {
        const original = (noticiaOriginal?.imagenes || noticiaInicial?.imagenes || []).find(
          (i) => i.id === img.id
        );
        if (original && original.epigrafe !== img.epigrafe) {
          try {
            await modificarImagen(img.id, {
              url: img.url,
              epigrafe: img.epigrafe.trim(),
              noticiaId: Number(id),
            });
          } catch (errMod) {
            console.warn(`Error al actualizar epígrafe imagen ${img.id}:`, errMod);
          }
        }
      }

      // 4. Subir y vincular nuevas imágenes
      for (const img of nuevasImagenes) {
        const subida = await archivoService.subirImagen(img.archivo);
        if (subida?.url) {
          await agregarImagen(
            {
              url: subida.url,
              epigrafe: img.epigrafe.trim(),
              noticiaId: Number(id),
            },
            Number(id)
          );
        }
      }

      setMensajeExito('¡La noticia se actualizó exitosamente!');
      setNuevasImagenes([]);
      setImagenesAEliminar([]);

      // Recargar datos actualizados conservando el creador original y registrando la edición de esta sesión
      try {
        const actualizada = await consultarNoticia(id);
        setNoticiaOriginal((prev) => ({
          ...(prev || {}),
          ...actualizada,
          // Preservar creador
          autor: prev?.autor || actualizada?.autor,
          nombreAutor: prev?.nombreAutor || actualizada?.nombreAutor,
          idAutor: prev?.idAutor || actualizada?.idAutor,
          // Registrar modificación de la sesión actual
          editor: user,
          usuarioModificacion: user,
          modificadoPor: user,
          fechaActualizacion: new Date().toISOString(),
        }));
        if (Array.isArray(actualizada.imagenes)) {
          setImagenesExistentes(
            actualizada.imagenes.map((img) => ({
              id: img.id,
              url: img.url,
              epigrafe: img.epigrafe || '',
            }))
          );
        }
      } catch (errRecarga) {
        console.warn('Error al recargar noticia tras guardar:', errRecarga);
      }

      return true;
    } catch (err) {
      console.error('Error al guardar noticia:', err);
      const detalle = err?.response?.data;
      const mensaje =
        typeof detalle === 'string'
          ? detalle
          : detalle?.message || err?.message || 'Ocurrió un error al actualizar la noticia.';
      setErrorGuardado(mensaje);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const imagenesParaPreview = formatearImagenesParaPreview(imagenesExistentes, nuevasImagenes);

  return {
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
    limpiarMensajeExito: () => setMensajeExito(''),
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
  };
};

export default useEditarNoticia;
