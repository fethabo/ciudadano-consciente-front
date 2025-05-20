import { AppBar, BottomNavigation, BottomNavigationAction, Container } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Header from "./Header";
import useObtenerToken from "../security/hooks/useGetToken";
import ErrorBoundary from './ErrorBoundary/ErrorBoundary.jsx';

// Componente para controlar el scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Cuando cambia la ruta, hace scroll al inicio de la página
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // Opcional: hace que el scroll sea suave
    });
  }, [pathname]);
  
  return null;
};

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useObtenerToken();
  
  return (
    <>
      {/* Componente que resetea el scroll al cambiar rutas */}
      <ScrollToTop />
      
      <Header />
      <Container sx={{
        marginBottom: '4em', 
        padding: {xs: '0.5rem'},
    //    minHeight: '100vh' // Asegura que el contenedor tenga al menos la altura de la ventana
      }}>  
        {token &&
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        }
        
        <AppBar 
          position='fixed' 
          sx={{ 
            bottom: 0, 
            top: 'auto', 
            display: { xs: 'flex', md: 'none' } // Solo visible en móvil (xs)
          }}
        >
          <BottomNavigation
            value={location.pathname}
            showLabels
            onChange={(event, newValue) => {
              if (newValue === "") {
                navigate(-1);
              } else {
                navigate(newValue);
              }
            }}
          >
            <BottomNavigationAction 
              label="Pool" 
              icon={<RecordVoiceOverIcon />}  
              value={"/pool"} 
            />
            <BottomNavigationAction 
              label="Inicio" 
              icon={<HomeIcon />} 
              value={"/"}
            />
            <BottomNavigationAction 
              label="Perfil" 
              icon={<PersonOutlineIcon />} 
              value={"/profile"} 
            />
          </BottomNavigation>
        </AppBar>
      </Container>
    </>
  );
};

export default Layout;