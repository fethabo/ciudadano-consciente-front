import { AppBar, BottomNavigation, BottomNavigationAction, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

/* DEFINIR CON GRID EL LAYOUT */
const Layout = () => {

  const [value, setValue]= useState(0)

  return (
      <Box >
       {/*  <AppBar>
        <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </Link>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <PersonOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}
        <Outlet />
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
          <BottomNavigationAction label="Pool" icon={<QuestionMarkIcon />} />
          <BottomNavigationAction label="Perfil" icon={<PersonOutlineIcon />} />
        </BottomNavigation>
       </Box>
  )
};

export default Layout;