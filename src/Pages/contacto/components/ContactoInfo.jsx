import React from 'react';
import {
  IconoUbicacion,
  IconoEmail,
  IconoTelefono,
  IconoHorario,
} from './icons/ContactoIcons.jsx';

/**
 * Componente que renderiza los canales directos de atención y datos de la sede.
 */
export const ContactoInfo = ({ sede }) => {
  return (
    <div className="contacto-info-wrapper">
      {/* Bloque 1: Dirección */}
      <div className="contacto-fila">
        <IconoUbicacion />
        <div className="contacto-detalle">
          <span className="contacto-etiqueta">Dirección de la Sede</span>
          <p className="contacto-texto">
            <strong>{sede.nombre}</strong>
            <span>{sede.direccion}</span>
          </p>
        </div>
      </div>

      {/* Bloque 2: Correo Electrónico */}
      <div className="contacto-fila">
        <IconoEmail />
        <div className="contacto-detalle">
          <span className="contacto-etiqueta">Correo Electrónico Oficial</span>
          <p className="contacto-texto">
            <a href={`mailto:${sede.email}`} className="contacto-link">
              {sede.email}
            </a>
          </p>
        </div>
      </div>

      {/* Bloque 3: Teléfonos */}
      <div className="contacto-fila">
        <IconoTelefono />
        <div className="contacto-detalle">
          <span className="contacto-etiqueta">Teléfonos de Atención</span>
          <p className="contacto-texto">
            <span>
              Líneas fijas:{' '}
              {sede.telefonos.fijos.map((tel, idx) => (
                <React.Fragment key={tel.enlace}>
                  {idx > 0 && ' / '}
                  <a href={tel.enlace} className="contacto-link">
                    {tel.visual}
                  </a>
                </React.Fragment>
              ))}
            </span>
            <span>
              Guardia / Móvil:{' '}
              <a href={sede.telefonos.guardia.enlace} className="contacto-link">
                {sede.telefonos.guardia.visual}
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Bloque 4: Horarios */}
      <div className="contacto-fila">
        <IconoHorario />
        <div className="contacto-detalle">
          <span className="contacto-etiqueta">Horarios de Atención al Público</span>
          <p className="contacto-texto">
            <span>{sede.horarios}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

