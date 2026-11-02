import DOMPurify from "dompurify";

const ContenidoNoticia = ({ cuerpo = "" }) => {
  const contenidoSeguro = DOMPurify.sanitize(cuerpo, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className="contenido-noticia"
      dangerouslySetInnerHTML={{ __html: contenidoSeguro }}
    />
  );
};

export default ContenidoNoticia;