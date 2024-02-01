# Ciudadano consciente

Esta es la aplicación front-end del proyecto Ciudadano Consciente. 

- Vite (Node 20.10.0 (LTS al 4/12/23))+ ReactJS V18

## Dependencias principales

- Vite v5
- Material-UI v5
- React-router V6.2
- Axios
- Formik

## Structure

En el source organizamos en carpetas de pages(paginas y sus componentes específicos si los tuvieran) y components (componentes comunes a varias vistas)



TODO: la doc de cada componente definirla en c/u
#### Components
##### Layout
Es el componente base para todas las rutas, el <Outlet /> de React-Router nos permite que reciba como children los componentes que hacen de contenido de cada ruta.

Se plantea un diseño mobile-first, con tres botones de navegación principales en un AppBar inferior
TODO: hacer layout para web

#### Pages

##### Home
##### Login
##### Pool
##### Organization
##### Map
##### Level


<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
 -->