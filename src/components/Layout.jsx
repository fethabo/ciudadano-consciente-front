import { AppBar, BottomNavigation, BottomNavigationAction, Button} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ReplyIcon from '@mui/icons-material/Reply';


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
      < >  
      {!(location.pathname==='/')&&
        <AppBar position='fixed' sx={{top:0, bottom:'auto'}}>
          <Button onClick={()=>navigate(-1)}><ReplyIcon /> </Button>
        </AppBar>
      }
        <Outlet />
        <AppBar position='fixed' sx={{ bottom:0,top:'auto' }}>
        <BottomNavigation
          value={location.pathname}
          showLabels
          onChange={(event, newValue) => {
            newValue==="" ? navigate(-1) : navigate(newValue);
          }}
        >
          <BottomNavigationAction label="Pool" icon={<QuestionMarkIcon />}  value={"/pool"} />
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} value={"/"}/>
          <BottomNavigationAction label="Perfil" icon={<PersonOutlineIcon />} value={"/profile"} />
        </BottomNavigation>
        </AppBar>
       
    </>
  )
};

export default Layout;
