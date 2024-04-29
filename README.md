# Ciudadano consciente

Esta es la aplicación front-end del proyecto Ciudadano Consciente. 

- Vite (Node 20.10.0 (LTS al 4/12/23))+ ReactJS V18

## Dependencias principales

- Vite v5
- Material-UI v5
- React-router V6.2
- Axios V1.6.7
- Formik V2.4.5
- Keycloak-js V23.0

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

#### TODO GENERAL:
- implementar React query y hooks para cada request (podriamos usar algo similar al mono repo)
- implementar formularios para carga de contenidos


##### Nuevo para charlar:
- el recurso de paths recientes y favoritos si no tienen ninguno me devuelve un arreglo vacio y un OK, ¿deberia devolver un 204 ?.

- los endpoints que buscar los niveles de un usuario no deberian pasarle el id, solo el tkn de keycloak, o, en su defecto, deberiamos tener un recurso para obtener el id del usuario a partir del token de keycloak para asi manejar esos endpoints. 

- como vamos a registrar los usuarios en nuestra base a partir del registro en keycloak?, quizas podria ser algo como que le pasamos el token, y si el usuario no existe en nuestra base lo creamos y lo vinculamos al usuario de keycloak.

- ver vinculacion de keycloak con el authenticador de google (quizas podemos facilitar el registro)




###### Ya Charlado:
Definiciones de Levels:
- un level sin parent es un path (se muestra como mapa y es accesible desde el home de la app)
- un level con parent pero sin actividad es un clasificador (branch)


Recursos especificos
- [x] Levels por usuario? (podrian ser todos o solo los paths )
- [x] paths disponibles (levels con parent en null)
- [x] paths de la organizacion
- levels por organizacion.=> a partir del path obtengo los levels
- [x] levels de un padre (devolver aquellos que tienen tal id como parent)
- activity por idlevel.


Preguntas a resolver /(quizas alguna ya esta resuelta y no recuerdo)
- como determinamos el flujo del camino?, por orden de level? configuracion? habilitamos por branch (si es asi como determinamos que un branch se completó, a mano en el front o agregamos un recurso de verificacion)?
- esta bien el ruteo planteado? o especificamos mas?, actualmente el planteo es que todo este bajo /map/:idLevelPath
- usar react query? nos beneficiaria en cuanto al uso de la cache de los datos, pero el uso se complejiza un poco(SI)


Estilos
- Definir tema en mui o usar taildwind css y definir nuestros componentes. (o ambos???)


Aceternity


IMPORTACIONES DE TEMPLATES:
No logre hacer la transpilacion de un jsx en la app (se podria con un poco mas de maña con la configuracion de babel, pero lo haria bastante pesado hacer la transpilacion en la app).
- Opciones:
1. La mejor seria un enfoque de microfrontends, es decir, que los componentes se guarden ya transpilados, de esa forma la importacion dinamica podria hacerse como se planteo desde un principio y sigue todo encaminado. Esto requeriria establecer la mecanica tanto de la conformacion de los templates como de la transpilacion (babel o similar) y el empaquetado en un bundle.js. Esto aun no me quita la duda sobre las dependencias, habria que ahondar en la arquitectura microfrontend para lograr lo requerido de forma completa. (Nuestra api esta preparada para esta arquitectura)
2. La otra seria ser conservadores (y mas expeditivos), plantearlo como lo planteamos tambien en un principio, los templates se integran en el proyecto, el cual podria ser colaborativo (parcialmente) para facilitar la participacion de la comunidad de programadores, y solo se pondrian en servicio por medio de deploys. Esto no significaria que no sirva lo del activity-version, ya que esto puede ser una version previa a la implementacion de los micro-frontends, lo unico que no estariamos importando dinamicamente directamente desde el servidor, sino que obtendriamos la version aprobada y obtendriamos el template dinamicamente desde la carpeta dedicada a alojar los templates dentro del proyecto (usando como referencia ese idActivityTypeVersion guardado en la api)


 
