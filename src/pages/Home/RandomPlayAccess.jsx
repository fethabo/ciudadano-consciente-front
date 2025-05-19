import { Box, Typography } from "@mui/material";
import { GameIconsRollingDices } from "@icons/GameIconsRollingDices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

// Componente para el icono de dados
// La animación se controlará desde el componente padre
const AnimatedDice = ({ isAnimating = false }) => (
  <motion.div
    animate={isAnimating ? {
      rotate: [0, 15, -15, 0],
      scale: 1.1,
      transition: { 
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 1],
        repeat: Infinity, 
        repeatType: "reverse"
      }
    } : {}}
    whileTap={{ scale: 0.9 }}
  >
    <GameIconsRollingDices width="100%" />
  </motion.div>
);

AnimatedDice.propTypes = {
  isAnimating: PropTypes.bool
};

// Botón animado con motion
const AnimatedButton = ({ onClick, children }) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation(); // Evitar propagación del clic
      onClick();
    }}
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "#0d47a1",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)"
    }}
    whileTap={{ scale: 0.95 }}
    style={{
      marginTop: "8px",
      padding: "12px 32px",
      borderRadius: "8px",
      backgroundColor: "#1976d2",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s"
    }}
  >
    {children}
  </motion.button>
);

AnimatedButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

function RandomPlayAccess() {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);
    
    const handleNavigate = () => {
        navigate("/random-play");
    };
    
    // Variantes para la animación inicial
    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6,
          staggerChildren: 0.1
        }
      }
    };
    
    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    };

    // Variantes para el efecto pulsante del contenedor
    const pulseAnimation = {
      initial: { boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)" },
      pulse: { 
        boxShadow: ["0px 2px 10px rgba(0, 0, 0, 0.05)", "0px 4px 15px rgba(25, 118, 210, 0.3)", "0px 2px 10px rgba(0, 0, 0, 0.05)"],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    };
    
    return ( 
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            onClick={handleNavigate}
            initial="initial"
            animate="pulse"
            variants={pulseAnimation}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(0, 123, 255, 0.15)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              cursor: "pointer",
              position: "relative"
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "rgba(0, 123, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle, transparent 1%, rgba(25, 118, 210, 0.04) 1%) center/15000%",
                  opacity: 0,
                  transition: "background 0.5s, opacity 1s"
                },
                "&:hover::after": {
                  opacity: 1,
                  backgroundSize: "100%"
                }
              }}
            >
              <motion.div variants={itemVariants}>
                <Typography variant="h5" gutterBottom>
                  ¡Modo Aleatorio!
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 2 }}>
                  ¿Te animas a un desafío diferente? Prueba el modo de juego aleatorio y explora todos los contenidos disponibles en la plataforma de forma inesperada. ¡Ideal para aprender y divertirte!
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants} sx={{ mb: 2 }}>
                <Box sx={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AnimatedDice  isAnimating={isHovering} />
                </Box>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedButton onClick={handleNavigate}>
                  ¡Jugar Ahora!
                </AnimatedButton>
              </motion.div>
              
              {/* Elementos decorativos animados en segundo plano */}
              <Box sx={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden" }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: "absolute",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "rgba(25, 118, 210, 0.2)",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </Box>
            </Box>
          </motion.div>
        </motion.div>
     );
}

export default RandomPlayAccess;