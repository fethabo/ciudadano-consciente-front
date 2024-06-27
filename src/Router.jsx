import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from './pages/Login';
import NotImplemented from './pages/NotImplemented';
import Pool from './pages/Pool'
import Organizations from './pages/Organizations'
import Settings from './pages/Settings'
import Map from './pages/Map'
import Level from './pages/Level'
import Activity from './pages/Activity'
import Profile from './pages/Profile'
//import ProtectedRoute from "./security/ProtectedRoute";
import useObtenerToken from "./security/hooks/useObtenerToken";

/* TODO: AGREGAR ERROR BOUNDARY 
* VER NESTING DE REACT ROUTER, EN LA DOCUMENTACION SOLO HAY UN TODO -.-
*/
function Router() {
 
  const token = useObtenerToken();
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/init" element={<NotImplemented />} />  {/* INIT (pagina inicial, previo al home(loading?)) */}
            <Route path="/pool" element={<Pool />} /> {/* VISTA DE POOL DE PREGUNTAS, probablemente luego haya mas rutas */}
            <Route path="/organizations" element={<Organizations />} >{/* VISTA DE ORGANIZACIONES DISPONIBLES (ORGANIZACIONES DEL USUARIO), SOLO ACCESIBLE DESDE EL HOME PARA LOS USUARIOS QUE PERTENECEN A ALGUNA ORGANIZACION */}
              <Route path=":idOrganization" element={<NotImplemented />}/>{/* VISTA general de la organizacion,permite acceder a mapas, a contenidos, a usuarios (SI CORRESPONDE) */}
              <Route path=":idOrganization/maps" element={<NotImplemented />}/>{/* VISTA DE SELECCION DE MAPAS DE LA ORGANIZACION, PARA UN MODERADOR SERAN LOS PATHS de la organizacion, para un divulgador los levels que tiene rol de divulgador*/}
              <Route path=":idOrganization/maps/:idMap" element={<NotImplemented />}/>  {/*VISTA DE CONFIGURACION DE MAPA Ver de hacer la configuracion del mapa con un mapCytoscape Y VENTANAS EMERGENTES */}
              
              <Route path=":idOrganization/level" element={<NotImplemented />}/>{/* EN EL FORMULARIO TAMBIEN PODEMOS AGREGAR DIVULGADORES (USUARIOS DE LA ORGANIZACION) */}
              <Route path=":idOrganization/level/:idLevel" element={<NotImplemented />}/>{/* VISTA DE EDICION DE UN LEVEL */}
              
              <Route path=":idOrganization/level/:idLevel/activity" element={<NotImplemented />}/>{/* En esta vista se realiza la carga de la actividad, debe seleccionar el contenido antes de ingresar la descripcion, pueden acceder a la gestion de contenidos de la organizacion desde aca.  */}
              <Route path=":idOrganization/level/:idLevel/activity/:idActivity" element={<NotImplemented />}/>{/* El contenido lo puede usar un usuario que pertenece a la organizacion del level relacionado a ese contenido. Lo puede editar el usuario que es divulgador de la rama a la que pertenece el contenido */}
       
              <Route path=":idOrganization/content" element={<NotImplemented />}/>{/* VISTA PARA CREACION DE CONTENIDO, ACCESIBLE DESDE EL FORMULARIO DE ACTIVIDAD Y DESDE LA RAIZ DE LA ORGANIZACION*/}
              <Route path=":idOrganization/users" element={<NotImplemented />}/>  {/* VISTA PARA CONFIGURAR USUARIOS DE LA ORGANIZACION, accesible desde la raiz de la organizacion */}
            </Route> 
            <Route path="/settings" element={<Settings />} /> 
            <Route path="/map"  >{/* Pantalla de vista dle mapa, se muestran los branches y sus levels agrupados */}
              <Route path=":idParentLevel" index element={<Map />} />
              <Route path=":idParentLevel/:level" element={<Level />} />
              <Route path=":idParentLevel/:level/activity/" element={<Activity />} />
            </Route>
            {console.log(token)}       
            <Route path="/profile" element={token? <Profile />:<Navigate to="/login" replace={true} />} />

            {/* <ProtectedRoute path="/profile" componente={<Profile />}/> */}
           </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router
