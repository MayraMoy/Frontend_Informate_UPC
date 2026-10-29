import { useState, useEffect, useMemo } from 'react';
import {
  consultarNoticia,
  listarNoticiasPublicadas,
} from '../../../../Services/noticias/noticiasServices';
import { consultarImagenesPorNoticia } from '../../../../Services/noticias/imagenesServices';
import {
  listarCategoria,
  consultarCategoria,
} from '../../../../Services/noticias/categoriasServices';
import { usuarioService } from '../../../../Services/usuarios/usuarioService';
import { tieneRolAdministrador } from '../../../../hooks/useRoles';
import { resolverCategoriaId } from '../../logeado-noticias/editar-noticia/hooks/useEditarNoticia';

const contarPalabras = (html = '') => {
  if (!html) return 0;
  const texto = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!texto) return 0;
  return texto.split(' ').filter(Boolean).length;
};

const calcularTiempoLectura = (palabras = 0) => {
  if (palabras <= 0) return '1 min de lectura';
  const minutos = Math.ceil(palabras / 200);
  return `${minutos} min de lectura`;
};

const formatearFechaLegible = (fechaStr, incluirHora = false) => {
  if (!fechaStr) return '';
  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return '';

  const dia = fecha.getDate();
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();

  if (!incluirHora) {
    return `${dia} de ${mes} de ${anio}`;
  }

  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${dia} de ${mes} de ${anio} • ${horas}:${minutos} hs`;
};

const extraerImagenes = (obj) => {
  if (!obj) return [];
  const candidatas =
    obj.imagenes ||
    obj.imagenNoticias ||
    obj.imagenesNoticias ||
    obj.imagenesList ||
    obj.imagen ||
    [];

  const lista = Array.isArray(candidatas) ? candidatas : candidatas ? [candidatas] : [];

  return lista
    .map((img, idx) => {
      if (!img) return null;
      if (typeof img === 'string') {
        return { id: idx, url: img, epigrafe: '' };
      }
      const url = img.url || img.ruta || img.imagenUrl || img.urlImagen || img.preview;
      if (!url) return null;
      return {
        id: img.id ?? img.idImagen ?? img.id_imagen ?? idx,
        url,
        epigrafe: img.epigrafe ?? img.pieDeFoto ?? img.descripcion ?? '',
      };
    })
    .filter(Boolean);
};

const extraerNombreUsuario = (u) => {
  if (!u) return '';
  if (typeof u === 'string') return u.trim();
  if (u.nombreCompleto) return String(u.nombreCompleto).trim();
  if (u.nombre && u.apellido) return `${u.nombre} ${u.apellido}`.trim();
  if (u.nombre) return String(u.nombre).trim();
  if (u.username) return String(u.username).trim();
  if (u.email) return String(u.email).trim();
  return '';
};

const extraerNombreCategoriaDirecto = (obj) => {
  if (!obj) return '';
  if (typeof obj.categoriaNoticia === 'object' && obj.categoriaNoticia?.nombre) {
    return String(obj.categoriaNoticia.nombre).trim();
  }
  if (typeof obj.categoria === 'object' && obj.categoria?.nombre) {
    return String(obj.categoria.nombre).trim();
  }
  if (typeof obj.categoriaNoticia === 'string' && isNaN(obj.categoriaNoticia)) {
    return obj.categoriaNoticia.trim();
  }
  if (typeof obj.categoria === 'string' && isNaN(obj.categoria)) {
    return obj.categoria.trim();
  }
  if (obj.nombreCategoria) return String(obj.nombreCategoria).trim();
  if (obj.categoriaNombre) return String(obj.categoriaNombre).trim();
  return '';
};

export const useDetalleNoticia = (id, user, locationStateNoticia = null) => {
  const esAdmin = tieneRolAdministrador(user);

  const [noticia, setNoticia] = useState(locationStateNoticia);
  const [imagenes, setImagenes] = useState(() => extraerImagenes(locationStateNoticia));
  const [autorCargado, setAutorCargado] = useState(null);
  const [categoriaResuelta, setCategoriaResuelta] = useState(() =>
    extraerNombreCategoriaDirecto(locationStateNoticia)
  );
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(!locationStateNoticia);
  const [error, setError] = useState('');
  const [imagenActivaIndice, setImagenActivaIndice] = useState(0);

  // 1. Cargar lista de categorías con normalización de arrays
  useEffect(() => {
    let activo = true;
    listarCategoria()
      .then((resp) => {
        if (!activo) return;
        const arr = Array.isArray(resp)
          ? resp
          : Array.isArray(resp?.data)
          ? resp.data
          : Array.isArray(resp?.content)
          ? resp.content
          : [];
        setCategorias(arr);
      })
      .catch((err) => console.warn('Error al cargar categorías en detalle:', err));

    return () => {
      activo = false;
    };
  }, []);

  // 2. Cargar noticia, imágenes y autor desde el backend
  useEffect(() => {
    let activo = true;

    const cargar = async () => {
      try {
        if (!locationStateNoticia) {
          setCargando(true);
        }
        setError('');

        const data = await consultarNoticia(id);
        if (!activo) return;

        // Combinar datos preservando categoría o autor si el endpoint puntual vino incompleto
        const noticiaCombinada = {
          ...(locationStateNoticia || {}),
          ...data,
          // Preservar la categoría previa si el endpoint nuevo no trae nombre
          categoriaNoticia:
            extraerNombreCategoriaDirecto(data)
              ? data.categoriaNoticia
              : locationStateNoticia?.categoriaNoticia || data.categoriaNoticia,
        };

        setNoticia(noticiaCombinada);

        // Si data ya trae un nombre directo de categoría, asignarlo
        const nombreCatDirecto =
          extraerNombreCategoriaDirecto(data) ||
          extraerNombreCategoriaDirecto(locationStateNoticia);
        if (nombreCatDirecto) {
          setCategoriaResuelta(nombreCatDirecto);
        }

        // Resolver imágenes
        let imgs = extraerImagenes(data);
        if (imgs.length === 0 && locationStateNoticia) {
          imgs = extraerImagenes(locationStateNoticia);
        }

        if (imgs.length === 0 && id) {
          try {
            const imgsResp = await consultarImagenesPorNoticia(id);
            const rawImgs = Array.isArray(imgsResp)
              ? imgsResp
              : Array.isArray(imgsResp?.data)
              ? imgsResp.data
              : [];
            const imgsNormalizadas = extraerImagenes({ imagenes: rawImgs });
            if (imgsNormalizadas.length > 0) {
              imgs = imgsNormalizadas;
            }
          } catch (errImgs) {
            console.warn('No se encontraron imágenes en el servicio de imágenes:', errImgs);
          }
        }

        if (imgs.length === 0 && id) {
          try {
            const listaPublicas = await listarNoticiasPublicadas();
            const coincidencia = (Array.isArray(listaPublicas) ? listaPublicas : []).find(
              (n) => String(n.id) === String(id)
            );
            if (coincidencia) {
              const imgsPub = extraerImagenes(coincidencia);
              if (imgsPub.length > 0) {
                imgs = imgsPub;
              }
            }
          } catch (errLista) {
            console.warn('Fallback de imágenes en lista de noticias:', errLista);
          }
        }

        if (activo) {
          setImagenes(imgs);
          setNoticia({
            ...noticiaCombinada,
            imagenes: imgs,
          });
        }

        // Resolver autor
        const idAutor =
          data?.autor?.id ??
          data?.autor?.idUsuario ??
          data?.idAutor ??
          data?.autorId ??
          data?.usuarioId ??
          data?.idUsuario ??
          (typeof data?.autor === 'number' ? data.autor : null) ??
          locationStateNoticia?.autor?.id ??
          locationStateNoticia?.idAutor;

        const nombreDirecto =
          extraerNombreUsuario(data?.autor) ||
          extraerNombreUsuario(data?.usuario) ||
          data?.nombreAutor ||
          data?.autorNombre ||
          extraerNombreUsuario(locationStateNoticia?.autor);

        if (nombreDirecto) {
          setAutorCargado(nombreDirecto);
        } else if (idAutor) {
          const idSesion = user?.idUsuario ?? user?.id;
          if (String(idAutor) === String(idSesion)) {
            const nombreSesion = extraerNombreUsuario(user);
            if (nombreSesion) setAutorCargado(nombreSesion);
          } else {
            try {
              const u = await usuarioService.obtenerPorId(idAutor);
              const nombreObtenido = extraerNombreUsuario(u);
              if (activo && nombreObtenido) {
                setAutorCargado(nombreObtenido);
              }
            } catch (errUser) {
              console.warn(`No se pudo obtener el usuario con ID ${idAutor}:`, errUser);
            }
          }
        }
      } catch (err) {
        if (!activo) return;
        console.error('Error al cargar detalle de noticia:', err);
        if (!locationStateNoticia) {
          setError('No pudimos cargar la noticia solicitada. Puede que haya sido eliminada o no esté disponible.');
        }
      } finally {
        if (activo) setCargando(false);
      }
    };

    if (id) {
      cargar();
    }

    return () => {
      activo = false;
    };
  }, [id, locationStateNoticia, user]);

  // 3. Resolución reactiva profunda y con fallbacks de la categoría
  useEffect(() => {
    let activo = true;

    const resolverCategoria = async () => {
      // Si ya está resuelta con un nombre válido, no hacer nada más
      if (categoriaResuelta && isNaN(categoriaResuelta)) return;

      // a. Intentar extraer nombre directo
      const directo =
        extraerNombreCategoriaDirecto(noticia) ||
        extraerNombreCategoriaDirecto(locationStateNoticia);
      if (directo) {
        if (activo) setCategoriaResuelta(directo);
        return;
      }

      // b. Extraer ID numérico de categoría de noticia o router state
      const catId =
        resolverCategoriaId(noticia, categorias) ||
        resolverCategoriaId(locationStateNoticia, categorias) ||
        noticia?.categoriaId ||
        noticia?.idCategoria ||
        noticia?.categoriaNoticiaId ||
        (typeof noticia?.categoriaNoticia === 'number' ? noticia.categoriaNoticia : null) ||
        locationStateNoticia?.categoriaId ||
        locationStateNoticia?.idCategoria;

      if (catId) {
        // Buscar en la lista de categorías si ya se cargó
        if (categorias && categorias.length > 0) {
          const match = categorias.find((c) => {
            const cid = String(c?.id ?? c?.idCategoria ?? c?.id_categoria ?? c?.idCategoriaNoticia ?? '');
            return cid === String(catId);
          });
          if (match?.nombre && activo) {
            setCategoriaResuelta(match.nombre);
            return;
          }
        }

        // Consultar servicio específico de categoría por ID
        try {
          const catObj = await consultarCategoria(catId);
          const catData = catObj?.data ?? catObj;
          if (catData?.nombre && activo) {
            setCategoriaResuelta(catData.nombre);
            return;
          }
        } catch (errCat) {
          console.warn('Error al consultar categoría por ID:', errCat);
        }
      }

      // c. Fallback en listado público de noticias (donde la categoría viene ya armada)
      try {
        const publicadas = await listarNoticiasPublicadas();
        const listaPub = Array.isArray(publicadas) ? publicadas : publicadas?.data || [];
        const coincidencia = listaPub.find((item) => String(item.id) === String(id));
        if (coincidencia && activo) {
          const nom = extraerNombreCategoriaDirecto(coincidencia);
          if (nom) {
            setCategoriaResuelta(nom);
            return;
          }
          const cIdPub = resolverCategoriaId(coincidencia, categorias);
          if (cIdPub && categorias.length > 0) {
            const match = categorias.find((c) => String(c?.id ?? c?.idCategoria ?? '') === String(cIdPub));
            if (match?.nombre) {
              setCategoriaResuelta(match.nombre);
              return;
            }
          }
        }
      } catch (errPub) {
        console.warn('Error en fallback de listado público de categorías:', errPub);
      }
    };

    resolverCategoria();

    return () => {
      activo = false;
    };
  }, [id, noticia, locationStateNoticia, categorias, categoriaResuelta]);

  // Nombre de la categoría computado
  const categoriaNombre = useMemo(() => {
    if (categoriaResuelta && isNaN(categoriaResuelta)) {
      return categoriaResuelta;
    }

    const directo =
      extraerNombreCategoriaDirecto(noticia) ||
      extraerNombreCategoriaDirecto(locationStateNoticia);
    if (directo) return directo;

    const catId =
      resolverCategoriaId(noticia, categorias) ||
      resolverCategoriaId(locationStateNoticia, categorias);

    if (catId && categorias.length > 0) {
      const encontrada = categorias.find(
        (c) => String(c?.id ?? c?.idCategoria ?? c?.id_categoria ?? '') === String(catId)
      );
      if (encontrada?.nombre) return encontrada.nombre;
    }

    return '';
  }, [categoriaResuelta, noticia, locationStateNoticia, categorias]);

  // Badge class según categoría
  const categoriaBadgeClass = useMemo(() => {
    const normal = String(categoriaNombre || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();

    if (normal.includes('investig')) return 'badge-investigacion';
    if (normal.includes('academ')) return 'badge-academica';
    if (normal.includes('bienestar')) return 'badge-bienestar';
    if (!normal) return 'badge-default';

    const hash = [...normal].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
    return `badge-categoria badge-categoria-${hash % 8}`;
  }, [categoriaNombre]);

  // Nombre del autor real
  const nombreAutor = useMemo(() => {
    if (autorCargado) return autorCargado;

    const directo =
      extraerNombreUsuario(noticia?.autor) ||
      extraerNombreUsuario(noticia?.usuario) ||
      noticia?.nombreAutor ||
      noticia?.autorNombre ||
      extraerNombreUsuario(locationStateNoticia?.autor);

    if (directo) return directo;

    const idAutor =
      noticia?.autor?.id ??
      noticia?.idAutor ??
      noticia?.autorId ??
      noticia?.usuarioId ??
      (typeof noticia?.autor === 'number' ? noticia.autor : null);

    const idSesion = user?.idUsuario ?? user?.id;
    if (idAutor && idSesion && String(idAutor) === String(idSesion)) {
      const sesionNombre = extraerNombreUsuario(user);
      if (sesionNombre) return sesionNombre;
    }

    if (idAutor) return `Autor #${idAutor}`;

    return 'Autor Institucional';
  }, [autorCargado, noticia, locationStateNoticia, user]);

  // Métricas de lectura
  const palabras = useMemo(() => contarPalabras(noticia?.cuerpo), [noticia?.cuerpo]);
  const tiempoLectura = useMemo(() => calcularTiempoLectura(palabras), [palabras]);

  // Fechas formateadas
  const fechaPublicacion = useMemo(
    () => formatearFechaLegible(noticia?.fechaPublicacion),
    [noticia?.fechaPublicacion]
  );
  const fechaActualizacion = useMemo(
    () => formatearFechaLegible(noticia?.fechaActualizacion, true),
    [noticia?.fechaActualizacion]
  );
  const fechaCreacion = useMemo(
    () => formatearFechaLegible(noticia?.fechaCreacion),
    [noticia?.fechaCreacion]
  );

  const imagenSeleccionada = imagenes[imagenActivaIndice] || imagenes[0] || null;

  return {
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
  };
};
