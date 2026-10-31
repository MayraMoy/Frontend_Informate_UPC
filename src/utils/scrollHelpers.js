/**
 * Utilidades de navegación y desplazamiento con soporte para Navbar sticky.
 */

export const obtenerAlturaNavbar = () => {
  const navbar = document.querySelector('.app-navbar');
  if (navbar) {
    const rect = navbar.getBoundingClientRect();
    if (rect.height > 0) return rect.height;
  }
  // Valor fallback según viewport: desktop 69px, mobile 65px
  return window.innerWidth < 1024 ? 65 : 69;
};

/**
 * Desplaza la ventana hasta una sección específica considerando la altura del Navbar sticky
 * y un margen de separación (breathing room) para que el título nunca quede tapado.
 *
 * @param {string} sectionId - ID de la sección (ej. 'noticias', 'resoluciones', 'inicio')
 * @param {boolean} [smooth=true] - Si la animación debe ser suave
 * @param {number} [extraOffset=24] - Espaciado adicional debajo del navbar en píxeles
 */
export const scrollToSection = (sectionId, smooth = true, extraOffset = 24) => {
  if (!sectionId || sectionId === 'inicio') {
    window.scrollTo({
      top: 0,
      behavior:
        smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'smooth'
          : 'auto',
    });
    return;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  const navbarHeight = obtenerAlturaNavbar();
  const elementoTop = section.getBoundingClientRect().top;
  const targetY = Math.max(0, elementoTop + window.pageYOffset - navbarHeight - extraOffset);

  window.scrollTo({
    top: targetY,
    behavior:
      smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'smooth'
        : 'auto',
  });
};

