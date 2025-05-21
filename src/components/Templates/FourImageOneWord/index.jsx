import { useState, useEffect } from 'react';
import { 
  TextField, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Container,
  Grid,
  IconButton,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ImageIcon from '@mui/icons-material/Image';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

/**
 * @todo: identificar cantidad de palabras (o se las pasamos en el model?)
 * @param {*} content {"imagesQuantity": "number", "hints": "boolean", "correct_answer": "string"}
 * @returns 
 */
export default function FourImageOneWord({ content, onResponse, images }) {
  const [answer, setAnswer] = useState([]);
  const [hints, setHints] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHintTooltip, setShowHintTooltip] = useState(false);
  
  useEffect(() => {
    if (content.hints && content.correct_answer?.length > 2) {
      const correctAnswer = content.correct_answer.trim();
      const hintIndices = [];
      while (hintIndices.length < 2) {
        const index = Math.floor(Math.random() * correctAnswer.length);
        if (!hintIndices.includes(index)) {
          hintIndices.push(index);
        }
      }
      setHints(hintIndices);
    }
  }, [content.hints, content.correct_answer]);

  const renderHint = (index) => {
    if (hints.includes(index)) {
      return content.correct_answer.trim()[index];
    }
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filledAnswer = answer.map((char, index) => 
      (char === '' && hints.includes(index) ? content.correct_answer[index] : char)
    );
    const joinedAnswer = filledAnswer.join('');
    const result = joinedAnswer.toLowerCase() === content.correct_answer.toLowerCase();
    setIsCorrect(result);
    onResponse(result);
  };

  useEffect(() => {
    setAnswer(new Array(content.correct_answer.length).fill(''));
  }, [content.correct_answer]);

  const handleChange = (event, index) => {
    const newAnswer = [...answer];
    newAnswer[index] = event.target.value;
    setAnswer(newAnswer);

    if (event.target.value === '') {
      let prevIndex = index - 1;
      while (prevIndex >= 0 && document.querySelector(`input[name=char-${prevIndex}]`).disabled) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        document.querySelector(`input[name=char-${prevIndex}]`).focus();
      }
    } else {
      let nextIndex = index + 1;
      while (nextIndex < content.correct_answer.length && document.querySelector(`input[name=char-${nextIndex}]`).disabled) {
        nextIndex++;
      }
      if (nextIndex < content.correct_answer.length) {
        document.querySelector(`input[name=char-${nextIndex}]`).focus();
      }
    }
  };

  return (
    <Container maxWidth="md">
      <MotionPaper 
        elevation={3} 
        sx={{ p: 3, borderRadius: 2, overflow: 'hidden' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}
        >
          4 Imágenes 1 Palabra
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {images && images.map((image, index) => (
              <Grid item xs={6} key={index}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 1, 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      height: 200,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {image?.data ? (
                      <motion.img
                        src={image.data}
                        alt={image?.image?.imageName || `Image ${index + 1}`}
                        loading="lazy"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
                        <Typography variant="caption">Imagen no disponible</Typography>
                      </Box>
                    )}
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>

          <Box 
            sx={{ 
              mb: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ mr: 1 }}>
                Ingrese la palabra:
              </Typography>
              <Tooltip 
                title="Adivina la palabra representada en las 4 imágenes" 
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <IconButton color="primary" size="small">
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <MotionBox 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: 1
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {content.correct_answer.trim().split('').map((char, index) => {
                const isHint = renderHint(index) !== '';
                return (
                  <TextField
                    key={index}
                    name={`char-${index}`}
                    value={answer[index] || renderHint(index)}
                    onChange={(event) => handleChange(event, index)}
                    inputProps={{ 
                      maxLength: 1, 
                      style: { 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        textTransform: 'uppercase'
                      } 
                    }}
                    sx={{ 
                      width: 50,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: isHint ? 'secondary.dark' : 'background.paper',
                        '&:hover': {
                          bgcolor: isHint ? 'secondary.light' : 'background.paper',
                        },
                      }
                    }}
                    disabled={isHint}
                    variant="outlined"
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                );
              })}
            </MotionBox>
            
            {isCorrect !== null && (
              <Zoom in={isCorrect !== null}>
                <Typography 
                  variant="body1" 
                  color={isCorrect ? "success.main" : "error.main"}
                  sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircleOutlineIcon /> 
                      ¡Correcto! La palabra era &quot;{content.correct_answer}&quot;.
                    </>
                  ) : (
                    <>
                      <LightbulbIcon /> 
                      Inténtalo de nuevo.
                    </>
                  )}
                </Typography>
              </Zoom>
            )}
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2 
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              component={motion.button}
              whileHover={{ scale: 1.05, boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              sx={{ px: 4, py: 1 }}
            >
              Verificar
            </Button>
            
            {content.hints && (
              <Tooltip 
                title={showHintTooltip ? "Pistas ya mostradas" : "Mostrar pistas"} 
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
              >
                <span>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<LightbulbIcon />}
                    onClick={() => setShowHintTooltip(true)}
                    disabled={hints.length > 0 || showHintTooltip}
                    component={motion.button}
                    whileHover={!showHintTooltip && { scale: 1.05 }}
                    whileTap={!showHintTooltip && { scale: 0.95 }}
                  >
                    Pista
                  </Button>
                </span>
              </Tooltip>
            )}
          </Box>
        </Box>
      </MotionPaper>
    </Container>
  );
}

FourImageOneWord.propTypes = {
  content: PropTypes.object, //DEPENDE DEL MODELO DEFINIDO DEL ACTIVITYTYPE
  onResponse: PropTypes.func, // FUNCION QUE SETEA ESTADO TRUE O FALSE 
  images: PropTypes.array
};