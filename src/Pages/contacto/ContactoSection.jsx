import React from 'react';
import { ContactoHeader, ContactoMapa, ContactoInfo } from './components';
import { CONTACTO_SEDE } from './data/contactoData.js';
import './Contacto.css';

/**
 * Componente principal de la sección de Contacto Institucional (UPC).
 * Orquesta los submódulos:
 * - ContactoHeader: Encabezado institucional alineado a Novedades/Resoluciones.
 * - ContactoMapa: Iframe interactivo de Google Maps.
 * - ContactoInfo: Lista de canales de atención y datos de la sede.
 */
export const ContactoSection = () => {
  return (
    <section id="contacto" className="contacto-seccion" aria-labelledby="contacto-titulo">
      <ContactoHeader />

      <div className="contacto-grid">
        <ContactoMapa embedUrl={CONTACTO_SEDE.mapaEmbedUrl} titulo={`Ubicación de ${CONTACTO_SEDE.nombre}`} />
        <ContactoInfo sede={CONTACTO_SEDE} />
      </div>
    </section>
  );
};

export default ContactoSection;
