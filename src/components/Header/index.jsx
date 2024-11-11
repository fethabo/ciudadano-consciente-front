import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useContext } from 'react';
import { KeycloakContext } from '../../security/KeycloakContext';
const Logo = styled('img')({
  width: '50px',  // Ajusta el tamaño del logo según sea necesario
  margin: '0 10px',
});

const HeaderBar = styled(AppBar)({
    background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,165,0,0.8) 50%, rgba(0,0,0,1) 100%)', // Amanecer desde el logo
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',  // Sombra en el borde inferior
    padding: '10px 20px',
  });

  /* TODO: hacer Sticky el header? podriamos descartar los botones , me resultan poco practicos */
const Header = () => {
  const keycloakContext = useContext(KeycloakContext)
  return (
    <HeaderBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            CIUDADANO
          </Typography>
          <Logo src="/logo.jpg" alt="Logo" />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            CONSCIENTE
          </Typography>
        </Box>
        <IconButton sx={{position:'absolute', right:0}} onClick={()=> keycloakContext?.logout()}><ExitToAppIcon /></IconButton>
       
      </Toolbar>
    </HeaderBar>
  );
};

export default Header;
