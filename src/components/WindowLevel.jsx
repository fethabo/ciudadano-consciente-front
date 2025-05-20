import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Box, 
  Typography, 
  Divider, 
  Chip,
  IconButton,
  Paper,
  Skeleton
} from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from "react-router-dom";
import useMap from "./Hooks/useMap";
import { useGetAnswersOfUserFromLevel } from "./Hooks/requests/Answer";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Componente para envolver el IconButton con animaciones
const AnimatedPlayButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 4,
        position: 'relative'
      }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.1,
        }}
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={onClick}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 3,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 60 }} />
        </IconButton>
      </motion.div>
      <motion.div
        className="rotating-background"
        style={{
          position: 'absolute',
          borderRadius: '50%',
          width: '130px',
          height: '130px',
          background: 'radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)',
          zIndex: 1
        }}
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "linear"
        }}
      />
    </Box>
  );
};

export default function WindowLevel({open, level, activity, handleClose, config, ...rest}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setLevelSelected } = useMap();
    const [levelAnswers, setLevelAnswers] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    
    // Obtener respuestas para este nivel específico
    const { data: answers, isFetching, isError, refetch } = useGetAnswersOfUserFromLevel({
        levelId: level?.levelId, 
        enabled: open && !!level?.levelId
    });

    useEffect(() => {
        if(open && !!level?.levelId){
            refetch();
        }
    }, [open]);
   
    useEffect(() => {
        if (answers && level) {
            // Filtrar respuestas solo para este nivel
            const filteredAnswers = answers.filter(answer => answer?.level === level.levelId);
            setLevelAnswers(filteredAnswers);
        } else {
            setLevelAnswers([]);
        }
    }, [answers, level]);
    
    // Calcular estadísticas de respuestas
    const totalAnswers = levelAnswers.length;
    const correctAnswers = levelAnswers.filter(answer => answer.status).length;
    
    // Función para iniciar el nivel
    const startLevel = () => {
        setLevelSelected(level); 
        navigate(`${location.pathname}/activity`);
    };

    // Función para configurar el nivel
    const configureLevel = () => {
        setLevelSelected(level); 
        navigate(`${location.pathname}/activity/config`);
    };

    // Función para alternar la visualización de respuestas
    const toggleAnswers = () => {
        setShowAnswers(!showAnswers);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby="level-dialog"
            onClose={(e, reason) => { if (reason === 'backdropClick') {setShowAnswers(false); handleClose() } }}
            fullWidth
            maxWidth="md"
            {...rest}
        >
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                <Typography variant="h5" component="div" fontWeight="bold">
                    {level?.name}
                </Typography>
            </DialogTitle>
            
            <DialogContent>
                {activity?.description && (
                    <Box mb={2}>
                        <Typography variant="body1" align="center" color="text.secondary">
                            {activity.description}
                        </Typography>
                    </Box>
                )}

                {/* Botón de play central y prominente */}
                <AnimatedPlayButton onClick={startLevel} />
                
                {/* Estadísticas de respuestas */}
                {isFetching ? (
                    <Box mt={3} mb={2}>
                        {[...Array(2)].map((_, i) => (
                            <Box key={i} display="flex" alignItems="center" mb={1}>
                                <Box flex={1}>
                                    <Skeleton variant="rectangular" height={32} />
                                </Box>
                                <Box ml={2}>
                                    <Skeleton variant="circular" width={32} height={32} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                ): totalAnswers > 0 && (
                    <Box mt={3} mb={2}>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 2, 
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                }
                            }}
                            onClick={toggleAnswers}
                        >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1">
                                    Ya has jugado este nivel {totalAnswers} veces
                                </Typography>
                                <Chip 
                                    label={`${correctAnswers}/${totalAnswers} correctas`}
                                    color={correctAnswers > 0 ? "success" : "default"}
                                    size="medium"
                                    icon={<CheckCircleIcon />}
                                />
                            </Box>
                        </Paper>
                    </Box>
                )}
                
                {/* Lista de respuestas (visible solo cuando se hace clic en las estadísticas) */}
                {showAnswers && levelAnswers.length > 0 && (
                    <Box mt={2} mb={1} component={motion.div} 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                    >
                        <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                            Detalle de respuestas:
                        </Typography>
                        <Box sx={{ maxHeight: '250px', overflowY: 'auto', pr: 1 }}>
                            {levelAnswers.slice().reverse().map((answer, index) => (
                                <Box 
                                    key={index} 
                                    mt={1} 
                                    p={1.5} 
                                    borderRadius={1}
                                    sx={{
                                        backgroundColor: answer?.status ? 'rgba(129, 199, 132, 0.1)' : 'rgba(229, 115, 115, 0.05)',
                                        border: '1px solid',
                                        borderColor: answer?.status ? 'rgba(129, 199, 132, 0.3)' : 'rgba(229, 115, 115, 0.2)',
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2">
                                            {format(new Date(answer.created), "dd/MM/yyyy HH:mm:ss")}
                                        </Typography>
                                        <Chip 
                                            icon={answer?.status ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                                            label={answer?.status ? "Correcta" : "Incorrecta"} 
                                            color={answer?.status ? "success" : "error"}
                                            size="small"
                                            sx={{ height: '24px' }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                <Button onClick={handleClose} color="inherit">
                    Cerrar
                </Button>
                
                {config && (
                    <Button 
                        variant="outlined" 
                        startIcon={<SettingsIcon />}
                        onClick={configureLevel}
                    >
                        Configurar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

WindowLevel.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    level: PropTypes.object,
    activity: PropTypes.object,
    config: PropTypes.bool
};