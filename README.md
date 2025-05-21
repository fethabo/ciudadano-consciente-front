# Ciudadano consciente

Esta es la aplicación front-end del proyecto Ciudadano Consciente, desarrollado en el marco de la materia Laboratorio de Software de la carrera Licenciatura en Sistemas de la Universidad Nacional de Tierra del Fuego. 

- Vite (Node 20.10.0 (LTS al 4/12/23))+ ReactJS V18

## Dependencias principales.
Versiones especificadas en el package.json.

1. React (react, react-dom)
Descripción: Biblioteca principal para construir interfaces de usuario basadas en componentes. react-dom permite renderizar componentes en el DOM.
2. Vite
Descripción: Herramienta de desarrollo y bundler ultrarrápido para proyectos frontend modernos.
3. @mui/material y @mui/icons-material
Descripción: Conjunto de componentes de UI y sistema de diseño Material Design para React. Incluye componentes visuales y una amplia colección de íconos.
4. @tanstack/react-query
Descripción: Manejo eficiente de estados remotos, fetching, caching y sincronización de datos asíncronos en React.
5. Formik y Yup
Descripción: Formik facilita la gestión de formularios y validaciones en React. Yup es una librería para validación de esquemas de objetos, usada comúnmente con Formik.
6. Cytoscape y react-cytoscapejs
Descripción: cytoscape es una librería para visualización y análisis de grafos. react-cytoscapejs permite integrar Cytoscape como componente React.
7. Axios
Descripción: Cliente HTTP basado en promesas para hacer peticiones a APIs.
8. Embla Carousel (embla-carousel, embla-carousel-react, embla-carousel-autoplay)
Descripción: Librería para crear carruseles y sliders altamente personalizables y optimizados.
9. Keycloak-js
Descripción: Cliente JavaScript para autenticación y autorización usando Keycloak.
10. notistack
Descripción: Sistema de notificaciones (snackbars) para React, basado en Material UI.
11. @emotion/react y @emotion/styled
Descripción: Librerías para estilos CSS-in-JS, integradas con Material UI.


## Structure

En el source organizamos en carpetas de pages(paginas y sus componentes específicos si los tuvieran) y components (componentes comunes a varias vistas)

## Cómo levantar el proyecto

### Requisitos previos

- Node.js v20.10.0 (LTS) o superior
- npm (incluido con Node.js)
- Acceso a las variables de entorno necesarias (ver `.env.example` si está disponible)

### Pasos para la instalación y ejecución

1. **Clonar el repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd ciudadano-consciente-front
    ```

2. **Instalar dependencias**
    ```bash
    npm install
    ```

3. **Configurar Keycloak**

    - El archivo de configuración de Keycloak se encuentra en `src/security/keycloakConfig.js`.
    - Si no usas el servidor de autenticación desplegado debes cambiar la url de keycloak
    - Ejemplo de configuración actual:
        ```js
        const keycloakConfig = {
            url: 'https://keycloak.paradisoft.site/',
            realm: 'Ciudadano',
            clientId: 'ciudadano-front',
        };

        export default keycloakConfig;
        ```
    - Este archivo es utilizado para inicializar la autenticación en la aplicación.

4. **Configurar la URL de la API**

    - La URL base de la API se define en el archivo `src/constants.jsx`.
    - Ejemplo de configuración:
        ```js
        export const URL_API = 'https://ciuco.paradisoft.site';
        ```

5. **Ejecutar la aplicación en modo desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` por defecto.

6. **Compilar para producción**
    ```bash
    npm run build
    ```
    Los archivos generados estarán en la carpeta `dist/`.

7. **Vista previa de producción**
    ```bash
    npm run preview
    ```
    
8. **Desplegar la aplicación**

    - Una vez compilada para producción, copia el contenido de la carpeta `dist/` al directorio donde se servirá la aplicación (por ejemplo, en el directorio público de un servidor web como Nginx o Apache).
    - Asegúrate de que el servidor esté configurado para servir archivos estáticos desde esa ubicación.

