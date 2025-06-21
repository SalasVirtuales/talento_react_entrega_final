# Tienda E-commerce LEON (React & Vite)

## Descripción

Este proyecto es una aplicación de comercio electrónico basada en React y Vite, diseñada para emular la experiencia de usuario de una tienda online estilo LEON. Permite a los usuarios explorar un catálogo de productos obtenidos de una API en vivo, ver información detallada de cada producto, gestionar un carrito de compras y simular un inicio de sesión de usuario para acceder a áreas de perfil protegidas. La aplicación cuenta con enrutamiento del lado del cliente para una experiencia fluida de aplicación de página única (SPA) y está diseñada para un aspecto moderno y adaptable (responsive).

## Características Principales

*   **Listado de Productos:** Muestra una lista dinámica de productos obtenidos de una API externa.
*   **Páginas de Detalle del Producto:** Páginas dedicadas para cada producto con información detallada, cargadas mediante enrutamiento dinámico (`/product/:id`).
*   **Carrito de Compras:**
    *   Añadir artículos al carrito.
    *   Actualizar las cantidades de los artículos en el carrito.
    *   Eliminar artículos del carrito.
    *   Calcula y muestra el precio total de los artículos en el carrito.
*   **Indicador de Cantidad en Carrito:** Un indicador visual en el ícono del carrito de la barra de navegación muestra la cantidad total de artículos actualmente en el carrito.
*   **Enrutamiento del Lado del Cliente:** Navegación fluida entre diferentes secciones (Inicio, Detalle del Producto, Carrito, Login, Perfil) sin recargas de página, impulsado por `react-router-dom`.
*   **Autenticación de Usuario Simulada (Mock):**
    *   Funcionalidad simulada de inicio y cierre de sesión.
    *   Un ejemplo de ruta protegida (`/profile`) accesible solo después de "iniciar sesión".
*   **Diseño Adaptable (Responsive):** La interfaz de usuario se adapta a varios tamaños de pantalla (escritorio, tableta, móvil) utilizando Bootstrap y CSS personalizado.
*   **Estados de Carga y Error:** Proporciona retroalimentación al usuario durante las interacciones con la API (por ejemplo, mientras se cargan los productos o si ocurre un error).
*   **UI Moderna:** Diseñada con una estética contemporánea, buscando una experiencia de usuario limpia y visualmente atractiva.

## Tecnologías Utilizadas (Tech Stack)

*   **Framework Principal:** React, Vite
*   **Enrutamiento:** `react-router-dom`
*   **Estilos:**
    *   Bootstrap 5 (para componentes base y sistema de rejilla)
    *   CSS Personalizado (estilos específicos de componentes y globales)
*   **Iconos:** Font Awesome (`@fortawesome/react-fontawesome`)
*   **Consumo de API:** API `fetch` nativa de JavaScript
*   **API Externa:** `fakestoreapi.com` (para datos de productos)
*   **Lenguaje:** JavaScript (con JSX)
*   **Gestor de Paquetes:** npm

## Estructura del Proyecto

El proyecto sigue una estructura estándar de Vite React:

/public/ # Activos estáticos (ej., index.html, favicons) /src/ ├── /assets/ # Activos estáticos locales (imágenes, fuentes, etc. - si los hay) ├── /components/ # Componentes de UI reutilizables │ ├── /Layout/ │ ├── /NavigationBar/ │ ├── /ProductItem/ │ ├── /ProtectedRoute/ │ └── ... (etc.) ├── /pages/ # Componentes de nivel superior para cada ruta/página │ ├── HomePage.jsx │ ├── ProductDetailPage.jsx │ ├── CartPage.jsx │ └── ... (etc.) ├── /styles/ # Hojas de estilo globales o compartidas (opcional, si no están co-ubicadas) ├── App.jsx # Componente principal de la aplicación (estado, configuración de enrutamiento) ├── index.css # Estilos base globales └── main.jsx # Punto de entrada de la aplicación (renderizado de React DOM, BrowserRouter)


## Configuración e Instalación

Para ejecutar el proyecto localmente:

1.  **Clona el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd <nombre-del-directorio-del-proyecto>
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto normalmente iniciará el servidor en `http://localhost:5173` (u otro puerto si el 5173 está ocupado).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

*   `npm run dev`: Inicia el servidor de desarrollo con reemplazo de módulos en caliente (HMR).
*   `npm run build`: Compila la aplicación para producción en la carpeta `dist`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores potenciales y problemas de estilo (asumiendo que ESLint está configurado según la configuración inicial de Vite).
*   `npm run preview`: Sirve la compilación de producción localmente para previsualizarla antes del despliegue.

## Uso de API

La aplicación obtiene datos de productos de la API pública `fakestoreapi.com`:

*   **Todos los Productos:** `https://fakestoreapi.com/products`
    *   Usado en: `src/components/ProductListingPage/ProductListingPage.jsx`
*   **Producto Individual:** `https://fakestoreapi.com/products/:id`
    *   Usado en: `src/pages/ProductDetailPage.jsx`

## Resumen del Enrutamiento

La aplicación utiliza `react-router-dom` para gestionar la navegación. Las rutas clave incluyen:

*   `/`: La página de inicio, que muestra el listado principal de productos.
*   `/product/:productId`: Muestra información detallada para un producto específico.
*   `/cart`: Muestra el carrito de compras del usuario.
*   `/login`: Una página para el inicio de sesión simulado del usuario.
*   `/profile`: Una página de perfil de usuario de ejemplo, ruta protegida y accesible solo después del inicio de sesión simulado.
*   `*`: Una página "No Encontrado" para cualquier ruta no definida.

## Autenticación (Simulada - Mock)

Se implementa un sistema de autenticación simulado para fines de demostración:

*   Se gestiona dentro de `App.jsx` utilizando el estado de React (`isAuthenticated`).
*   Los usuarios pueden "iniciar sesión" a través de la página `/login`. Esta acción establece el estado `isAuthenticated` a `true`.
*   La ruta `/profile` está protegida. Si un usuario no autenticado intenta acceder a ella, es redirigido a `/login`.
*   La barra de navegación se actualiza dinámicamente para mostrar los enlaces "Login" o "Perfil / Logout" según el estado de autenticación.
*   Este sistema **no** involucra un servicio de autenticación de backend real ni una base de datos de usuarios.

## Posibles Mejoras Futuras

*   Integración con un backend real para productos, cuentas de usuario y procesamiento de pedidos.
*   Carrito de compras persistente (ej., usando `localStorage` o una solución de backend).
*   Registro completo de usuarios y gestión de perfiles.
*   Un proceso de checkout completo con integración de pasarela de pago.
*   Funcionalidades avanzadas de búsqueda y filtrado de productos.
*   Implementación de categorías de productos y vistas específicas por categoría.
*   Reseñas y valoraciones de usuarios para los productos.