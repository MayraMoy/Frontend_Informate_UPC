# Frontend Informate UPC

Este repositorio contiene el desarrollo del frontend del sistema, encargado de la interfaz de usuario y la interacción con el backend mediante APIs.
El objetivo es construir una aplicación web moderna, escalable y mantenible que permita a los usuarios interactuar con el sistema de gestión de noticias y resoluciones académicas.

## Tecnologías

* React 18+ (Vite)
* JavaScript (ES6+)
* Bootstrap 5 (react-bootstrap)
* Axios (consumo de APIs)
* React Router DOM v6+
* ESLint (OxLint)
* Git & GitHub

## ⚙️ Configuración local

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env` en la raíz del proyecto con:
   ```env
   # URL base del Backend API para entorno local y despliegues
   VITE_API_URL=http://localhost:8080/api
   ```
   > ⚠️ El archivo `.env` **NUNCA se sube al repositorio**. Ya está incluido en `.gitignore`.

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📁 Estructura de carpetas

```
src/
├── assets/                    # Imágenes, íconos, estilos globales
├── Components/
│   ├── noticias/              # Componentes de UI del módulo noticias
│   ├── resoluciones/          # Componentes de UI del módulo resoluciones
│   ├── usuarios/              # Componentes de UI del módulo usuarios
│   └── shared/                # Componentes compartidos (Navbar, Footer, etc.)
├── Context/
│   ├── AppContext.js          # Contexto global de la aplicación
│   ├── AppProvider.jsx        # Provider que envuelve la app
│   ├── noticias/              # Contextos específicos del módulo
│   ├── resoluciones/
│   └── usuarios/
├── Pages/
│   ├── noticias/              # Páginas/vistas del módulo noticias
│   ├── resoluciones/          # Páginas/vistas del módulo resoluciones
│   └── usuarios/              # Páginas/vistas del módulo usuarios
├── Services/
│   ├── axiosConfig.js         # Configuración base de Axios
│   ├── noticias/              # Servicios API del módulo noticias
│   ├── resoluciones/          # Servicios API del módulo resoluciones
│   └── usuarios/              # Servicios API del módulo usuarios
├── App.jsx                    # Componente raíz + Router
└── main.jsx                   # Entry point
```

## Integrantes

* Mayra Moyano
* Juan Larcher
* Thiago Amante

## Repositorio Principal

Toda la documentación del proyecto se encuentra en el siguiente repositorio:

[Repositorio Principal](https://github.com/juanetee07/SistemaDeGestionYValidacion.git)

## Forma de trabajo

* Uso de ramas (feature, develop, main)
* Commits descriptivos
* Pull Requests para integración
* Comunicación constante del equipo
