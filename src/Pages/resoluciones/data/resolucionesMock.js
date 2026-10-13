/**
 * Datos mock de resoluciones académicas que respetan la estructura exacta de ResolucionResponseDTO del backend.
 * Permiten que la vista se visualice idéntica a los diseños de referencia incluso si el backend no está iniciado.
 */
export const resolucionesMock = [
  {
    idResolucion: 1,
    numeroResolucion: "Res. Rectoral 0542/2026",
    titulo: "Calendario Académico Período Lectivo 2026",
    descripcion: "Se informa a la Comunidad Académica que mediante la presente resolución se aprueba el Calendario Académico para el período lectivo 2026, conforme al Programa Académico General Aprobado 2026.",
    idCategoria: 1,
    nombreCategoria: "ACADÉMICA",
    idAutor: 3,
    nombreAutor: "Esmeralda Nieves Urtizbey",
    rolAutor: "Secretaría",
    fechaCreacion: "2026-04-17T10:35:00",
    versionActual: 2,
    observaciones: "Aprobada sin modificaciones por el Consejo Académico.",
    estado: "Vigente",
    codigoResolucion: "RES-2026-421",
    archivoPrincipal: {
      nombre: "Res_Rectoral_0542_2026.pdf",
      url: "#",
      tipo: "application/pdf"
    },
    etiquetas: ["CALENDARIO", "2026", "RECTORADO"],
    historialVersiones: [
      { version: "v2", fecha: "17/04/2026", descripcion: "Publicada por Secretaría" },
      { version: "v1", fecha: "15/04/2026", descripcion: "Aprobada por Autoridad" },
      { version: "v0", fecha: "13/04/2026", descripcion: "Creada (borrador)" }
    ]
  },
  {
    idResolucion: 2,
    numeroResolucion: "Res. Grado 0211/2026",
    titulo: "Modificación del Régimen de Correlatividades",
    descripcion: "Se establece la actualización del plan de correlatividades aplicable a las carreras de pregrado y grado para el ciclo académico correspondiente.",
    idCategoria: 2,
    nombreCategoria: "GRADO",
    idAutor: 2,
    nombreAutor: "Carlos Benítez",
    rolAutor: "Autoridad",
    fechaCreacion: "2026-04-15T09:15:00",
    versionActual: 1,
    observaciones: "Actualización de planes de estudio vigentes.",
    estado: "Archivado",
    codigoResolucion: "RES-2026-211",
    archivoPrincipal: {
      nombre: "Res_Grado_0211_2026.pdf",
      url: "#",
      tipo: "application/pdf"
    },
    etiquetas: ["GRADO", "CORRELATIVIDADES", "ACADÉMICO"],
    historialVersiones: [
      { version: "v1", fecha: "15/04/2026", descripcion: "Archivada por Autoridad" },
      { version: "v0", fecha: "10/04/2026", descripcion: "Creada por Secretaría" }
    ]
  },
  {
    idResolucion: 3,
    numeroResolucion: "Res. Rectoral 0100/2026",
    titulo: "Aprobación Plan Estudios — Ing. Sistemas",
    descripcion: "Disposición rectoral sobre la convalidación del nuevo trayecto formativo de Ingeniería en Sistemas de Información.",
    idCategoria: 1,
    nombreCategoria: "ACADÉMICA",
    idAutor: 4,
    nombreAutor: "Marcela Valenzuela",
    rolAutor: "Secretaría",
    fechaCreacion: "2026-04-10T14:20:00",
    versionActual: 1,
    observaciones: "Elevado al Consejo Superior para homologación final.",
    estado: "Pendiente",
    codigoResolucion: "RES-2026-100",
    archivoPrincipal: {
      nombre: "Res_Rectoral_0100_2026.pdf",
      url: "#",
      tipo: "application/pdf"
    },
    etiquetas: ["INGENIERÍA", "PLAN_ESTUDIOS", "2026"],
    historialVersiones: [
      { version: "v1", fecha: "10/04/2026", descripcion: "Enviada a revisión técnica" },
      { version: "v0", fecha: "05/04/2026", descripcion: "Elaborada por Secretaría" }
    ]
  },
  {
    idResolucion: 4,
    numeroResolucion: "Res. Rectoral 0099/2026",
    titulo: "Aprobación beca estudiantil período 2026",
    descripcion: "Asignación de partidas y cupos correspondientes a los programas de becas universitarias de apoyo socioeducativo.",
    idCategoria: 1,
    nombreCategoria: "ACADÉMICA",
    idAutor: 3,
    nombreAutor: "Esmeralda Nieves Urtizbey",
    rolAutor: "Secretaría",
    fechaCreacion: "2026-04-10T11:00:00",
    versionActual: 1,
    observaciones: "Aprobada por unanimidad en sesión ordinaria.",
    estado: "Vigente",
    codigoResolucion: "RES-2026-099",
    archivoPrincipal: {
      nombre: "Res_Rectoral_0099_2026.pdf",
      url: "#",
      tipo: "application/pdf"
    },
    etiquetas: ["BECAS", "BIENESTAR", "ESTUDIANTES"],
    historialVersiones: [
      { version: "v1", fecha: "10/04/2026", descripcion: "Publicación oficial" }
    ]
  },
  {
    idResolucion: 5,
    numeroResolucion: "Res. Grado 0180/2026",
    titulo: "Habilitación de mesa examinadora — Julio 2026",
    descripcion: "Disposición de turnos especiales de exámenes finales correspondientes al turno extraordinario de invierno.",
    idCategoria: 2,
    nombreCategoria: "GRADO",
    idAutor: 3,
    nombreAutor: "Esmeralda Nieves Urtizbey",
    rolAutor: "Secretaría",
    fechaCreacion: "2026-04-08T08:30:00",
    versionActual: 1,
    observaciones: "Cronograma notificado a direcciones de carrera.",
    estado: "Vigente",
    codigoResolucion: "RES-2026-180",
    archivoPrincipal: {
      nombre: "Res_Grado_0180_2026.pdf",
      url: "#",
      tipo: "application/pdf"
    },
    etiquetas: ["EXÁMENES", "GRADO", "TURNOS"],
    historialVersiones: [
      { version: "v1", fecha: "08/04/2026", descripcion: "Aprobada por Secretaría Académica" }
    ]
  }
];

export const categoriasMock = [
  { idCategoria: 1, nombre: "ACADÉMICA", color: "gold" },
  { idCategoria: 2, nombre: "GRADO", color: "mint" },
  { idCategoria: 3, nombre: "CONSEJO SUPERIOR", color: "blue" }
];
