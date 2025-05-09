import { AppBar, BottomNavigation, BottomNavigationAction, /* Button,  */Container} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import Header from "./Header";
import useObtenerToken from "../security/hooks/useGetToken";
import ErrorBoundary from './ErrorBoundary/ErrorBoundary.jsx';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useObtenerToken();
  return (
    <>
    <Header />
      <Container sx={{marginBottom:'4em', padding: {xs:'0.5rem',md:'2rem'}}} >  
    
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
            display: { xs: 'flex', md: 'none' } // Only visible on mobile (xs)
          }}
        >
            <BottomNavigation
            value={location.pathname}
            showLabels
            onChange={(event, newValue) => {
              newValue === "" ? navigate(-1) : navigate(newValue);
            }}
          >
            <BottomNavigationAction label="Pool" icon={<RecordVoiceOverIcon />}  value={"/pool"} />
            <BottomNavigationAction label="Inicio" icon={<HomeIcon />} value={"/"}/>
            <BottomNavigationAction label="Perfil" icon={<PersonOutlineIcon />} value={"/profile"} />
          </BottomNavigation>
        </AppBar>
       
    </Container>
    </>
  )
};

export default Layout;
