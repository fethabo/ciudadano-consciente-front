import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const CreateOrganizationCard = () => {
  const navigate = useNavigate();
  const [splashes, setSplashes] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);
  
  // Genera un ID único para cada animación de splash
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Maneja el movimiento del mouse dentro del card
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovering) return;

    // Obtiene la posición relativa del cursor dentro del card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Crea un nuevo splash cada cierto tiempo (controlado por un throttle)
    if (Math.random() > 0.7) { // Solo crea un splash ~30% de las veces para no saturar
      const newSplash = {
        id: generateUniqueId(),
        x,
        y,
        size: Math.random() * 15 + 10, // Tamaño aleatorio entre 10-25px
        angle: Math.random() * 360, // Ángulo aleatorio
        distance: Math.random() * 60 + 20, // Distancia aleatoria entre 20-80px
        duration: Math.random() * 0.8 + 0.6, // Duración aleatoria entre 0.6-1.4s
      };

      setSplashes((prevSplashes) => {
        // Limita el número de splashes activos para rendimiento
        const updatedSplashes = [...prevSplashes, newSplash];
        if (updatedSplashes.length > 15) {
          return updatedSplashes.slice(-15);
        }
        return updatedSplashes;
      });

      // Elimina el splash después de que termina la animación
      setTimeout(() => {
        setSplashes((prevSplashes) =>
          prevSplashes.filter((splash) => splash.id !== newSplash.id)
        );
      }, newSplash.duration * 1000 + 100);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setSplashes([]); // Limpia los splashes cuando el mouse sale
      }}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "pointer",
        width: '48%',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        position: 'relative',
        height: '150px',
        overflow: 'hidden',
        background: '#f9f9f9',
      }}
      onClick={() => navigate('/new-organization')}
    >
      {/* Renderiza los splashes de "+" */}
      {splashes.map((splash) => (
        <motion.div
          key={splash.id}
          initial={{
            position: 'absolute',
            left: splash.x,
            top: splash.y,
            opacity: 0.8,
            scale: 0.5,
            rotate: 0,
          }}
          animate={{
            left: splash.x + Math.cos(splash.angle * (Math.PI / 180)) * splash.distance,
            top: splash.y + Math.sin(splash.angle * (Math.PI / 180)) * splash.distance,
            opacity: 0,
            scale: 0,
            rotate: splash.angle * 2,
          }}
          transition={{
            duration: splash.duration,
            ease: "easeOut",
          }}
          style={{
            position: 'absolute',
            fontWeight: 'bold',
            fontSize: `${splash.size}px`,
            color: '#aaa',
            zIndex: 1,
          }}
        >
          +
        </motion.div>
      ))}

      {/* Contenedor para el + principal y el texto que se animarán juntos */}
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          height: '100%',
          width: '100%',
          zIndex: 2, // Encima de los splashes
        }}
        initial="initial"
        animate={isHovering ? "hover" : "initial"}
      >
        {/* El símbolo + que rotará y desaparecerá */}
        <motion.div
          variants={{
            initial: { 
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { duration: 0.3 }
            },
            hover: { 
              y: -40,
              rotate: 90,
              transition: { duration: 0.3 }
            },
          }}
        >
          <Typography variant="h3" sx={{ color: '#666' }}>+</Typography>
        </motion.div>

        {/* El texto que aparecerá */}
        <motion.div
          variants={{
            initial: { 
              opacity: 0,
              y: 40,
              transition: { duration: 0.3 }
            },
            hover: { 
              opacity: 1,
              y: -10,
              transition: { duration: 0.3, delay: 0.1 }
            },
          }}
          style={{
            textAlign: 'center',
            width: '80%',
            position: 'absolute',
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#555',
              fontWeight: 'medium',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
            }}
          >
            Crear organización
          </Typography>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CreateOrganizationCard;