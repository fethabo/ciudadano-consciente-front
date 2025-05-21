import { Typography, Stack, Button, Paper, Box, Fade, Zoom, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

export default function ColorChooser({ content, onResponse }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [processingResponse, setProcessingResponse] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showColors, setShowColors] = useState(false);
  
  // Generar los colores aleatorios al cargar el componente
  const shuffledColors = [...(content?.colors || [])].sort(() => Math.random() - 0.5);

  useEffect(() => {
    // Animación secuencial
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    
    const colorsTimer = setTimeout(() => {
      setShowColors(true);
    }, 800);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(colorsTimer);
    };
  }, []);

  useEffect(() => {
    if (selectedColor !== null && !processingResponse) {
      setProcessingResponse(true);
      const responseIsCorrect = selectedColor === content.correct_color;
      setIsCorrect(responseIsCorrect);
      
      // Retraso para mostrar el feedback visual antes de llamar a onResponse
      setTimeout(() => {
        onResponse(responseIsCorrect); // Evaluate if the selected color is correct
      }, 1000); // Retraso de 1 segundo para mostrar el feedback
    }
  }, [selectedColor, content, onResponse, processingResponse]);

  const handleColorSelect = (color, index) => {
    if (processingResponse) return; // Evita múltiples selecciones durante el procesamiento
    setSelectedColor(color);
    setSelectedIndex(index);
  };

  // Determinar si un color es claro u oscuro para ajustar el color del texto
  const isColorLight = (hexColor) => {
    // Convertir hex a RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calcular luminancia (percepción humana del brillo)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    return luminance > 0.5;
  };

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const colorButtonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    }),
    hover: { 
      scale: 1.1,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <Fade in={fadeIn} timeout={800}>
      <Card
        elevation={4}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
       //   background: "linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)",
          transition: "all 0.3s ease",
          maxWidth: "600px",
          mx: "auto"
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack direction="column" spacing={4} alignItems="center">
              <motion.div variants={titleVariants}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "primary.light", 
                  p: 2.5, 
                  borderRadius: 2,
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                  mb: 1
                }}>
                  <PaletteIcon sx={{ fontSize: 32, mr: 2, color: "primary.contrastText" }} />
                  <Typography 
                    variant="h4" 
                    color="primary.contrastText"
                    fontWeight="medium"
                    textAlign="center"
                  >
                    {content?.prompt}
                  </Typography>
                </Box>
              </motion.div>

              {showColors && (
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 3,
                    p: 2
                  }}
                >
                  {shuffledColors.map((color, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={colorButtonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        onClick={() => handleColorSelect(color, index)}
                        variant="contained"
                        disabled={processingResponse && selectedIndex !== index}
                        sx={{
                          backgroundColor: color,
                          color: isColorLight(color) ? "#000" : "#fff",
                          minWidth: "80px",
                          minHeight: "80px",
                          borderRadius: "50%",
                          border: selectedIndex === index ? "4px solid #fff" : "none",
                          boxShadow: selectedIndex === index ? "0 0 0 2px #000, 0 0 10px rgba(0,0,0,0.5)" : 4,
                          position: "relative",
                          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          "&:hover": {
                            backgroundColor: color,
                            opacity: 0.9
                          }
                        }}
                      >
                        {selectedIndex === index && (
                          <Box sx={{ 
                            position: "absolute", 
                            top: "50%", 
                            left: "50%", 
                            transform: "translate(-50%, -50%)", 
                            backgroundColor: "rgba(255,255,255,0.3)",
                            borderRadius: "50%",
                            p: 0.5
                          }}>
                            {isCorrect === null ? (
                              <FormatColorFillIcon sx={{ fontSize: 24 }} />
                            ) : isCorrect ? (
                              <CheckCircleIcon sx={{ fontSize: 32, color: "#fff" }} />
                            ) : (
                              <CancelIcon sx={{ fontSize: 32, color: "#fff" }} />
                            )}
                          </Box>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              )}

              {/* Instrucción visual */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    opacity: 0.7, 
                    fontStyle: "italic",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1
                  }}
                >
                  <ColorLensIcon fontSize="small" />
                  Selecciona el color correcto
                </Typography>
              </motion.div>
            </Stack>
          </motion.div>
        </CardContent>
      </Card>
    </Fade>
  );
}

ColorChooser.propTypes = {
  content: PropTypes.shape({
    prompt: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    correct_color: PropTypes.string
  }),
  onResponse: PropTypes.func
};