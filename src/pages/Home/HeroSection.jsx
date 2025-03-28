import { Typography } from "@mui/material";

const HeroSection = () => {
    const scrollToPaths = () => {
        const pathsSection = document.getElementById('paths');
        if (pathsSection) {
            pathsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="heroSection" className="hero-section">
            
            <img 
                src="/logo-color.png" 
                alt="Logo Ciudadano Consciente" 
                style={{ 
                    display: 'block', 
                    margin: '0 auto', 
                    height: '50vh', 
                    objectFit: 'contain' 
                }} 
            />
           {/*  <Typography variant="h2"> Ciudadano Consciente </Typography>
            */} <div className="hero-description">
                <Typography position='top' variant='h6'>    ¡Bienvenido! Únete a nosotros y comienza a explorar caminos para un mundo mejor. ¡Juega y aprende!
                </Typography>
                <Typography variant="body2">Abre tu camino entre nuestras opciones de juego y descubre un mundo de aprendizaje interactivo. Cada partida es una oportunidad para mejorar tus habilidades como ciudadano.</Typography>
            </div>
            
            <button className="hero-button" onClick={scrollToPaths}>
                <span className="arrow">↓</span>
            </button>
        </section>
    );
};

export default HeroSection;