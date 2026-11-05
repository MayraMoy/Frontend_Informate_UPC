import React from 'react';

/**
 * Componente que renderiza el iframe interactivo de Google Maps
 * con la ubicación de la sede institucional.
 */
export const ContactoMapa = ({ embedUrl, titulo = 'Ubicación Instituto Superior Dr. Bernardo Houssay' }) => {
  return (
    <div className="contacto-mapa-wrapper">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={titulo}
      />
    </div>
  );
};

