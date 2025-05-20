import { Button, Typography, Stack, Paper, Box, Zoom, Fade } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

/**
 * 
 * @param {*} content: {
  "question": "¿Cuáles de los siguientes animales son mamíferos?",
  "options": ["Tiburón", "Delfín", "Gato", "Águila"],
  "correct_answers": ["Delfín", "Gato"]
} 
 * @returns 
 */
export default function MultipleSelection({ content, onResponse }) {
  const [selected, setSelected] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    // Animación escalonada: primero muestra la pregunta, luego las opciones
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 500);
    
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const toggleSelection = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    const corrects = content.correct_answers;
    const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(corrects.sort());
    onResponse(isCorrect);
  };

  // Variantes para animaciones con framer-motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Fade in={fadeIn} timeout={800}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 3, 
          borderRadius: 2,
        //  background: "linear-gradient(145deg,  0%, #f5f7fa 100%)",
          overflow: "hidden"
        }}
      >
        <Stack direction="column" spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography 
                variant="h4" 
                fontWeight="bold"
                color="primary"
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: 1 
                }}
              >
                <EmojiObjectsIcon fontSize="large" />
                Selecciona las respuestas correctas
              </Typography>
            </motion.div>
          </Box>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              backgroundColor: "primary.light", 
              p: 2, 
              borderRadius: 2,
              boxShadow: "0px 3px 6px rgba(0,0,0,0.1)"
            }}>
              <HelpOutlineIcon sx={{ fontSize: 28, mr: 2, color: "primary.contrastText" }} />
              <Typography variant="h5" color="primary.contrastText" fontWeight="medium">
                {content?.question}
              </Typography>
            </Box>
          </motion.div>

          {showOptions && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <Stack direction="column" spacing={1.5}>
                {content?.options?.map((option, index) => (
                  <Zoom 
                    in={showOptions} 
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={index}
                  >
                    <div>
                      <motion.div
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => toggleSelection(option)}
                          variant={selected.includes(option) ? "contained" : "outlined"}
                          fullWidth
                          size="large"
                          startIcon={selected.includes(option) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                          sx={{
                            justifyContent: "flex-start",
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: selected.includes(option) ? "secondary.main" : "transparent",
                            "&:hover": {
                              backgroundColor: selected.includes(option) ? "secondary.dark" : "action.hover",
                            },
                            transition: "all 0.3s ease",
                            borderWidth: 2,
                            textTransform: "none",
                            fontSize: "1.1rem"
                          }}
                        >
                          {option}
                        </Button>
                      </motion.div>
                    </div>
                  </Zoom>
                ))}
              </Stack>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Stack direction="row" justifyContent="center" marginTop={1}>
              <Button 
                onClick={handleSubmit} 
                variant="contained" 
                color="secondary"
                size="large"
                endIcon={<SendIcon />}
                disabled={selected.length === 0}
                sx={{
                  borderRadius: 4,
                  px: 4,
                  py: 1.2,
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                ¡RESPONDER!
              </Button>
            </Stack>
          </motion.div>
        </Stack>
      </Paper>
    </Fade>
  );
}
MultipleSelection.propTypes = {
  content: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answers: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onResponse: PropTypes.func.isRequired
};