import React from 'react';
import logoImg from '../../assets/logo-upc-corto.png';

/**
 * Logotipo oficial de Foro UPC
 * Utiliza la imagen institucional provista.
 */
export const ForoLogo = ({ className = '', width = 160, alt = 'Foro UPC' }) => {
  return (
    <div
      className={`d-inline-flex justify-content-center align-items-center ${className}`}
      style={{ userSelect: 'none' }}
    >
      <img
        src={logoImg}
        alt={alt}
        width="260"
        height="199"
        style={{
          width: `${width}px`,
          height: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};

export default ForoLogo;
