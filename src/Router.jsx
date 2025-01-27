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
import Activity from './pages/Activity'
import Profile from './pages/Profile'
//import ProtectedRoute from "./security/ProtectedRoute";
import useObtenerToken from "./security/hooks/useGetToken";
import Organization from "./pages/Organization";
import OrganizationUsers from "./pages/Organization/OrganizationUsers";
import OrganizationForm from "./components/Forms/FormOrganization";
import ContentsPage from "./pages/Contents";
import OrganizationMaps from "./pages/OrganizationMaps";
import FormMap from "./components/Forms/FormMap";
import OrganizationAccess from "./pages/Organization/OrganizationAccess";
import MapConfig from "./pages/MapConfig";
import OrganizationContents from "./pages/OrganizationContents";

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
            <Route path="/pool" element={<Pool />} /> {/* VISTA DE POOL DE PREGUNTAS*/}
            <Route path="/pool/question/:idConcern/answer" element={<NotImplemented />} /> {/* VISTA DE Respuesta DE PREGUNTAS, Creacion de contenido especifico (publico) */}
            <Route path="/pool/content/:idContent/play" element={<NotImplemented />} /> {/* VISTA juego de contenido */}
            <Route path="/random-play" element={<NotImplemented />} />{/* Vista de Modo de juego random (contenido publico) */}
            <Route path="/organizations"  element={<Organizations />} />{/* VISTA DE ORGANIZACIONES DISPONIBLES (ORGANIZACIONES DEL USUARIO), SOLO ACCESIBLE DESDE EL HOME PARA LOS USUARIOS QUE PERTENECEN A ALGUNA ORGANIZACION */}
              <Route path="/organizations/:idOrganization" element={<Organization />} >{/* VISTA general de la organizacion,permite acceder a mapas, a contenidos, a usuarios (SI CORRESPONDE) */}
                <Route path="/organizations/:idOrganization" element={<OrganizationAccess />}/>
                <Route path="/organizations/:idOrganization/users" element={<><OrganizationAccess /><OrganizationUsers /></>}/>{/* Edicion de usuarios de la organizacion , pagina o ventana???*/}
                <Route path="/organizations/:idOrganization/maps" element={<OrganizationMaps />}/>{/* VISTA DE SELECCION DE MAPAS DE LA ORGANIZACION, PARA UN MODERADOR SERAN LOS PATHS de la organizacion, para un divulgador los levels que tiene rol de divulgador*/}
                <Route path="/organizations/:idOrganization/maps/add" element={<FormMap />}/>  {/*VISTA DE CONFIGURACION DE MAPA Ver de hacer la configuracion del mapa con un mapCytoscape Y VENTANAS EMERGENTES */}              
                <Route path="/organizations/:idOrganization/maps/:idParentLevel" element={<MapConfig />}/>  {/*VISTA DE CONFIGURACION DE MAPA Ver de hacer la configuracion del mapa con un mapCytoscape Y VENTANAS EMERGENTES */}              
                <Route path="/organizations/:idOrganization/contents" element={<OrganizationContents />}/>{/* VISTA PARA CREACION DE CONTENIDO, ACCESIBLE DESDE EL FORMULARIO DE creacion de ACTIVIDAD Y DESDE LA RAIZ DE LA ORGANIZACION*/}
                <Route path="/organizations/:idOrganization/references" element={<NotImplemented />}/>{/* VISTA PARA CREACION DE Referencias*/}
                <Route path="/organizations/:idOrganization/stadistics" element={<NotImplemented />}/>{/* VISTA De dashboard de org*/} 
              </Route>
              <Route path="/organizations/:idOrganization/edit" element={<OrganizationForm />}/>{/* Edicion de organizacion*/}
              

              <Route path="/organizations/:idOrganization/level" element={<NotImplemented />}/>{/* EN EL FORMULARIO TAMBIEN PODEMOS AGREGAR DIVULGADORES (USUARIOS DE LA ORGANIZACION) */}
              <Route path="/organizations/:idOrganization/level/:idLevel" element={<NotImplemented />}/>{/* VISTA DE EDICION DE UN LEVEL */}
              <Route path="/organizations/:idOrganization/level/:idLevel/activity" element={<NotImplemented />}/>{/* En esta vista se realiza la carga de la actividad, debe seleccionar el contenido antes de ingresar la descripcion, pueden acceder a la gestion de contenidos de la organizacion desde aca.  */}
              <Route path="/organizations/:idOrganization/level/:idLevel/activity/:idActivity" element={<NotImplemented />}/>{/* El contenido lo puede usar un usuario que pertenece a la organizacion del level relacionado a ese contenido. Lo puede editar el usuario que es divulgador de la rama a la que pertenece el contenido */}
            
            <Route path="/settings" element={<Settings />} /> 
            <Route path="/map"  >{/* Pantalla de vista dle mapa, se muestran los branches y sus levels agrupados */}
              <Route path=":idParentLevel" index element={<Map />} />
             {/*  <Route path=":idParentLevel/:level" element={<Level />} /> */}
              <Route path=":idParentLevel/activity/" element={<Activity />} />
            </Route>
            {/* {console.log(token)}   */}     
            <Route path="/profile" element={token? <Profile />:<Navigate to="/login" replace={true} />} />
            <Route path="/contents" element={<ContentsPage />} /> {/* VISTA DE Contenidos del usuario */}
            <Route path="/dev" element={<NotImplemented />} /> {/* VISTA DE creacion de activities types */}

            {/* <ProtectedRoute path="/profile" componente={<Profile />}/> */}
           </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router
