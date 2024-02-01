import { AppBar, BottomNavigation, BottomNavigationAction,  } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useState } from "react";

const Layout = () => {
  const navigate = useNavigate()
  const [bottomValue, setBottomValue] = useState()
  return (
      < >  
        <Outlet />
        <AppBar position='fixed' sx={{ bottom:0,top:'auto' }}>
        <BottomNavigation
          value={bottomValue}
          showLabels
          onChange={(event, newValue) => {
            setBottomValue(newValue)
            newValue==="" ? navigate(-1) : navigate(newValue);
          }}
        >
          <BottomNavigationAction label="Pool" icon={<QuestionMarkIcon />}  value={"/pool"} />
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} value={"/"}/>
          <BottomNavigationAction label="Perfil" icon={<PersonOutlineIcon />} value={"/perfil"} />
        </BottomNavigation>
        </AppBar>
       
    </>
  )
};

export default Layout;
