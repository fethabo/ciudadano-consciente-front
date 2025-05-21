import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Card, 
  IconButton, 
  LinearProgress, 
  Chip, 
  Stack,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Zoom,
} from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ExtensionIcon from "@mui/icons-material/Extension";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckIcon from "@mui/icons-material/Check";

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);
const MotionBox = motion(Box);

/**
 * Memotest Component
 * A memory card game where players need to find matching pairs of cards
 * 
 * @param {Object} content - Configuration for the game
 * @param {number} content.timeLimit - Time limit in seconds (0 means no limit)
 * @param {string} content.title - Optional game title
 * @param {string} content.instruction - Optional game instructions
 * @param {Array} images - Array of image objects to be used in the game
 * @param {Function} onResponse - Callback function (true for success, false for failure)
 */
export default function Memotest({ content, images = [], onResponse }) {
  const theme = useTheme();
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(content?.timeLimit || 0);
  const [moves, setMoves] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  
  const hasTimeLimit = content?.timeLimit > 0;
  
  // Prepare cards by duplicating and shuffling images
  const prepareCards = useCallback(() => {
    if (!images || images.length === 0) return [];
    
    // Create pairs from images
    let cardPairs = [];
    images.forEach((image, index) => {
      // Create two cards with the same image but different IDs
      const card1 = {
        id: `card-${index}-a`,
        imageId: index,
        imageUrl: image.data,
        imageName: image?.image?.imageName || `Image ${index}`
      };
      
      const card2 = {
        id: `card-${index}-b`,
        imageId: index,
        imageUrl: image.data,
        imageName: image?.image?.imageName || `Image ${index}`
      };
      
      cardPairs.push(card1, card2);
    });
    
    // Shuffle the cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    return cardPairs;
  }, [images]);
  
  // Initialize the game
  const initializeGame = useCallback(() => {
    setCards(prepareCards());
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setIsChecking(false);
    setGameStarted(false);
    setGameOver(false);
    setTimeRemaining(content?.timeLimit || 0);
    setMoves(0);
    setShowSuccessDialog(false);
    setShowFailureDialog(false);
  }, [prepareCards, content?.timeLimit]);
  
  // Initialize on component mount
  useEffect(() => {
    initializeGame();
  }, []);
  
  // Timer effect
  useEffect(() => {
    let timer;
    
    if (gameStarted && hasTimeLimit && timeRemaining > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            setShowFailureDialog(true);
            onResponse(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, hasTimeLimit, timeRemaining, gameOver]);
  
  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length === cards.length / 2) {
      setGameOver(true);
      setShowSuccessDialog(true);
      onResponse(true);
    }
  }, [matchedPairs, cards.length]);
  
  // Handle card flip
  const handleCardClick = (index) => {
    if (
      isChecking || 
      gameOver || 
      flippedIndexes.includes(index) || 
      matchedPairs.some(pair => pair.includes(index))
    ) {
      return;
    }
    
    // Start the game on first card flip
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    // Flip the card
    if (flippedIndexes.length < 2) {
      setFlippedIndexes(prev => [...prev, index]);
      
      // If this is the second card, check for a match
      if (flippedIndexes.length === 1) {
        setIsChecking(true);
        setMoves(prev => prev + 1);
        
        // Get the card IDs
        const firstCardIndex = flippedIndexes[0];
        const secondCardIndex = index;
        
        // Check if they match (same imageId)
        if (cards[firstCardIndex].imageId === cards[secondCardIndex].imageId) {
          // It's a match!
          setMatchedPairs(prev => [...prev, [firstCardIndex, secondCardIndex]]);
          setFlippedIndexes([]);
          setIsChecking(false);
        } else {
          // Not a match, flip them back after a delay
          setTimeout(() => {
            setFlippedIndexes([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    }
  };
  
  // Calculate progress percentage for matched pairs
  const progressPercentage = useMemo(() => {
    if (cards.length === 0) return 0;
    return (matchedPairs.length / (cards.length / 2)) * 100;
  }, [matchedPairs.length, cards.length]);
  
  // Format time remaining as mm:ss
  const formattedTimeRemaining = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);
  
  return (
    <MotionContainer 
      maxWidth="lg" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <MotionPaper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2, 
          overflow: "hidden",
     //     background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%)"
        }}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
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
            <ExtensionIcon fontSize="large" />
            {content?.title || "Memotest"}
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Tooltip title="Reiniciar juego" arrow>
              <IconButton 
                color="primary"
                onClick={initializeGame}
                component={motion.button}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
            
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
          </Stack>
        </Box>
        
        {/* Instructions & Stats */}
        <MotionBox
          sx={{ 
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {/* Instructions */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              flex: 2,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              bgcolor: "background.paper"
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <QuizIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Instrucciones
              </Typography>
            </Stack>
            <Typography variant="body1">
              {content?.instruction || "Encuentra los pares de cartas coincidentes. Voltea dos cartas a la vez y recuerda su ubicación para hacer coincidir todas las parejas."}
            </Typography>
          </Paper>
          
          {/* Stats */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              bgcolor: "background.paper"
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
              <Chip 
                icon={<AccessTimeIcon />} 
                label={hasTimeLimit ? `Tiempo: ${formattedTimeRemaining}` : "Sin límite de tiempo"}
                color={hasTimeLimit && timeRemaining < 10 ? "error" : "primary"}
                variant="outlined"
              />
              
              <Chip 
                icon={<WallpaperIcon />} 
                label={`Movimientos: ${moves}`}
                color="secondary"
                variant="outlined"
              />
            </Stack>
            
            <Box sx={{ width: '100%', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Progreso: {Math.round(progressPercentage)}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: progressPercentage === 100 ? 'success.main' : 'primary.main',
                  }
                }}
              />
            </Box>
          </Paper>
        </MotionBox>
        
        {/* Game Board */}
        <Box 
          sx={{ 
            mb: 3,
            perspective: "1000px"
          }}
        >
          <Grid container spacing={2}>
            {cards.map((card, index) => {
              const isFlipped = flippedIndexes.includes(index);
              const isMatched = matchedPairs.some(pair => pair.includes(index));
              
              return (
                <Grid item xs={6} sm={4} md={3} lg={2} key={card.id}>
                  <MotionCard
                    sx={{
                      height: 140,
                      cursor: isMatched || isFlipped || isChecking || gameOver ? "default" : "pointer",
                      position: "relative",
                      transformStyle: "preserve-3d",
                      boxShadow: isMatched ? `0 0 5px 2px ${theme.palette.success.main}` : 3,
                    }}
                    onClick={() => handleCardClick(index)}
                    initial={{ rotateY: 0 }}
                    animate={{ 
                      rotateY: isFlipped || isMatched ? 180 : 0,
                      scale: isMatched ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    whileHover={!isFlipped && !isMatched && !isChecking && !gameOver ? { 
                      scale: 1.05,
                      boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                    } : {}}
                  >
                    {/* Card Back */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backfaceVisibility: "hidden",
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 1,
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)",
                        backgroundSize: "15px 15px",
                        transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        color="white" 
                        sx={{ 
                          fontWeight: "bold",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                        }}
                      >
                        ?
                      </Typography>
                    </Box>
                    
                    {/* Card Front (Image) */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backfaceVisibility: (isMatched || isFlipped) ? "visible": "hidden", // contrario a "hidden"
                        transform: "rotateY(180deg)",
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 1,
                        overflow: "hidden",
                        p: 1,
                      }}
                    >
                      {card.imageUrl ? (
                        <Box
                          component="img"
                          src={card.imageUrl}
                          alt={card.imageName}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Imagen no disponible
                        </Typography>
                      )}
                      
                      {isMatched && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "rgba(76, 175, 80, 0.3)",
                            zIndex: 1,
                          }}
                        >
                          <Zoom in={isMatched}>
                            <CheckIcon 
                              sx={{ 
                                color: "success.main", 
                                fontSize: 40,
                                filter: "drop-shadow(0 0 2px white)",
                              }} 
                            />
                          </Zoom>
                        </Box>
                      )}
                    </Box>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        
        {/* Success Dialog */}
        <Dialog 
          open={showSuccessDialog} 
          onClose={() => setShowSuccessDialog(false)}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.3 }
          }}
        >
          <DialogTitle sx={{ bgcolor: "success.light", color: "success.contrastText" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmojiEventsIcon />
              <Typography variant="h6">¡Felicidades!</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Has completado exitosamente el desafío Memotest.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Parejas encontradas:</Typography>
                <Typography variant="body2" fontWeight="bold">{matchedPairs.length} de {cards.length / 2}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Movimientos realizados:</Typography>
                <Typography variant="body2" fontWeight="bold">{moves}</Typography>
              </Box>
              {hasTimeLimit && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Tiempo restante:</Typography>
                  <Typography variant="body2" fontWeight="bold">{formattedTimeRemaining}</Typography>
                </Box>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button 
              startIcon={<RestartAltIcon />} 
              onClick={initializeGame}
              variant="contained"
              color="primary"
            >
              Jugar de nuevo
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Failure Dialog */}
        <Dialog 
          open={showFailureDialog} 
          onClose={() => setShowFailureDialog(false)}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { duration: 0.3 }
          }}
        >
          <DialogTitle sx={{ bgcolor: "error.light", color: "error.contrastText" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon />
              <Typography variant="h6">¡Se acabó el tiempo!</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Se ha agotado el tiempo para completar el Memotest.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Parejas encontradas:</Typography>
                <Typography variant="body2" fontWeight="bold">{matchedPairs.length} de {cards.length / 2}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Movimientos realizados:</Typography>
                <Typography variant="body2" fontWeight="bold">{moves}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">Progreso:</Typography>
                <Typography variant="body2" fontWeight="bold">{Math.round(progressPercentage)}%</Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button 
              startIcon={<RestartAltIcon />} 
              onClick={initializeGame}
              variant="contained"
              color="primary"
            >
              Intentar de nuevo
            </Button>
          </DialogActions>
        </Dialog>
      </MotionPaper>
    </MotionContainer>
  );
}

Memotest.propTypes = {
  content: PropTypes.shape({
    timeLimit: PropTypes.number,
    title: PropTypes.string,
    instruction: PropTypes.string
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.string,
      image: PropTypes.shape({
        imageName: PropTypes.string
      })
    })
  ),
  onResponse: PropTypes.func.isRequired
};