import { useCallback, useEffect, useState } from "react";
import {
	crearNoticia as crearNoticiaApi,
	listarNoticiasPublicadas,
} from "../Services/noticias/noticiasServices";

const normalizarNoticias = (respuesta) => {
	if (Array.isArray(respuesta)) return respuesta;
	if (Array.isArray(respuesta?.data)) return respuesta.data;
	if (Array.isArray(respuesta?.content)) return respuesta.content;

	return [];
};

const esRespuestaSinNoticias = (error) => {
	const detalle = error?.response?.data;
	const mensaje =
		typeof detalle === "string" ? detalle : detalle?.message;

	return mensaje?.includes("No hay noticias disponibles") ?? false;
};

const useNoticias = () => {
	const [noticias, setNoticias] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState("");

	const recargarNoticias = useCallback(async () => {
		setCargando(true);
		setError("");

		try {
			const respuesta = await listarNoticiasPublicadas();

			setNoticias(normalizarNoticias(respuesta));

			return true;
		} catch (errorSolicitud) {
			if (esRespuestaSinNoticias(errorSolicitud)) {
				setNoticias([]);
				return true;
			}

			setError(
				"No se pudieron cargar las noticias. Intenta nuevamente."
			);

			return false;
		} finally {
			setCargando(false);
		}
	}, []);

	useEffect(() => {
		recargarNoticias();
	}, [recargarNoticias]);

	const crearNoticia = useCallback(
		async (datosNoticia) => {
			setGuardando(true);
			setError("");

			try {
				await crearNoticiaApi(datosNoticia);

				await recargarNoticias();

				return true;
			} catch {
				setError(
					"No se pudo crear la noticia. Verifica el ID de categoría e intenta nuevamente."
				);

				return false;
			} finally {
				setGuardando(false);
			}
		},
		[recargarNoticias]
	);

	return {
		noticias,
		cargando,
		guardando,
		error,
		crearNoticia,
		recargarNoticias,
	};
};

export default useNoticias;