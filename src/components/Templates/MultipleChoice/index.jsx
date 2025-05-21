import { Button, Typography, Stack, Paper, Box, Zoom, Fade, Card, CardMedia, CardContent, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuizIcon from "@mui/icons-material/Quiz";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

function shuffle(array) {
  //Algoritmo de Fisher-Yates
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/* 
* EL Content lo define el programador (modelo) para cumplir las necesidades de este componente. 
* El onResponse es una funcion siempre igual que setea un estado true o false 
*/
export default function MultipleChoice({ content, onResponse, images }) {
  const [response, setResponse] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [processingResponse, setProcessingResponse] = useState(false);
  
const [optionsKeys, setOptionsKeys] = useState([]);

useEffect(() => {
    if (content?.options) {
        setOptionsKeys(shuffle(Object.keys(content.options)));
    }
    // eslint-disable-next-line
}, []);

  useEffect(() => {
    // Animación secuencial
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    
    const optionsTimer = setTimeout(() => {
      setShowOptions(true);
    }, 800);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(optionsTimer);
    };
  }, []);

  useEffect(() => {
    // Evaluo si la respuesta es correcta
    const correctAnswer = content?.correct_answer;
    if (!!response && !processingResponse) {
      //eslint-disable-line
      setProcessingResponse(true);
      const responseIsCorrect = response === correctAnswer;
      setIsCorrect(responseIsCorrect);
      
      // Retraso para mostrar el feedback visual antes de llamar a onResponse
      setTimeout(() => {
        onResponse(responseIsCorrect);
      }, 1000); // Retraso de 1 segundo para mostrar el feedback
    }
  }, [response, content, onResponse, processingResponse]);

  const handleSelectOption = (option, index) => {
    if (processingResponse) return; // Evita múltiples selecciones durante el procesamiento
    setSelectedIndex(index);
    setResponse(content?.options[option]);
  };

  // Variantes para animaciones con framer-motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Fade in={fadeIn} timeout={800}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 3,
        //  background: "linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)",
          overflow: "hidden",
          maxWidth: "100%"
        }}
      >
        <Stack direction="column" spacing={3}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              backgroundColor: "primary.light", 
              p: 2.5, 
              borderRadius: 2,
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
              mb: 2
            }}>
              <QuizIcon sx={{ fontSize: 32, mr: 2, color: "primary.contrastText" }} />
              <Typography variant="h4" color="primary.contrastText" fontWeight="500">
                {content?.question}
              </Typography>
            </Box>
          </motion.div>

          {images && images.length > 0 && (
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="show"
            >
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center", 
                flexDirection: "column",
                alignItems: "center",
                gap: 2 
              }}>
                {images?.map((image, index) => (
                  <Card 
                    key={index}
                    elevation={4}
                    sx={{ 
                      width: "100%",
                      maxWidth: "500px",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 8
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={image.data}
                      alt={image?.image?.imageName || "Imagen de pregunta"}
                      loading="lazy"
                      sx={{ 
                        maxHeight: "350px",
                        objectFit: "contain",
                        backgroundColor: "#f1f1f1"
                      }}
                    />
                    {image?.image?.imageName && (
                      <CardContent sx={{ py: 1, display: "flex", alignItems: "center" }}>
                        <ImageIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }}/>
                        <Typography variant="caption" color="text.secondary">
                          {image.image.imageName}
                        </Typography>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </Box>
            </motion.div>
          )}

          <Divider sx={{ my: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
              Selecciona una opción
            </Typography>
          </Divider>

          {showOptions && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <Box
              display={"flex"} 
                direction="row" 
                spacing={2} 
                gap={2}
                alignItems="center"
                justifyContent="center" 
                flexWrap="wrap"
                sx={{ mt: 2 }}
                
              >
                {optionsKeys.map((option, index) => (
                  <Zoom
                    in={showOptions}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    key={index}
                  >
                    <Box sx={{ width: {xs:'100%',md: "45%"}, marginLeft: "0" }}>
                      <motion.div
                        variants={item}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          onClick={() => handleSelectOption(option, index)}
                          variant={selectedIndex === index ? "contained" : "outlined"}
                          color={
                            selectedIndex === index 
                              ? isCorrect === null 
                                ? "secondary" 
                                : isCorrect 
                                  ? "success" 
                                  : "error"
                              : "primary"
                          }
                          fullWidth
                          size="large"
                          startIcon={
                            selectedIndex === index 
                              ? isCorrect === null 
                                ? <CheckIcon /> 
                                : isCorrect 
                                  ? <CheckIcon /> 
                                  : <CloseIcon />
                              : <HelpOutlineIcon />
                          }
                          sx={{
                            textTransform: "none",
                            height: "100%",
                            p: 1.5,
                            borderRadius: 2,
                            fontWeight: selectedIndex === index ? "bold" : "normal",
                            borderWidth: 2,
                            fontSize: "1rem",
                            boxShadow: selectedIndex === index ? 3 : 0,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: 2
                            },
                            ...(selectedIndex === index && isCorrect === false && {
                              backgroundColor: "error.main",
                              borderColor: "error.dark",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "error.dark",
                              }
                            })
                          }}
                          disabled={processingResponse && selectedIndex !== index}
                        >
                          {content?.options[option]}
                        </Button>
                      </motion.div>
                    </Box>
                  </Zoom>
                ))}
              </Box>
            </motion.div>
          )}
        </Stack>
      </Paper>
    </Fade>
  );
}

MultipleChoice.propTypes = {
  content: PropTypes.object, //DEPENDE DEL MODELO DEFINIDO DEL ACTIVITYTYPE
  onResponse: PropTypes.func, // FUNCION QUE SETEA ESTADO TRUE O FALSE
  images: PropTypes.array
};