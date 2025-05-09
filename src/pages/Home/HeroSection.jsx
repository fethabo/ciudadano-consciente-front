import AnimatedArrowButton from "@components/AnimatedArrowButton";
import { Typography } from "@mui/material";

const HeroSection = () => {
   
    return (
        <section id="heroSection" className="hero-section">
            <img 
                src="/logo-color.png" 
                alt="Logo Ciudadano Consciente" 
                style={{ 
                    display: 'block', 
                    margin: '0 auto', 
                    height: '40vh', 
                    objectFit: 'contain' 
                }} 
            />
            <div className="hero-description">
                <Typography position='top' variant='h6'>    ¡Bienvenido! Únete a nosotros y comienza a explorar caminos para un mundo mejor. ¡Juega y aprende!
                </Typography>
                <Typography variant="body2">Abre tu camino entre nuestras opciones de juego y descubre un mundo de aprendizaje interactivo. Cada partida es una oportunidad para mejorar tus habilidades como ciudadano.</Typography>
            </div>
            <AnimatedArrowButton texto="comenzar" hrefSection="#pathsSection"/>
          
        </section>
    );
};

export default HeroSection;