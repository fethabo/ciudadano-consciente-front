import { Button, Typography, Stack, CardContent, Card, Box, Fade, Zoom } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

/**
 * 
 * @param {*} content: {
  "statement": "El Sol es una estrella.",
  "correct_answer": true }
  @param onResponse: function setea estado true/false  
 * @returns 
 */
export default function TrueOrFalse({ content, onResponse }) {
  const [response, setResponse] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [processingResponse, setProcessingResponse] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Animación secuencial
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    
    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 800);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  useEffect(() => {
    if (response !== null && !processingResponse) {
      setProcessingResponse(true);
      const responseIsCorrect = response === content.correct_answer;
      setIsCorrect(responseIsCorrect);
      
      // Retraso para mostrar el feedback visual antes de llamar a onResponse
      setTimeout(() => {
        onResponse(responseIsCorrect);
      }, 1000); // Retraso de 1 segundo para mostrar el feedback
    }
  }, [response, content, onResponse, processingResponse]);

  const handleResponse = (value) => {
    if (processingResponse) return; // Evita múltiples selecciones durante el procesamiento
    setResponse(value);
  };

  const getFeedbackIcon = (isTrue) => {
    if (response === null) {
      return isTrue ? <ThumbUpAltIcon /> : <ThumbDownAltIcon />;
    }

    if (response === isTrue) {
      return isCorrect === null 
        ? (isTrue ? <ThumbUpAltIcon /> : <ThumbDownAltIcon />)
        : isCorrect 
          ? <CheckCircleOutlineIcon /> 
          : <CancelOutlinedIcon />;
    }

    return isTrue ? <ThumbUpAltIcon /> : <ThumbDownAltIcon />;
  };

  // Variantes para animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <Fade in={fadeIn} timeout={800}>
      <Stack
        direction="column"
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <Card
            elevation={4}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: 8
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center",
                backgroundColor: "primary.light", 
                p: 2.5, 
                borderRadius: 2,
                mb: 4,
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)"
              }}>
                <QuizIcon sx={{ fontSize: 36, mr: 2, color: "primary.contrastText" }} />
                <Typography 
                  variant="h4" 
                  align="center"
                  color="primary.contrastText"
                  fontWeight="medium"
                >
                  {content?.statement}
                </Typography>
              </Box>

              {showButtons && (
                <Zoom in={showButtons} timeout={500}>
                  <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    spacing={3} 
                    justifyContent="center"
                    sx={{ mt: 2 }}
                  >
                    <motion.div
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        onClick={() => handleResponse(true)} 
                        variant="contained" 
                        color={
                          response === true 
                            ? isCorrect === null 
                              ? "success" 
                              : isCorrect 
                                ? "success" 
                                : "error"
                            : "success"
                        }
                        startIcon={getFeedbackIcon(true)}
                        disabled={processingResponse && response !== true}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 4,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          minWidth: "160px",
                          boxShadow: 3,
                          transition: "all 0.3s ease",
                          ...(response === true && isCorrect === false && {
                            backgroundColor: "error.main",
                            borderColor: "error.dark",
                            "&:hover": {
                              backgroundColor: "error.dark",
                            }
                          })
                        }}
                      >
                        Verdadero
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 }}
                    >
                      <Button 
                        onClick={() => handleResponse(false)} 
                        variant="contained" 
                        color={
                          response === false 
                            ? isCorrect === null 
                              ? "error" 
                              : isCorrect 
                                ? "success" 
                                : "error"
                            : "error"
                        }
                        startIcon={getFeedbackIcon(false)}
                        disabled={processingResponse && response !== false}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 4,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          minWidth: "160px",
                          boxShadow: 3,
                          transition: "all 0.3s ease",
                          ...(response === false && isCorrect === false && {
                            backgroundColor: "error.dark",
                            "&:hover": {
                              backgroundColor: "error.dark",
                            }
                          })
                        }}
                      >
                        Falso
                      </Button>
                    </motion.div>
                  </Stack>
                </Zoom>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
    </Fade>
  );
}

TrueOrFalse.propTypes = {
  content: PropTypes.shape({
    statement: PropTypes.string,
    correct_answer: PropTypes.bool
  }),
  onResponse: PropTypes.func
};