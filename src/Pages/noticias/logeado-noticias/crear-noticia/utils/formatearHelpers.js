export const formatearTamano = (bytes = 0) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const contarPalabras = (html = "") => {
  if (!html) return 0;
  const texto = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!texto) return 0;
  return texto.split(" ").filter(Boolean).length;
};

export const tiempoLectura = (palabras = 0) => {
  if (palabras <= 0) return "Menos de 1 min";
  const minutos = Math.ceil(palabras / 200);
  return `${minutos} min de lectura`;
};

export const formatearFechaHoy = () => {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
};

