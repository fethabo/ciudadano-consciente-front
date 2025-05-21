
#### Orden de presentacion
1. Desafio actual - saimon  
2. Nuestra solucion - saimon  
3. Objetivos del proyecto - saimon  
4. Como funciona - fede  
¿Como funciona la plataforma?:
Primero las instituciones, de cualquier índole, aportan información en forma de contenido a la plataforma. 
Segundo, ellas mismas crean caminos temáticos o "paths" en inglés, organizados por niveles con diferentes tipos de actividades interactivas. 
Tercero, los ciudadano (usuarios de la plataforma) exploran los paths, y aprenden jugando a las actividades que plantearon las organizaciones.
Cuarto, la comunidad (ciudadanos), pueden realizar preguntas publicas en el pool de preguntas para que las organizaciones se hagan eco de ellas para la armado de nuevo contenido. Además los usuarios pueden participar en la creacion de nuevo contenido para enriquecer la experiencia de los demas usuarios.
5. Funcionalidades principales - fede  
La plataforma tiene algunas funcionalidades principales que vale la pena mencionar, 
1- La gestion de usuarios y roles: las organizaciones pueden administrar qué usuarios pertenecen a ellas.
2- Creacion de mapas/caminos: 
Visualmente representamos los caminos en "mapas", que las organizaciones pueden crear graficamente y vincularle actividades.
3- Actividades lúdicas:
los usuarios juegan diferentes tipos de actividades que ya veremos mas adelante
4-  Pool de preguntas: como se menciono, para la participacion de los usuarios en la confeccion de actividades.
5- Metricas de progreso: tanto las organizaciones como los usuarios pueden ver algunas metricas sobre su actividad en la plataforma.
6- Configuracion flexible:  la organizacion tiene el control casi total sobre sus contenidos.
6. Para quien es - fede  
La plataforma está dirigida principalmente a dos actores, los ciudadanos con ganas o la necesidad de aprender por vias alternativas a las tradicionales, y las organizaciones que buscan comunicar el conocimiento que ellas poseen, las organizaciones pueden ser estatales, no estatales con o sin fines de lucro, el uso de la plataforma para cada caso particular se adapta en función de qué es lo que quieren transmitir y cómo, eligiendo los tipos de actividades adecuadas para ello.
Y como último actor, tenemos a los desarrolladores, la plataforma está preparada para permitir a devs entusiastas que puedan proponer nuevos tipos de actividades para su uso en la plataforma, a estos tipos de actividades funcionales les llamamos "templates". 
7. Metodologia de desarrollo - saimon  
8. Definicion de requerimientos funcionales - saimon  
9. Diseño de arquitectura - saimon  
10. Diseño del modelo de datos - fede  
En las primeras iteraciones del proyecto, fuimos modelando una base de datos relacional para la idea del desarrollo, al no tener un cliente ni una lógica de negocio delimitada más que los límites que definimos nosotros, fue evolucionando progresivamente a medida que se iban estableciendo criterios mas definitivos. Buscamos una base normalizada como minimo y luego que soporte una configuracion flexible, apuntanto a la dinamica de contenidos, actividades y tipos de actividad.
11. Distribucion del trabajo - fede  .
Luego de la etapa de modelado, plateamos la forma de trabajar según nuestras experiencias y fortalezas, ambos trabajamos juntos en ese momento en un ambito de desarrollo web. Simon tenia mas conocimiento y experiencia en el desarrollo de apis y yo mas conocimiento y experiencia en el desarrollo de aplicaciones del lado del cliente. Por lo que mantuvimos ese esquema de trabajo en lineas generales. 
Sin embargo, aún tuvimos puntos de encuentro además de las llamadas a los recursos de la api. La implementación del servidor de autenticacion en nuestro sistema.

12. Integracion con Keycloak - fede 
Elegimos Keycloak como solución de la autenticación en la plataforma, de nuevo, por ser algo conocido. Aunque a pesar de ser conocido esto nos supuso uno de los mayores desafíos del proyecto, ¿cómo planteamos el control de roles de los usuarios sin que se vuelva tedioso para los usuarios? Porque es sencillo definir roles en keycloak y configurarlos desde su administrador, pero cuando la lógica del negocio depende de la administración de roles y queres mantenerlo simple para los usuarios comunes las cosas se complican. 
La solucion a esto fue el desarrollo de una api personalizada para interactuar programaticamente desde nuestra api con la api de keycloak. entonces los usuarios lo unico que ven de keycloak es la pagina de login, y luego la configuracion de la organizacion en la plataforma gestiona via api los roles.
Luego, para simplificar aun mas la experiencia de usuario, habilitamos la posibilidad de que el registro sea por medio de terceros con las autenticaciones de google, linkedIn y GitHub con base en el estandar (OAuth2.0)

