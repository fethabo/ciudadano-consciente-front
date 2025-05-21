import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ReactConfetti from 'react-confetti';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animatedCheck from '@animations/Check.lottie';
import animatedFail from '@animations/Fail.lottie';

function ActivityResultDialog({
    open,
    isFetchingAnswer,
    isErrorAnswer,
    response,
    responseContent,
    activity,
    isMobile,
    id,
    idParentLevel,
    navigate,
    setActivity,
    setAnswer,
    setEnabledPost,
    setResponseContent,
    setActivityContent,
}) {
    return (
        <Dialog disableEscapeKeyDown open={open} maxWidth="sm" >
            <DialogContent>
                <Box sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 320,
                    minWidth: "100%",
                    py: 4
                }}>
                    {isFetchingAnswer
                        ? <LinearProgress sx={{ width: '100%' }} />
                        : isErrorAnswer
                            ? <Alert severity="error">Fallo al guardar la respuesta, vuelve a intentarlo</Alert>
                            : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                    {response?.status || responseContent?.value
                                        ? (
                                            <>
                                                <ReactConfetti />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <DotLottieReact
                                                        src={animatedCheck}
                                                        loop={false}
                                                        autoplay
                                                        style={{ width: 180, height: 180, marginBottom: 8 }}
                                                    />
                                                    <Box sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: { xs: 28, md: 36 },
                                                        color: '#43a047',
                                                        textAlign: 'center',
                                                        mb: 1,
                                                        textShadow: '0 2px 8px rgba(67,160,71,0.2)'
                                                    }}>
                                                        ¡Respuesta correcta!
                                                    </Box>
                                                    <Box sx={{
                                                        fontSize: { xs: 18, md: 22 },
                                                        color: '#fff',
                                                        textAlign: 'center'
                                                    }}>
                                                        ¡Sigue así, lo estás haciendo excelente!
                                                    </Box>
                                                </Box>
                                            </>
                                        )
                                        : (
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <DotLottieReact
                                                    src={animatedFail}
                                                    loop={false}
                                                    autoplay
                                                    style={{ width: 180, height: 180, marginBottom: 8 }}
                                                />
                                                <Box sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: { xs: 24, md: 32 },
                                                    color: '#d32f2f',
                                                    textAlign: 'center',
                                                    mb: 1,
                                                    textShadow: '0 2px 8px rgba(211,47,47,0.15)'
                                                }}>
                                                    ¡Oops! Respuesta incorrecta
                                                </Box>
                                                <Box sx={{
                                                    fontSize: { xs: 16, md: 20 },
                                                    color: '#fff',
                                                    textAlign: 'center'
                                                }}>
                                                    Intenta nuevamente, ¡tú puedes lograrlo!
                                                </Box>
                                            </Box>
                                        )
                                    }
                                </Box>
                            )
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    {/* Botón Volver al mapa */}
                    {activity && (
                        isMobile ? (
                            <Button
                                size="small"
                                onClick={() => { navigate(`/map/${idParentLevel}`); setActivity(null); }}
                                disabled={isFetchingAnswer}
                                aria-label="Volver"
                            >
                                <ArrowBackIcon />
                            </Button>
                        ) : (
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={() => { navigate(`/map/${idParentLevel}`); setActivity(null); }}
                                disabled={isFetchingAnswer}
                            >
                                Volver al mapa
                            </Button>
                        )
                    )}

                    {/* Botón Cerrar */}
                    {!activity && id && (
                        isMobile ? (
                            <Button
                                size="small"
                                onClick={() => { setAnswer(null); setEnabledPost(false); setResponseContent(false); setActivityContent(null); }}
                                aria-label="Cerrar"
                            >
                                <CloseIcon />
                            </Button>
                        ) : (
                            <Button
                                startIcon={<CloseIcon />}
                                onClick={() => { setAnswer(null); setEnabledPost(false); setResponseContent(false); setActivityContent(null); }}
                            >
                                Cerrar
                            </Button>
                        )
                    )}

                    {/* Botón Volver a contents */}
                    {!activity && !id && (
                        isMobile ? (
                            <Button
                                size="small"
                                onClick={() => { navigate(`/contents`); setActivity(null); }}
                                disabled={isFetchingAnswer}
                                aria-label="Volver"
                            >
                                <ArrowBackIcon />
                            </Button>
                        ) : (
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={() => { navigate(`/contents`); setActivity(null); }}
                                disabled={isFetchingAnswer}
                            >
                                Volver
                            </Button>
                        )
                    )}

                    {/* Botón Reintentar */}
                    {isMobile ? (
                        <Button
                            size="small"
                            onClick={() => { setAnswer(null); setEnabledPost(false); setResponseContent(false); setActivityContent(null); }}
                            disabled={isFetchingAnswer || (response ? response?.status : responseContent?.value)}
                            aria-label="Reintentar"
                        >
                            <ReplayIcon />
                        </Button>
                    ) : (
                        <Button
                            startIcon={<ReplayIcon />}
                            onClick={() => { setAnswer(null); setEnabledPost(false); setResponseContent(false); setActivityContent(null); }}
                            disabled={isFetchingAnswer || (response ? response?.status : responseContent?.value)}
                        >
                            Reintentar
                        </Button>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityResultDialog;
ActivityResultDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    isFetchingAnswer: PropTypes.bool.isRequired,
    isErrorAnswer: PropTypes.bool.isRequired,
    response: PropTypes.object,
    responseContent: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    activity: PropTypes.any,
    isMobile: PropTypes.bool.isRequired,
    id: PropTypes.any,
    idParentLevel: PropTypes.any,
    idContent: PropTypes.any,
    navigate: PropTypes.func.isRequired,
    setActivity: PropTypes.func.isRequired,
    setAnswer: PropTypes.func.isRequired,
    setEnabledPost: PropTypes.func.isRequired,
    setResponseContent: PropTypes.func.isRequired,
    setActivityContent: PropTypes.func.isRequired,
};