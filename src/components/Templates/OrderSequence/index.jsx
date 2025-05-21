import { useState, useEffect } from "react";
import { 
  Button, 
  Typography, 
  Stack, 
  Badge, 
  Container, 
  Paper, 
  Box, 
  Tooltip, 
  Divider, 
  Zoom, 
  Fade,
  Chip,
  IconButton,
  Alert,
  useTheme
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

/**
 * 
 * @param {*} content: {
  "instruction": "Ordena los planetas desde el más cercano al Sol hasta el más lejano.",
  "options": ["Venus", "Marte", "Tierra", "Mercurio"],
  "correct_sequence": ["Mercurio", "Venus", "Tierra", "Marte"]
} 
 * @returns 
 */
export default function OrderSequence({ content, onResponse }) {
  const [userSequence, setUserSequence] = useState([]);
  const [result, setResult] = useState(null);
  const [showSequence, setShowSequence] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Reset result when user changes selection
    if (result !== null) {
      setResult(null);
    }
  }, [userSequence]);

  const handleSubmit = () => {
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(content?.correct_sequence);
    setResult(isCorrect);
    onResponse(isCorrect);
  };

  const resetSequence = () => {
    setUserSequence([]);
    setResult(null);
  };

  const getItemContainerStyles = (index) => {
    if (result === null) return {};
    
    const correctItemAtThisIndex = content?.correct_sequence[index];
    const userItemAtThisIndex = userSequence[index];
    
    if (correctItemAtThisIndex === userItemAtThisIndex) {
      return { backgroundColor: theme.palette.success.light, borderRadius: 1 };
    } else {
      return { backgroundColor: theme.palette.error.light, borderRadius: 1 };
    }
  };

  const [shuffledOptions, setShuffledOptions] = useState(content?.options || []);
  useEffect(() => {
    if (Array.isArray(content?.options)) {
      const shuffled = [...content.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  // Reset shuffle when content or result changes (resetSequence)
  }, [content, result]);

  return (
    <MotionContainer 
      maxWidth="md" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MotionPaper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          overflow: "hidden",
     //     background: "linear-gradient(to right bottom, #ffffff, #f9f9ff)"
        }}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Stack spacing={4}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography 
              variant="h4" 
              component={motion.div}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              sx={{ 
                fontWeight: 600, 
                color: "primary.dark",
                display: "flex", 
                alignItems: "center", 
                gap: 1.5 
              }}
            >
              <FormatListNumberedIcon fontSize="large" />
              Secuencia Ordenada
            </Typography>
            
            <Tooltip title="Ayuda" arrow>
              <IconButton 
                color="primary"
                component={motion.button}
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Instruction */}
          <MotionBox
            sx={{ 
              bgcolor: "primary.light", 
              p: 2, 
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Typography 
              variant="h6" 
              color="primary.contrastText"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                fontWeight: 500,
                lineHeight: 1.4 
              }}
            >
              {content?.instruction}
            </Typography>
          </MotionBox>
          
          <Divider>
            <Chip 
              label="Selecciona en orden" 
              color="primary" 
              variant="outlined" 
              size="small"
              icon={<ShuffleIcon />}
            />
          </Divider>
          
          {/* Options */}
          <MotionBox
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Opciones disponibles:
            </Typography>
            <Stack 
              direction={{ xs: "column", sm: "row" }}
              justifyContent="center"
              alignItems="center" 
              spacing={2} 
              flexWrap="wrap"
              useFlexGap
              sx={{ mb: 3 }}
            >
              {shuffledOptions?.map((option, index) => {
                const selectedIndex = userSequence.indexOf(option);
                const isSelected = selectedIndex !== -1;
                return (
                  <MotionButton
                    key={index}
                    onClick={() => {
                      if (isSelected) {
                        setUserSequence(userSequence.filter((item) => item !== option));
                      } else {
                        setUserSequence([...userSequence, option]);
                      }
                    }}
                    variant={isSelected ? "contained" : "outlined"}
                    color={isSelected ? "primary" : "info"}
                    size="large"
                    disabled={result !== null}
                    sx={{ 
                      textTransform: "none", 
                      position: "relative",
                      minWidth: "120px",
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 500,
                      fontSize: "1rem",
                      boxShadow: isSelected ? 4 : 0
                    }}
                    whileHover={{ scale: isSelected ? 1 : 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isSelected ? (
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <span>{option}</span>
                        <Badge
                          badgeContent={selectedIndex + 1}
                          color="secondary"
                          sx={{
                            "& .MuiBadge-badge": {
                              right: -3,
                              top: 8,
                              minWidth: 24,
                              height: 24,
                              borderRadius: "50%",
                              fontSize: 14,
                              fontWeight: "bold"
                            },
                          }}
                        />
                      </Stack>
                    ) : (
                      option
                    )}
                  </MotionButton>
                );
              })}
            </Stack>
          </MotionBox>
          
          {/* User Sequence Preview */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
              Tu secuencia seleccionada:
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                minHeight: "80px", 
                display: "flex", 
                alignItems: "center", 
                bgcolor: "background.default" 
              }}
            >
              {userSequence.length > 0 ? (
                <Stack 
                  direction="row" 
                  spacing={1} 
                  alignItems="center" 
                  flexWrap="wrap"
                  useFlexGap
                >
                  {userSequence.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Chip
                          label={item}
                          color="primary"
                          variant={result === null ? "default" : "outlined"}
                          onDelete={() => {
                            if (result === null) {
                              setUserSequence(userSequence.filter((_, i) => i !== index));
                            }
                          }}
                          sx={{ 
                            fontWeight: 500, 
                            px: 1,
                            ...getItemContainerStyles(index)
                          }}
                        />
                      </Zoom>
                      {index < userSequence.length - 1 && (
                        <ArrowForwardIcon sx={{ mx: 0.5, color: "text.secondary" }} />
                      )}
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                  Selecciona las opciones en el orden correcto...
                </Typography>
              )}
            </Paper>
          </MotionBox>
          
          {/* Result */}
          <AnimatePresence>
            {result !== null && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <Alert 
                  severity={result ? "success" : "error"}
                  icon={result ? <CheckCircleIcon fontSize="inherit" /> : <ErrorOutlineIcon fontSize="inherit" />}
                  variant="filled"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="body1" fontWeight={500}>
                    {result ? "¡Correcto! Has ordenado la secuencia perfectamente." : "La secuencia no es correcta. Inténtalo de nuevo."}
                  </Typography>
                </Alert>
                
                {!result && (
                  <Button 
                    variant="text" 
                    color="primary"
                    onClick={() => setShowSequence(!showSequence)}
                    sx={{ mb: 2 }}
                  >
                    {showSequence ? "Ocultar respuesta correcta" : "Mostrar respuesta correcta"}
                  </Button>
                )}
                
                <AnimatePresence>
                  {showSequence && (
                    <MotionBox
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{ overflow: "hidden" }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Secuencia correcta:
                      </Typography>
                      <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                          {content?.correct_sequence.map((item, index) => (
                            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                              <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                <Chip
                                  label={item}
                                  color="success"
                                  variant="outlined"
                                  sx={{ fontWeight: 500 }}
                                />
                              </Fade>
                              {index < content.correct_sequence.length - 1 && (
                                <ArrowForwardIcon sx={{ mx: 0.5, color: "text.secondary" }} />
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </Paper>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </MotionBox>
            )}
          </AnimatePresence>
          
          {/* Actions */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <MotionButton
              onClick={handleSubmit}
              variant="contained"
              size="large"
              disabled={userSequence?.length !== content?.options?.length || result !== null}
              startIcon={<SendIcon />}
              sx={{ 
                minWidth: 150, 
                py: 1.2,
                boxShadow: 5,
                borderRadius: 2
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              Verificar
            </MotionButton>
            
            <MotionButton
              onClick={resetSequence}
              variant="outlined"
              size="large"
              startIcon={<RestartAltIcon />}
              sx={{ 
                minWidth: 150, 
                py: 1.2,
                borderRadius: 2
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Reiniciar
            </MotionButton>
          </Stack>
        </Stack>
      </MotionPaper>
    </MotionContainer>
  );
}

OrderSequence.propTypes = {
  content: PropTypes.shape({
    instruction: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    correct_sequence: PropTypes.arrayOf(PropTypes.string)
  }),
  onResponse: PropTypes.func
};