13. Despliegue del proyecto - saimon  
14. Arquitectura y tec (stack tecnologico) - saimon  
15. Componentes del sistema - saimon  
16. ServidorWeb - Nginx - fede  
Para el despliegue se configuro un Nginx en la vps para disponibilizar los servicios, en el diagrama se observan los accesos a la aplicaciones del front, tanto la nuestra como el administrador de keycloak. Además de esto nginx permite el acceso a las apis alojadas en quarkus ante cada peticion del cliente. 
17. Autenticacion - keycloak - fede  
El flujo de autenticación es el siguiente, el cliente obtiene la aplicacion frontend, esta solicita el token a keycloak, y luego usa ese token para las peticiones a la api. La api valida el token con keycloak y responde si es válido.
18. Frontend - fede 
Aqui vemos una vista general del arbol de componentes de la aplicacion React. Podemos observar en naranja aquellos componentes que son paginas navegables, las cuales se renderizan en el lugar del Outlet en funcion de la ruta en la que se encuentre el navegador. 
Se destaca en el grafico el detalle de App, que tiene como childrens 5 providers, que se tratan de componentes especiales que definen un contexto que estará disponible para todos los hijos. De esta forma, si el componente Content necesita un dato en el userProvider, lo puede acceder directamente.  

19. Backend - saimon  
20. API proxy - saimon  
21. Persistencia de datos - saimon  
22. Demo- ambos 
Comunicar que pueden ingresar y registrarse los que quieran probar en el momento. 

Comenzar mostrando el login, comentarles lo de keycloak nuevamente, mostrar la posibilidad de ingresar con google, github y linkedin.
- Home: comentar la distribución del home, planteada en secciones, la heroSection como llegada a la pagina, la pathSeccion como acceso principal de juego, donde se pueden ver los paths que crearon las organizaciones. 
Hablar de por qué los carouseles (funcionamiento conocido debido al uso de plataformas de streaming)
Primero, jugar, entrar en un path y mostrar el mapa, mencionar que no se trata del diseño definivo del mapa, sino que se trató de buscar un punto medio entre funcionalidad y estilos.
jugar un par de actividades de ese mapa para que se entienda la idea. Mencionar que todo esto lo configura la organizacion. 

Luego ir al home de nuevo, pasar por los accesos de juego random, de contenidos y de pool,
ingresar a organizaciones. 
mencionar que por el momento la creacion de organizaciones esta libre solo validando el correo. Pero que la proyeccion es que tengan una etapa de verificación mas exahustiva.
acceder a la configuracion de una organizacion, mostrar la ventana de permisos para agregar o editar usuarios. 
ir a la lista de actividades, mencionar que pueden crear actividades sin vincularlas necesariamente a un mapa.
mostrar las estadisticas de la organizacion y luego pasar a la configuracion de mapas.

seleccionar un mapa ya creado y mostrar como se agregan o quitan niveles, como se le vincula una actividad, como se pueden probar ahi las actividades.
Como cargar un contenido. 

Mencionar que los formularios son dinamicos en funcion del modelo definido por el desarrollador.

Luego volver al home
Mostrar el pool de preguntas
(llevar anotada una pregunta)
, luego mostrar la creacion de contenido publico, crear un contenido ahi mismo. (llevar algo anotado, simple, multiple choice),
Luego, para cerrar, el random-play. Mencionar que es lo mas reciente, por lo que puede aun tener algun que otro bug.


23. Proximos pasos  :

Falta agregar: 
- Simplificar despliegue a un simple docker compose up 
- Reportes de contenido
- Permitir usuarios Moderadores para control de contenido,
- Verificacion exhaustiva de organizaciones.
- Mejorar la experiencia en el mapa.
- Clasificadores de Mapas 
- Modo de juego competitivo.


24. Lo que aprendimos 
 Agregar: 
 - estandarizacion de comentarios en los commits (agregar foto del antes y el despues) 
25. Lo que aprendimos a los golpes  
26. Conclusion  
