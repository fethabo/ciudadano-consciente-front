import { Card, styled } from "@mui/material";

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

  export  const NeonCard = styled(Card)((/* { theme } */) => ({
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
  }));