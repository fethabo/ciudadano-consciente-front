import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useMediaQuery, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Logo = styled('img')({
  width: '50px', // Ajusta el tamaño del logo según sea necesario
  margin: '0 10px',
});

const HeaderBar = styled(AppBar)({
  background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,165,0,0.8) 50%, rgba(0,0,0,1) 100%)', // Amanecer desde el logo
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)', // Sombra en el borde inferior
  padding: '10px 20px',
});

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <HeaderBar position="sticky">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              CIUDADANO
            </Typography>
            <Logo src="/logo-simple-color.png" alt="Logo" />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              CONSCIENTE
            </Typography>
          </Box>
        </Toolbar>
      </HeaderBar>
    );
  }

  return (
    <HeaderBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo
            src="/logo-simple-color.png"
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </Box>
        <IconButton color="inherit" onClick={() => navigate('/profile')}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </HeaderBar>
  );
};

export default Header;
