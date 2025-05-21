import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import useIsMobile from "@components/Hooks/useIsMobile";
import animatedFail from '@animations/Fail.lottie';
import animatedCheck from '@animations/Check.lottie';
import animateUpLevel from '@animations/LevelUpAnimation.lottie';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

function ActivityStreakDialog({
    open,
    onClose,
    responseContent,
    currentStreak,
    maxStreak,
    onContinue,
    isLoading
}) {
    const isMobile = useIsMobile();
    const isLevelUp = currentStreak + 1 > maxStreak;
    const navigate = useNavigate();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isCorrect = responseContent?.value;

    return (
        <Dialog 
            disableEscapeKeyDown 
            open={open} 
            maxWidth="md"
            PaperProps={{
                sx: {
                    width: '500px',
                    backgroundColor: 'rgba(25, 28, 36, 0.95)',
                    backgroundImage: 'linear-gradient(to bottom, rgba(30, 35, 45, 0.98), rgba(15, 18, 25, 0.98))',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    padding: '12px',
                    backdropFilter: 'blur(10px)'
                }
            }}
        >
            <DialogContent sx={{ padding: 0 }}>
                <AnimatePresence mode="wait">
                    <MotionBox 
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 350,
                            width: '100%',
                            py: 4,
                            px: 2
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {isLoading ? (
                            <MotionBox 
                                sx={{ width: '80%', position: 'relative', mt: 6 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Typography variant="h6" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                                    Verificando tu respuesta...
                                </Typography>
                                <LinearProgress 
                                    sx={{ 
                                        width: '100%', 
                                        height: 8, 
                                        borderRadius: 4,
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#3a86ff',
                                            backgroundImage: 'linear-gradient(to right, #3a86ff, #8338ec)'
                                        }
                                    }} 
                                />
                            </MotionBox>
                        ) : (
                            <MotionBox 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    width: '100%'
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {isCorrect ? (
                                    <>
                                        <ReactConfetti 
                                            width={windowSize.width} 
                                            height={windowSize.height}
                                            recycle={false}
                                            numberOfPieces={isLevelUp ? 300 : 200}
                                            gravity={0.15}
                                            colors={isLevelUp ? ['#FFD700', '#FFC107', '#FFEB3B', '#FFFFFF', '#E1BEE7'] : undefined}
                                        />
                                        <MotionBox 
                                            sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center',
                                                width: '100%'
                                            }}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                            <DotLottieReact
                                                src={isLevelUp ? animateUpLevel : animatedCheck}
                                                loop={false}
                                                autoplay
                                                style={{ width: 180, height: 180, marginBottom: 16 }}
                                            />
                                            <MotionBox 
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: 28, md: 36 },
                                                    color: isLevelUp ? '#FFD700' : '#43a047',
                                                    textAlign: 'center',
                                                    mb: 2,
                                                    textShadow: isLevelUp
                                                        ? '0 2px 14px rgba(255, 215, 0, 0.6)'
                                                        : '0 2px 12px rgba(67, 160, 71, 0.4)',
                                                    width: '100%'
                                                }}
                                                initial={{ scale: 0.7 }}
                                                animate={{ scale: 1 }}
                                                transition={{ 
                                                    type: "spring", 
                                                    stiffness: 400, 
                                                    damping: 15,
                                                    delay: 0.3
                                                }}
                                            >
                                                {isLevelUp ? '¡Subiste de nivel!' : '¡Respuesta correcta!'}
                                            </MotionBox>
                                            <MotionBox 
                                                sx={{
                                                    fontSize: { xs: 18, md: 22 },
                                                    color: 'rgba(255, 255, 255, 0.9)',
                                                    textAlign: 'center',
                                                    maxWidth: '90%',
                                                    background: isLevelUp 
                                                        ? 'linear-gradient(to right, #FFD700, #FFC107)'
                                                        : 'linear-gradient(to right, #43a047, #66bb6a)',
                                                    backgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    fontWeight: 500
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.5 }}
                                            >
                                                ¡Tu racha es ahora de {currentStreak}!
                                            </MotionBox>
                                            
                                            <MotionBox
                                                sx={{
                                                    fontSize: { xs: 16, md: 20 },
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    mt: 2,
                                                    textAlign: 'center'
                                                }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.7 }}
                                            >
                                                ¿Quieres continuar?
                                            </MotionBox>
                                        </MotionBox>
                                    </>
                                ) : (
                                    <MotionBox 
                                        sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center',
                                            width: '100%'
                                        }}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <DotLottieReact
                                            src={animatedFail}
                                            loop={false}
                                            autoplay
                                            style={{ width: 180, height: 180, marginBottom: 16 }}
                                        />
                                        <MotionBox 
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: { xs: 24, md: 32 },
                                                color: '#d32f2f',
                                                textAlign: 'center',
                                                mb: 2,
                                                textShadow: '0 2px 12px rgba(211, 47, 47, 0.3)',
                                                width: '100%'
                                            }}
                                            initial={{ scale: 0.7 }}
                                            animate={{ scale: 1 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 400, 
                                                damping: 15,
                                                delay: 0.3
                                            }}
                                        >
                                            ¡Oops! Respuesta incorrecta
                                        </MotionBox>
                                        <MotionBox 
                                            sx={{
                                                fontSize: { xs: 18, md: 20 },
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                textAlign: 'center',
                                                maxWidth: '90%',
                                                fontWeight: 500
                                            }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                        >
                                            Perdiste tu racha.
                                        </MotionBox>
                                        
                                        <MotionBox
                                            sx={{
                                                fontSize: { xs: 16, md: 18 },
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                mt: 2,
                                                textAlign: 'center'
                                            }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.7 }}
                                        >
                                            ¿Quieres empezar de nuevo?
                                        </MotionBox>
                                    </MotionBox>
                                )}
                            </MotionBox>
                        )}
                    </MotionBox>
                </AnimatePresence>
            </DialogContent>
            <DialogActions>
                <MotionBox 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        width: '100%',
                        px: 1.5,
                        pb: 1,
                        pt: 0.5
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    {isMobile ? (
                        <>
                            {/* Botón Salir (móvil) */}
                            <Button
                                size="medium"
                                onClick={() => {onClose(); navigate('/')}}
                                disabled={isLoading}
                                aria-label="Salir"
                                sx={{ 
                                    minWidth: '44px', 
                                    height: '44px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <CloseIcon />
                            </Button>
                            
                            {/* Botón Continuar/Reintentar (móvil) */}
                            {isCorrect ? (
                                <Button
                                    size="medium"
                                    onClick={() => onContinue()}
                                    disabled={isLoading}
                                    aria-label="Continuar"
                                    sx={{ 
                                        minWidth: '44px', 
                                        height: '44px',
                                        borderRadius: '50%',
                                        backgroundColor: isLevelUp ? 'rgba(255, 215, 0, 0.3)' : 'rgba(67, 160, 71, 0.3)',
                                        color: isLevelUp ? '#FFD700' : '#4CAF50',
                                        '&:hover': {
                                            backgroundColor: isLevelUp ? 'rgba(255, 215, 0, 0.4)' : 'rgba(67, 160, 71, 0.4)',
                                        }
                                    }}
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ArrowForwardIcon />
                                </Button>
                            ) : (
                                <Button
                                    size="medium"
                                    onClick={() => onContinue()}
                                    disabled={isLoading}
                                    aria-label="Reintentar"
                                    sx={{ 
                                        minWidth: '44px', 
                                        height: '44px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        }
                                    }}
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ReplayIcon />
                                </Button>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Botón Salir (escritorio) */}
                            <Button
                                startIcon={<CloseIcon />}
                                onClick={() => {onClose(); navigate('/')}}
                                disabled={isLoading}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    padding: '8px 20px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    }
                                }}
                                component={motion.button}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Salir
                            </Button>
                            
                            {/* Botón Continuar/Reintentar (escritorio) */}
                            {isCorrect ? (
                                <Button
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => onContinue()}
                                    disabled={isLoading}
                                    sx={{
                                        backgroundColor: isLevelUp ? 'rgba(255, 215, 0, 0.25)' : 'rgba(67, 160, 71, 0.25)',
                                        color: isLevelUp ? '#FFD700' : '#4CAF50',
                                        borderRadius: '12px',
                                        padding: '8px 24px',
                                        border: isLevelUp 
                                            ? '1px solid rgba(255, 215, 0, 0.5)' 
                                            : '1px solid rgba(67, 160, 71, 0.5)',
                                        boxShadow: isLevelUp 
                                            ? '0 0 15px rgba(255, 215, 0, 0.2)' 
                                            : '0 0 15px rgba(67, 160, 71, 0.2)',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        '&:hover': {
                                            backgroundColor: isLevelUp ? 'rgba(255, 215, 0, 0.35)' : 'rgba(67, 160, 71, 0.35)',
                                        }
                                    }}
                                    component={motion.button}
                                    whileHover={{ 
                                        scale: 1.03,
                                        boxShadow: isLevelUp 
                                            ? '0 0 20px rgba(255, 215, 0, 0.4)' 
                                            : '0 0 20px rgba(67, 160, 71, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Continuar
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<ReplayIcon />}
                                    onClick={() => onContinue()}
                                    disabled={isLoading}
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '8px 20px',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        }
                                    }}
                                    component={motion.button}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Reintentar
                                </Button>
                            )}
                        </>
                    )}
                </MotionBox>
            </DialogActions>
        </Dialog>
    );
}

ActivityStreakDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    responseContent: PropTypes.shape({
        value: PropTypes.any
    }),
    currentStreak: PropTypes.number,
    maxStreak: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired,
};

export default ActivityStreakDialog;