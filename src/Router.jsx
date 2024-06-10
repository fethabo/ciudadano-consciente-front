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
            <Route path="/pool" element={<Pool />} />
            <Route path="/organizations" element={<Organizations />} /> 
            <Route path="/settings" element={<Settings />} /> 
            <Route path="/map"  >{/* Pantalla de vista dle mapa, se muestran los branches y sus levels agrupados */}
              <Route path=":idParentLevel" index element={<Map />} />
              <Route path=":idParentLevel/:level" element={<Level />} />
              <Route path=":idParentLevel/:level/activity/" element={<Activity />} />
            </Route>
            {console.log(token)}       
            <Route path="/profile" element={token?<Profile />:<Navigate to="/login" replace={true} />} />

            {/* <ProtectedRoute path="/profile" componente={<Profile />}/> */}
           </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router
