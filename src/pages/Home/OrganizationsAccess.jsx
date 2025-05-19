import { FrostedGlassCard } from "@components/Cards";
import { CardContent, Typography, Box  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BusinessCenter } from "@mui/icons-material";
import { useState } from "react";

// Componente envoltorio para Motion
const MotionBox = motion(Box);
const MotionFrostedGlassCard = motion(FrostedGlassCard);

function OrganizationsAccess() {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);

    // Configuración de líneas aleatorias de fondo
    const lines = Array(5).fill(null).map((_, i) => ({
        id: i,
        direction: Math.random() > 0.5 ? "horizontal" : "vertical",
        position: Math.floor(Math.random() * 100),
        delay: i * 0.1,
    }));

    return (
        <MotionFrostedGlassCard 
            onClick={() => navigate("/organizations")} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '200px',
                borderRadius: 2
            }}
        >
            {/* Líneas aleatorias de fondo */}
            {lines.map((line) => (
                <MotionBox
                    key={line.id}
                    sx={{
                        position: 'absolute',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        ...(line.direction === "horizontal" 
                            ? { 
                                height: '1px', 
                                width: '100%',
                                top: `${line.position}%`,
                                left: 0
                            } 
                            : { 
                                width: '1px', 
                                height: '100%',
                                left: `${line.position}%`,
                                top: 0
                            })
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={hovered 
                        ? { opacity: 1, scale: 1 } 
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ 
                        delay: line.delay,
                        duration: 0.4
                    }}
                />
            ))}

            <CardContent className="cardOrganizations" sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MotionBox
                        sx={{ 
                            mr: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 1.5
                        }}
                        animate={hovered 
                            ? { rotate: 360, backgroundColor: 'rgba(255, 255, 255, 0.2)' } 
                            : { rotate: 0 }
                        }
                        transition={{ duration: 0.5 }}
                    >
                        <BusinessCenter sx={{ color: '#ffffff', fontSize: 32 }} />
                    </MotionBox>
                    <Typography variant="h5" color="#ffffff" fontWeight="bold">
                        Organizaciones
                    </Typography>
                </Box>

                <Typography variant="body1" color="#ffffff" sx={{ mb: 2 }}>
                    Crea tu organización y administra mapas de contenidos para tus propios caminos.
                </Typography>
                
                <MotionBox 
                    sx={{ mt: 'auto' }}
                    initial={{ opacity: 0 }}
                    animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 1 }}>
                        • Diseña mapas interactivos y escenarios de juego
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 1 }}>
                        • Gestiona usuarios y permisos de acceso
                    </Typography>
                </MotionBox>
                
                <MotionBox 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        mt: 2
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Typography 
                        variant="button" 
                        color="#ffffff"
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        Acceder
                        <motion.span
                            animate={hovered ? { x: 5 } : { x: 0 }}
                            transition={{ duration: 0.2, repeat: hovered ? Infinity : 0, repeatType: "reverse" }}
                            style={{ marginLeft: 4 }}
                        >
                            →
                        </motion.span>
                    </Typography>
                </MotionBox>
            </CardContent>
        </MotionFrostedGlassCard>
    );
}

export default OrganizationsAccess;