import PropTypes from "prop-types"
import { Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

/**
 * Enhanced Slide component for embla-carousel
 * - Features animated particles in the background on hover
 * - Consistent height cards
 * - Contained animations that work with overflow:hidden
 */
function SlidePath({ path, height = 320 }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();  // te da acceso a darkTheme

    const gradient = `linear-gradient(
        45deg,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.light} 60%,
        ${theme.palette.primary.dark} 100%
    )`;
    // Generate particles with random positions and properties
    const particles = useMemo(() => {
        const items = [];
        // Generate 20-30 particles
        const count = Math.floor(Math.random() * 11) + 20;
        
        for (let i = 0; i < count; i++) {
            items.push({
                id: i,
                x: Math.random() * 100, // position %
                y: Math.random() * 100, // position %
                size: Math.random() * 4 + 2, // 2-6px
                opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
                duration: Math.random() * 2 + 2, // 2-4s
                delay: Math.random() * 0.5
            });
        }
        
        return items;
    }, [path?.levelId]); // Stable per slide
    
    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ 
                scale: 1.02,
                transition: { 
                    type: "spring", 
                    stiffness: 400,
                    damping: 15
                }
            }}
            onClick={() => navigate(`./map/${path.levelId}`, { relative: 'path' })}
            style={{ 
                cursor: 'pointer',
                height: height,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px'
            }}
        >
            <Card sx={{ 
                position: 'relative', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isHovered 
                    ? '0px 0px 16px rgba(255, 154, 158, 0.7)' 
                    : '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                {/* Base gradient background */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: gradient,
                        //background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
                        backgroundSize: '200% 200%',
                        opacity: isHovered ? 0.7 : 0.3,
                        transition: 'opacity 0.3s ease'
                    }}
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                />
                
                {/* Particles container */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: 'hidden',
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    {/* Particles */}
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            style={{
                                position: 'absolute',
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                opacity: particle.opacity,
                                pointerEvents: 'none'
                            }}
                            animate={isHovered ? {
                                x: [0, (Math.random() * 60 - 30)],
                                y: [0, (Math.random() * -60 - 20)],
                                opacity: [particle.opacity, 0]
                            } : {
                                opacity: 0
                            }}
                            transition={{
                                duration: particle.duration,
                                ease: "easeOut",
                                delay: particle.delay,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 0.5
                            }}
                        />
                    ))}
                </motion.div>
                
                {/* Card Media */}
                {path?.imageUrl && (
                    <CardMedia
                        component="img"
                        image={path.imageUrl}
                        alt={path.name}
                        sx={{
                            height: '140px',
                            objectFit: 'cover',
                            position: 'relative',
                            zIndex: 1,
                            opacity: 0.9
                        }}
                    />
                )}
                
                {/* Card Content */}
                <CardContent sx={{ 
                    position: 'relative', 
                    zIndex: 1,
                    flexGrow: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <div>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 1,
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            {path?.name}
                        </Typography>
                        <Typography 
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxHeight: '80px',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                textShadow: '0px 1px 1px rgba(0,0,0,0.2)'
                            }}
                        >
                            {path?.description}
                        </Typography>
                    </div>
                    
                    <motion.div
                        style={{ 
                            marginTop: '16px',
                            textAlign: 'right',
                        }}
                    >
                        <motion.div
                            style={{
                                display: 'inline-block',
                                position: 'relative'
                            }}
                            whileHover={{
                                x: 5,
                                transition: { type: 'spring', stiffness: 500 }
                            }}
                        >
                            <Typography 
                                variant="button"
                                sx={{ 
                                    color: '#fff', 
                                    fontWeight: 'bold',
                                    textShadow: '0px 1px 2px rgba(0,0,0,0.3)'
                                }}
                            >
                                Ver más →
                            </Typography>
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: -2,
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    background: 'currentColor',
                                    transformOrigin: 'left',
                                    scaleX: 0
                                }}
                                animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

SlidePath.propTypes = {
    path: PropTypes.shape({
        levelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        imageUrl: PropTypes.string
    }).isRequired,
    height: PropTypes.number
};

export default SlidePath;