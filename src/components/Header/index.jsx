import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { height, styled } from '@mui/system';
import { useMediaQuery, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';

const Logo = styled('img')({
  width: '50px',
  margin: '0 10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  }
});

const HeaderBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,165,0,0.8) 50%, rgba(0,0,0,1) 100%)',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  padding: '10px 20px',
  transition: 'all 0.5s ease-in-out',
  willChange: 'opacity, transform',
}));

const Header = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false);
      return;
    }
    const handleScroll = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

 
 
  const headerSx = isHome
    ? {
        opacity: isHeroVisible ? 0 : 1,
        transform: isHeroVisible ? 'translateY(-100%)' : 'translateY(0)',
        pointerEvents: isHeroVisible ? 'none' : 'auto',
        height: isHeroVisible ? '0px' : 'auto',
      }
    : {
        opacity: 1,
        transform: 'translateY(0)',
        pointerEvents : 'auto',
        height:'auto'

    };

    if (isMobile) {
      return (
        <HeaderBar 
          position="sticky"
          sx={headerSx}
        >
          <Toolbar>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexGrow: 1,
              animation: isHeroVisible ? 'none' : 'slideFromTop 0.5s ease-out',
              '@keyframes slideFromTop': {
                '0%': { transform: 'translateY(-100%)', opacity: 0 },
                '100%': { transform: 'translateY(0)', opacity: 1 }
              }
            }}>
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
    <HeaderBar position="sticky" sx={headerSx}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Box
         onClick={() => navigate('/')}
          sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          cursor: 'pointer',
          maxWidth:'300px'
        }}>
          <Logo
            src="/logo-simple-color.png"
            alt="Logo"
           
          />
          <Box textAlign={"left"}>
            <Typography>CIUDADANO CONSCIENTE</Typography>
            <Typography variant="body2">Gamificando el saber</Typography>
          </Box>
        </Box>
        <IconButton 
          color="inherit" 
          onClick={() => navigate('/profile')}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </HeaderBar>
  );
};

export default Header;
