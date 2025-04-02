import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Divider, Chip } from "@mui/material";
import PropTypes from "prop-types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation, useNavigate } from "react-router-dom";
import useMap from "./Hooks/useMap";
import { useGetAnswersOfUserFromLevel } from "./Hooks/requests/Answer";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function WindowLevel({open, level, activity, handleClose, config, ...rest}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setLevelSelected } = useMap();
    const [levelAnswers, setLevelAnswers] = useState([]);
    const [verMas, setVerMas] = useState(false);
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

    return (
        <Dialog
            open={open}
            aria-labelledby="level-dialog"
            onClose={(e, reason) => { if (reason === 'backdropClick') { handleClose() } }}
            fullWidth
            maxWidth="md"
            {...rest}

        >
            <DialogTitle>
                Nivel: {level?.name}
            </DialogTitle>
            <DialogContent dividers>
                                {activity?.description && (
                                    <Box mb={2}>
                                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>Actividad:</Typography>
                                        <Typography variant="body1">{activity.description}</Typography>
                                    </Box>
                                )}
                                
                                                {levelAnswers && levelAnswers.length > 0 && (
                                                    <Box mt={3}>
                                                        <Divider sx={{ mb: 2 }} />
                                                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                                            Respuestas:
                                                        </Typography>
                                                        {levelAnswers.slice().reverse().map((answer, index) => (
                                                            <Box 
                                                                key={index} 
                                                                mt={1} 
                                                                p={2} 
                                                                borderRadius={1}
                                                                sx={{
                                                                    display:(index>2 && !verMas )&& "none",
                                                                    backgroundColor: answer?.status ? 'rgba(129, 199, 132, 0.1)' : 'rgba(229, 115, 115, 0.05)'
                                                                }}
                                                            >
                                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                                    <Typography variant="subtitle2">
                                                                        {index + 1}. {format(new Date(answer.created), "dd/MM/yyyy HH:mm:ss")}
                                                                    </Typography>
                                                                    <Chip 
                                                                        icon={answer?.status ? <CheckCircleIcon /> : <CancelIcon />}
                                                                        label={answer?.status ? "Correcta" : "Incorrecta"} 
                                                                        color={answer?.status ? "success" : "error"}
                                                                        size="small"
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        ))}
                                                        {levelAnswers.length > 3 && 
                                                            
                                                        (
                                                            <Button 
                                                                variant="text" 
                                                                onClick={() => setVerMas(!verMas)} 
                                                                sx={{ mt: 2 }}
                                                            >
                                                                {verMas? "Ver menos": "Ver más"}
                                                            </Button>
                                                        )
                                                    
                                                    }
                                                    </Box>
                                                )}
                                            </DialogContent>
                                            <DialogActions>
                                                {config && 
                                                    <Button onClick={() => {
                        setLevelSelected(level); 
                        navigate(`${location.pathname}/activity/config`);
                    }}>
                        Configurar
                    </Button>
                }
                <Button onClick={() => {
                    setLevelSelected(level); 
                    navigate(`${location.pathname}/activity`);
                }}>
                    Iniciar
                </Button>
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