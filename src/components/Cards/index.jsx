import { Card, styled } from "@mui/material";
export const RadialGradientCard = styled(Card)(({ theme }) => ({
  background: 'radial-gradient(circle, #00796b 0%, #004d40 100%)',
  color: theme.palette.text.primary,
  borderRadius: '15px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    background: 'radial-gradient(circle, #004d40 0%, #00796b 100%)',
  },
}));

export const SolidAccentCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#6a1b9a',
  borderLeft: '5px solid #ffeb3b',  // Línea de acento en amarillo
  color: theme.palette.text.primary,
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  '&:hover': {
    backgroundColor: '#4a148c',
  },
}));

export const DiagonalGradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff9800 0%, #e57373 100%)',
  color: theme.palette.text.primary,
  borderRadius: '12px',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #e57373 0%, #ff9800 100%)',
  },
}));

export const NeonCard = styled(Card)((/* { theme } */) => ({
  backgroundColor: '#1e3c72',
  borderRadius: '15px',
  border: '1px solid #00ffcc',  // Borde neón
  boxShadow: '0 0 15px #00ffcc',  // Sombra neón
  color: '#ffffff',
  '&:hover': {
    boxShadow: '0 0 20px #00ffcc',
  },
}));

export const FrostedGlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',  // Efecto vidrio esmerilado
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: theme.palette.text.primary,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
}));

export const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: theme.palette.text.primary,
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
  '&:hover': {
    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
  },
}));
export const StripedCard = styled(Card)(({ theme }) => ({
  background: 'repeating-linear-gradient(45deg, #607d8b, #607d8b 10px, #455a64 10px, #455a64 20px)',
  color: theme.palette.text.primary,
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'repeating-linear-gradient(45deg, #455a64, #455a64 10px, #607d8b 10px, #607d8b 20px)',
  },
}));

export const PolkaDotCard = styled(Card)(({ theme }) => ({
  background: 'radial-gradient(circle, #ffeb3b 1px, transparent 1px), radial-gradient(circle, #ffeb3b 1px, #6a1b9a 1px)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 10px 10px',
  color: theme.palette.text.primary,
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'radial-gradient(circle, #6a1b9a 1px, transparent 1px), radial-gradient(circle, #6a1b9a 1px, #ffeb3b 1px)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
  },
}));

export const MetallicCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #b0bec5 0%, #78909c 100%)',
  color: theme.palette.text.primary,
  borderRadius: '12px',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #78909c 0%, #b0bec5 100%)',
  },
}));
/* 
export const RadialGradientCard = styled(Card)(({ theme }) => ({
    background: 'radial-gradient(circle, #00796b 0%, #004d40 100%)',
    color: theme.palette.text.primary,
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
  }));

  export  const SolidAccentCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#6a1b9a',
    borderLeft: '5px solid #ffeb3b',  // Línea de acento en amarillo
    color: theme.palette.text.primary,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  }));

  export  const DiagonalGradientCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ff9800 0%, #e57373 100%)',
    color: theme.palette.text.primary,
    borderRadius: '12px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
  }));

  export  const NeonCard = styled(Card)(( { theme } ) => ({
    backgroundColor: '#1e3c72',
    borderRadius: '15px',
    border: '1px solid #00ffcc',  // Borde neón
    boxShadow: '0 0 15px #00ffcc',  // Sombra neón
    color: '#ffffff',
  }));

  export  const FrostedGlassCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',  // Efecto vidrio esmerilado
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: theme.palette.text.primary,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  }));

  export const GradientCard = styled(Card)(({ theme }) => ({
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: theme.palette.text.primary,
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
  })); */