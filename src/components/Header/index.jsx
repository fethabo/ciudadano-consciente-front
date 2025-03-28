import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useMediaQuery, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';

const Logo = styled('img')({
  width: '50px',
  margin: '0 10px',
  transition: 'transform 0.3s ease', // Añadido para efecto hover
  '&:hover': {
    transform: 'scale(1.1)', // Efecto hover sutil
  }
});

const HeaderBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(255,165,0,0.8) 50%, rgba(0,0,0,1) 100%)',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  padding: '10px 20px',
  transition: 'all 0.5s ease-in-out', // Transición para opacity y transform
  willChange: 'opacity, transform', // Optimización de rendimiento
}));

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("heroSection");

    if (!heroSection) {
      setHideHeader(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const isFullyVisible = entry.intersectionRatio === 1;
        const isBelowViewport = rect.bottom > window.innerHeight;

        setHideHeader(isFullyVisible || isBelowViewport);
      },
      { threshold: 1 }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  const headerSx = {
    opacity: hideHeader ? 0 : 1,
    transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
    pointerEvents: hideHeader ? "none" : "auto",
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
            animation: hideHeader ? 'none' : 'slideFromTop 0.5s ease-out',
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
    <HeaderBar 
      position="sticky"
      sx={headerSx}
    >
      <Toolbar>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexGrow: 1,
          animation: hideHeader ? 'none' : 'slideFromTop 0.5s ease-out',
          '@keyframes slideFromTop': {
            '0%': { transform: 'translateY(-100%)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 }
          }
        }}>
          <Logo
            src="/logo-simple-color.png"
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
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