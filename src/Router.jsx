import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from './pages/Login';
import NotImplemented from './pages/NotImplemented';

function Router() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/init" element={<NotImplemented />} />  {/* INIT (pagina inicial, previo al home(loading?)) */}
            <Route path="/pool" element={<NotImplemented />} />
            <Route path="/organizations" element={<NotImplemented />} /> 
            <Route path="/settings" element={<NotImplemented />} /> 
            <Route path="/map/:level" element={<NotImplemented />} />
            <Route path="/level/:level" element={<NotImplemented />} />
            <Route path="/activity/:level" element={<NotImplemented />} />
            <Route path="/perfil" element={<NotImplemented />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default Router
