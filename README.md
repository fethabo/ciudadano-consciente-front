# Ciudadano consciente

Esta es la aplicación front-end del proyecto Ciudadano Consciente. 

- Vite (Node 20.10.0 (LTS al 4/12/23))+ ReactJS V18

## Dependencias principales

- Vite v5
- Material-UI v5
- React-router V6.2
- Axios V1.6.7
- Formik V2.4.5

## Structure

En el source organizamos en carpetas de pages(paginas y sus componentes específicos si los tuvieran) y components (componentes comunes a varias vistas)



TODO: la doc de cada componente definirla en c/u

#### Components
##### Layout
Es el componente base para todas las rutas, el *Outlet* de React-Router nos permite que reciba como children los componentes que hacen de contenido de cada ruta.

Se plantea un diseño mobile-first, con tres botones de navegación principales en un AppBar inferior
TODO: definir estilos de layout para web

#### Pages

##### Home
##### Login
##### Pool
##### Organization
##### Map
##### Level


###### Para poner en discusión:
Definiciones de Levels:
- un level sin parent es un path (se muestra como mapa y es accesible desde el home de la app)
- un level con parent pero sin actividad es un clasificador (branch)


Recursos especificos
- Levels por usuario? (podrian ser todos o solo los paths )
- paths disponibles (levels con parent en null)
- paths de la organizacion
- levels por organizacion.
- levels de un padre (devolver aquellos que tienen tal id como parent)

Preguntas a resolver /(quizas alguna ya esta resuelta y no recuerdo)
- como determinamos el flujo del camino?, por orden de level? configuracion? habilitamos por branch (si es asi como determinamos que un branch se completó, a mano en el front o agregamos un recurso de verificacion)?
- esta bien el ruteo planteado? o especificamos mas?, actualmente el planteo es que todo este bajo /map/:idLevelPath
- usar react query? nos beneficiaria en cuanto al uso de la cache de los datos, pero el uso se complejiza un poco


Estilos
- Definir tema en mui
- usar taildwind css y definir nuestros componentes.
 
