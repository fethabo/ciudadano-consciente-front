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
- Tanstack-react-query V5.4
- Embla-carousel 8.0.1

## Structure

En el source organizamos en carpetas de pages(paginas y sus componentes específicos si los tuvieran) y components (componentes comunes a varias vistas)

TODO: la doc de cada componente definirla en c/u

#### Components
##### Layout
Es el componente base para todas las rutas, el *Outlet* de React-Router nos permite que reciba como children los componentes que hacen de contenido de cada ruta.

Se plantea un diseño mobile-first, con tres botones de navegación principales en un AppBar inferior

TODO: 
- [ ] rever layout
- [ ] definir estilos de layout para web

#### Pages

##### Home
- [X] agregar carouseles para los datos obtenidos
- [X] reemplazar axios por reactQuery

##### Login/registro
- [ ] Implementar vista o acceso a login de kc (TEMIFICARLO con https://www.keycloakify.dev/)

##### Pool
- [ ] implementar vista

##### Organization
- [x] agregar listados de organizaciones a las que pertenece el usuario (con info resumida de su rol en la organizacion).
- [ ] mejorar embla carousel de las organizaciones del usuario
- [ ] agregar acceso a configuracion de organizacion para el rol adecuado (permitir agregar usuarios como moderadores)
- [ ] agregar configuracion de mapa
- [ ] agregar formularios: 
    - [ ] Level
    - [ ] Activity (esto debe crear la actividad y el contenido de la misma, y vincularla a un activityTypeVersion)
    - [ ] References (se deben poder agregar y vincular referencias a una actividad)
    - [ ] Tags (permitir agregar tag y vincularla a una actividad) (ALLOW ADDITIONS IN SELECT)

##### DEV
- [ ] agregar pagina de Dev. permitir aca la configuracion de activityTypes. (no esta atado a una organizacion)

##### Map

- [ ] corregir tamaño del mapa para la vista movil (determinar previo al renderizado con el hook useIsMobile)
- [ ] Mejorar estilos del mapa. 
- [ ] guardar en contexto el level seleccionado, y la actividad (y su activityTypeVersion) cuando la obtiene.
- [ ] vincular respuestas a los levels.. 
- [ ] cambiar estilo de nodo si tiene respuesta correcta 
- [ ] agregar estilo a conexiones entre nodos si existe respuesta correcta en el parent,
- [ ] habilitar levels children solo si el padre tiene respuesta correcta (segun configuracion)

##### Activity
Los templates deben tener como props SIEMPRE: (content)content.model (ya en JSON) y una funcion (onResponse) que devuelve true or false 
- [x] agregar ventana indicando respuesta correcta/incorrecta, con opcion para volver al mapa y cuando responde mal tambien permitirle reintentar
- [x] agregar post de respuesta 
- [x] corregir ruteo e implementar contexto para el manejo de la actividad.
##### formularios
- [ ] terminar formulario autogenerado de activityContent  
- [ ] implementar formularios de configuracion

#### TODO GENERAL:

- [x] implementar React query y hooks para cada request (podriamos usar algo similar al mono repo)
- [x] implementar formularios para carga de contenidos
- [x] corregir altura de contenido (jode el appBar)
- [x] implementar loader para carga de la pagina y carga de contenidos (pueden ser el mismo o pensar en dos diferentes)
- [x] para el mapa intentar usar: https://github.com/plotly/react-cytoscapejs, como segunda opcion: https://nivo.rocks/network/
- [x] activity
- [x] configuracion de caminos (gestion de organizaciones).
- [ ] vista de home para usuarios no registrados (debe tener algunas diferencias)
- [ ] agregar tailwindCss para la composicion de algunos componentes, podemos hacer convivir material para los componentes mas genéricos e implementar tailwindCSS junto con otras librerias para explotar mejor la parte visual de otros componentes.
- [ ] probar elemento de aceternity
- [x] probar https://www.embla-carousel.com/ para los carouseles del home.
- [-] agregar boton de acceso/registro/logout.
- [x] agregar mapper de ID de usuario de keycloak (o averiguar como pasar el ID de usuario en el token.)// se complicó -.-
- [x] Agregar POST de usuario al registrar.
- [x] sacar autenticacion obligatoria.
- [ ] agregar manejo de respuestas locales (localStorage) para la vista del mapa.
- [x] agregar alias para importaciones de hooks y componentes 
- [ ] agregar post para marcar favorito (sobre el level (mapa y actividad) )
- [ ] ventana o info de organization visible por un usuario comun (donde se puede votar la organizacion) Podria ser accesible desde el mapa.
- [ ] busqueda de paths / filtrado
- [x] ver opciones de REact query para que no haga refetch cada vez que vuelve a la pestaña.
- [ ] en EmblaCarousel definir vista movil (un slide en la pantalla)
- [ ] Agregar creacion de contenidos:
        - Un usuario cualquiera puede crear contenidos, habilitandolos como publicos o privados.
            - si el contenido se genera desde la configuracionde la organización este se vincula a la misma, creando como propiedad de esta.
            - si el contenido lo crea un usario desde fuera de la organización es del usuario, puede ponerlo publico y editarlo cuando quiere.
        - puede editarlo/eliminarlo un moderador o el creador (si tiene organizacion relacionada el usuario debe ser divulgador de la misma o moderador para poder editarlo). 
        - Agregar tags de forma obligatoria en el contenido (1 o 2)?
- [ ] Agregar en el home la creacion de contenidos y la vista de contenidos publicos.
- [ ] en el pool permitir la creacion de contenidos como respuesta a una pregunta.
- [ ] en el pool agregar modo de juego sobre los contenidos publicos (directamente desde las respuestas del pool, esto seria una actividad sin level).
- [ ] Agregar modo de juego random con los contenidos publicos, (con configuraciones de tags, pertenecientesde organizacion o no).
- [ ] Idea: modo de juego competitivo. 
- [ ] Idea: ranking por racha de victorias en modo de juego random
- [ ] implementar o utilizar un tagPicker
- [x] unificar el uso del useQuery para posibles modificaciones masivas sobre todas las consultas de la aplicacion. (por ejemplo el staleTime)
- [x] agregar staleTime a todos los useQuery
- [x] quitar staleTime en requests de escritura
- [x] quitar retry en requests de escritura
- [x] Agregar un USER PROVIDER global, que intente obtener el usuario de la api a partir del userName o el email de kc, si no existe debe realizar un POST y disponibilizar el userId en la aplicacion.
- [ ] idea: probar userGuests de kc, la app siempre autenticada, pero el registro en la api (POST) debe realizarse solo cuando se registra efectivamente en KC.
- [ ] agregar en atajada de erores el contenido del header "warning con el mensaje que trae" (ver si lo puedo rescatar direcamente desde el useQUery o el status de axios)
- [ ] agregar mensajeError en metadatos de las request (para manejarlo con el QueryCache en el WrapperQueryClient y los mensaje flotantes)
- [ ] agregar pristine para submit en formularioBase
- [ ] agregar fetch de las actividades de los childrens en el mapa, en el armado del mapa si el children tiene activity se debe mostrar diferente. si no tiene activity no deberia poder pulsarse ( o se deberia de ignorar al menos la seleccion- ver tambien de quitar el seleccionable a las transiciones)
- [ ] agregar search a la seleccion de contenidos.

##### bugs
- [ ] reintento no permite volver a seleccionar la ultima respuesta (deberia limpiarlo completo)

##### modificaciones por normalizacion de la api:
- [x] Quitar requests de usuarios de la organizacion en paralelo.
- [x] quitar idUser de requests, probar e identificar cuales faltan quitar. 
- [ ] POR AHORA NO HACER NADA- Se agrego el hidden en los levels, por el momento suponer que la api devuelve lo que necesito segun los roles. 
- [ ] hacer fullwidth las ventanas de formularios

## IMPORTANTE
API:
- (comenté el allow de los endpoint que me parecieron que debian estar libres) Quitar la verificacion del rol CIUCO_ADMIN, un usuario que recien se registra no puede obtener nada por esto. Al menos todo lo que sea publico se debe poder obtener solo con tener un token valido, sin roles asignados.
- Endpoints que usan el userId como pathParam (o en el body como en el caso del POST de answer) deberian de obtener el userId a partir de los datos del token para no exponer las peticiones ni que se puedan trucar.
- Contents de la organizacion (agregar filtrado al /contents)
- Contents publicos (agregar filtrado al /contents)
- (done)el Patch de organizations no funcionba porque verifica la existencia del nombre y el email, si estoy actualizando cualquiera de los otros campos los verifica igual
- (done) mismo problema del patch con el nombre de los levels..
- los levels no deberian verificar si existe el nombre (no deberia de ser clave), mas de una organizacion deberia poder llamar igual a sus levels, por què la condicion de unico?
- getContents devuelve 404 si no encuentra nada, evaluarlo -.-
- descripcion de contents?? esto seria solo para los labels de la seleccion.
## Reuniones
julio 17/18
- agregar recurso de busqueda de usuario por correo electronico? la busqueda por username es la primera necesaria, para aplicar un filtro y no traer todos los users.
- agregar invitacion de usuarios con correo electronico? al agregar un usuario en una org o un level, podriamos agregar un user inactivo al cual se le envie una notificacion al correo ingresado.
- AGREGADO AL TODO DEL NOTION

***Julio 11
- Un usuario puede tener mas de un rol en una organizacion? no esta teniendo sentido manejarlo asi, 



***Junio 11
- Agregar pagina de configuracion de DEV?.


Previo a junio
##### Nuevo para charlar:
- prolemas con keycloak 
- definicion de acceso directo a activity / uso de contexto y ruteo privado.










###### Ya Charlado:
- *esto lo hablamos pero no lo anote* verificamos la existencia de actividad en el mapa para cada nodo cuando se pulsa en el nodo. -->Cuando pulsamos el nodo verificamos si tiene actividad, si tiene actividad y no esta resuelta se debe resolver, una vez resuelta se muestran sus childrens.


- la aplicacion deberia de soportar el acceso sin login, jugar a paths publicos y si quiere mas funcionalidad se debe registrar (para esto necesitamos generar el recurso de manejar respuestas de forma local y poder hacer un post luego con todas las respuestas que se hicieron, lo mismo que lo que planteamos para jugar offline aplicaría para jugar sin loguearse).-->Saco el login obligatorio en la app y agrego el boton de acceso/registro/logout

- el recurso de paths recientes y favoritos si no tienen ninguno me devuelve un arreglo vacio y un OK, ¿deberia devolver un 204 ?.-->ya se agrego en el TODO de notion.

- ver vinculacion de keycloak con el authenticador de google (quizas podemos facilitar el registro)

- como vamos a registrar los usuarios en nuestra base a partir del registro en keycloak?, quizas podria ser algo como que le pasamos el token, y si el usuario no existe en nuestra base lo creamos y lo vinculamos al usuario de keycloak.-->Ya se agrego en el TODO de notion

- los endpoints que buscar los niveles de un usuario no deberian pasarle el id, solo el tkn de keycloak, o, en su defecto, deberiamos tener un recurso para obtener el id del usuario a partir del token de keycloak para asi manejar esos endpoints. -->Ya se agrego en el TODO de notion



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
2. La otra seria ser conservadores (y mas expeditivos), plantearlo como lo planteamos tambien en un principio, los templates se integran en el proyecto, el cual podria ser colaborativo (parcialmente) para facilitar la participacion de la comunidad de programadores, y solo se pondrian en servicio por medio de deploys. Esto no significaria que no sirva lo del activity-version, ya que esto puede ser una version previa a la implementacion de los micro-frontends, lo unico que no estariamos importando dinamicamente directamente desde el servidor, sino que obtendriamos la version aprobada y obtendriamos el template dinamicamente desde la carpeta dedicada a alojar los templates dentro del proyecto (usando como referencia ese idActivityTypeVersion guardado en la api)********

