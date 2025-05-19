import { Typography, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QuizIcon from '@mui/icons-material/Quiz';

// Card contenedor con efecto clickeable
const ClickableCard = styled(motion.div)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius || '4px',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
}));

// Gradiente animado para los backgrounds con opacidad ajustada
const AnimatedBackground = styled(motion.div, {
  shouldForwardProp: prop => prop !== '$colorMain' && prop !== '$colorLight',
})(({ $colorMain, $colorLight }) => {
  // Función para hacer un color más opaco
  const makeMoreOpaque = (color) => {
    // Si es un color hex, convertirlo a rgba con opacidad
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 0.85)`;
    }
    // Si ya es rgba, ajustar la opacidad
    if (color.startsWith('rgb')) {
      return color.replace(/rgba?\((.+?)\)/, (_, p1) => {
        const parts = p1.split(',');
        if (parts.length === 4) {
          // Ya tiene alfa, simplemente ajustar
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.85)`;
        }
        // No tiene alfa, añadir
        return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.85)`;
      });
    }
    return color;
  };

  const opaqueMain = makeMoreOpaque($colorMain);
  const opaqueLight = makeMoreOpaque($colorLight);

  return {
    background: `linear-gradient(135deg, ${opaqueLight} 0%, ${opaqueMain} 100%)`,
    height: '100%',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.15, // Reducido para un efecto más sutil
      backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 70%)',
      transition: 'opacity 0.3s ease-in-out',
      zIndex: 1,
    },
    '&:hover::before': {
      opacity: 0.3,
    },
  };
});

// Botón con efecto hover
const ActionButton = styled(motion.div, {
  shouldForwardProp: prop => prop !== '$bgColor' && prop !== '$textColor',
})(({ $bgColor, $textColor }) => {
  // Hacer el botón más opaco también
  const makeMoreOpaque = (color) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 0.9)`;
    }
    if (color.startsWith('rgb')) {
      return color.replace(/rgba?\((.+?)\)/, (_, p1) => {
        const parts = p1.split(',');
        if (parts.length === 4) {
          return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.9)`;
        }
        return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, 0.9)`;
      });
    }
    return color;
  };

  return {
    padding: '10px 16px',
    borderRadius: '4px',
    backgroundColor: makeMoreOpaque($bgColor),
    color: $textColor,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: makeMoreOpaque($bgColor),
      filter: 'brightness(90%)',
      transform: 'scale(1.05)',
    },
  };
});

  // Componente de card reutilizable
const AccessCard = ({ title, description, buttonText, colorMain, colorLight, textColor, to, icon }) => {
  const navigate = useNavigate();
  
  // Definir variantes de animación para el icono
  const iconVariants = {
    normal: { y: 0, scale: 1, rotate: 0 },
    hover: { y: -5, scale: 1.2, rotate: [0, -10, 10, -10, 0] }
  };
  
  return (
    <ClickableCard
      whileHover={{ scale: 1.03 }}
      onClick={() => navigate(to)}
      initial="normal"
      whileHover="hover"
    >
      <AnimatedBackground 
        $colorMain={colorMain}
        $colorLight={colorLight}
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: 'linear' 
        }}
      >
        <Box sx={{ zIndex: 2 }}>
          {/* Icono animado que responde al hover de la card */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '16px',
              zIndex: 2,
            }}
            variants={iconVariants}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <Typography 
            variant="h5" 
            component="div" 
            color="#ffffff"
            fontWeight="bold"
            align="center"
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body1" 
            color="#ffffff"
            align="center"
            sx={{ mb: 3, opacity: 0.9 }}
          >
            {description}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, zIndex: 2 }}>
          <ActionButton
            $bgColor={colorMain}
            $textColor={textColor}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </ActionButton>
        </Box>
      </AnimatedBackground>
    </ClickableCard>
  );
};

const ContentAccess = () => {
  const theme = useTheme();
  
  // Obtener colores del tema de MUI v6
  const primaryMain = theme.palette?.primary?.main || '#1976d2';
  const primaryLight = theme.palette?.primary?.dark || '#42a5f5';
  const secondaryMain = theme.palette?.secondary?.main || '#9c27b0';
  const secondaryLight = theme.palette?.secondary?.dark || '#ba68c8';
  const contrastText = '#ffffff';
  
  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
      gap: 3, 
      m: 2 
    }}>
      <AccessCard 
        title="Biblioteca de Contenidos"
        description="Explora y contribuye al catálogo de recursos, imágenes y materiales que enriquecen la experiencia de juego."
        buttonText="Acceder a Contenidos"
        colorMain={primaryMain}
        colorLight={primaryLight}
        textColor={contrastText}
        to="/contents"
        icon={<LibraryBooksIcon sx={{ fontSize: 48, color: "#ffffff" }} />}
      />
      
      <AccessCard 
        title="Pool de Preguntas"
        description="Revisa las preguntas existentes o propón nuevos desafíos para añadir diversión y conocimiento al juego."
        buttonText="Ver Preguntas" 
        colorMain={secondaryMain}
        colorLight={secondaryLight}
        textColor={contrastText}
        to="/pool"
        icon={<QuizIcon sx={{ fontSize: 48, color: "#ffffff" }} />}
      />
    </Box>
  );
};

export default ContentAccess;
