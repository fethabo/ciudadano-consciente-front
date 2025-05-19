import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, LinearProgress, Skeleton, Typography } from "@mui/material";
import { useGetContents } from "../../components/Hooks/requests/Content";
import { useGetContentImages, useGetImagesFilesOfContent } from "../../components/Hooks/requests/Content";
import { useNavigate } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animatedFail from '@animations/Fail.lottie';
import animatedCheck from '@animations/Check.lottie';
import ReactConfetti from "react-confetti";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import useIsMobile from "@components/Hooks/useIsMobile";
import { useGetStreakOfUser, usePatchStreak, usePostStreak } from "@components/Hooks/requests/RandomStreak";

export default function ActivityRandom() {
    const [randomContent, setRandomContent] = useState(null);
    const [activityContent, setActivityContent] = useState(null);
    const [responseContent, setResponseContent] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [streakId, setStreakId] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const user = useUserApi();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    // Get all public contents
    const { data: publicContents, isFetching: isFetchingContents, isError: isErrorContents } = useGetContents({enabled: true });

    // Get user streak data
    const { data: streakData, isFetching: isFetchingStreak, refetch } = useGetStreakOfUser({
        userId: user?.userId,
        enabled: !!user?.userId
    });

    // Initialize streak data
    useEffect(() => {
        if (streakData && !isFetchingStreak) {
            setCurrentStreak(streakData.actualStreak || 0);
            setStreakId(streakData.streakId);
            setMaxStreak(streakData.maxStreak);
        }
    }, [streakData, isFetchingStreak]);


    const [formPost, setFormPost] = useState(null);
    // Post new streak if user doesn't have one
    const { isFetching: isPostingStreak } = usePostStreak({userId: user?.userId, form: formPost, enabled: !!user?.userId && !!formPost});
    
    // Patch existing streak
    const [formPatch, setFormPatch] = useState(null);
    const { isFetching: isPatchingStreak } = usePatchStreak({userId: user?.userId, form: formPatch, enabled: !!user?.userId && !!formPatch});

    useEffect(() => {
        if(!isPostingStreak && formPost){
            setFormPost(null);
            refetch();
        }
    }, [isPostingStreak, formPost, refetch]);


    useEffect(() => {
        if(!isPatchingStreak && formPatch){
            setFormPatch(null);
            refetch()
        }
    }, [isPatchingStreak , formPatch, refetch]);

    // Select a random content when component loads or when continuing after a correct answer
    useEffect(() => {
        if (publicContents && publicContents.length > 0 && !randomContent) {
            const randomIndex = Math.floor(Math.random() * publicContents.length);
            setRandomContent(publicContents[randomIndex]);
        }
    }, [publicContents, randomContent]);

    // Get the activity type version
    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion } = useGetActivityTypeVersion({
        activityTypeVersionId: randomContent?.activityTypeVersionId,
        enabled: !!randomContent
    });

    // Get content images
    const { data: images, isFetching: isFetchingImages, isError: isErrorImages } = useGetContentImages({
        contentId: randomContent?.contentId,
        enabled: !!randomContent?.contentId
    });

    // Get image files
    const { data: imagesFiles, isPending } = useGetImagesFilesOfContent({
        images: images || [],
        enabled: !!images && images?.length > 0
    });

    // Parse content model
    useEffect(() => {
        if (randomContent && !!randomContent.model && activityContent === null) {
            const modelObject = JSON.parse(randomContent.model);
            setActivityContent(modelObject);
        }
    }, [randomContent, activityContent]);

    // Lazy load activity template
    const [ActivityType, setActivityType] = useState(null);
    useEffect(() => {
        if (activityTypeVersion?.template && ActivityType === null) {
            const aux = lazy(() => import(`../../components/Templates/${activityTypeVersion.template}/index.jsx`));
            setActivityType(aux);
        }
    }, [activityTypeVersion, ActivityType]);

    // Handle user response
    const handleResponse = useCallback((value) => {
        setResponseContent({ value });
       // console.log("User response:", value);
        // Update streak if correct answer
        if (value) {
            const formData = {userId: user?.userId, actualStreak: currentStreak + 1};
            setCurrentStreak(prev => prev + 1);
            if (streakId) {
                setFormPatch(formData);
            } else {
                setFormPost(formData) 
            }
        }else{
            if (streakId) {
            const formData = {userId: user?.userId, actualStreak: 0};
            setFormPatch(formData);
            } 
            setCurrentStreak(0);
        }
        setShowDialog(true);
    }, [user, streakId, currentStreak]);



    // Load next random content
    const loadNextContent = () => {
        console.log("Loading next content");
        setActivityType(null);
        setRandomContent(null);
        setActivityContent(null);
        setResponseContent(false);
        setShowDialog(false);
    };

    // Exit activity
    const exitActivity = () => {
        navigate('/'); // Navigate to home or appropriate page
    };

    // Check if loading
    const isLoading = isFetchingContents || isFetchingActivityTypeVersion || 
                     isFetchingImages || isPending || isPostingStreak || isPatchingStreak;

    // Check for errors
    const hasError = isErrorContents || isErrorActivityTypeVersion || isErrorImages;


    // Update max streak when current streak increases
    useEffect(() => {
        if (currentStreak > maxStreak) {
            setMaxStreak(currentStreak);
        }
    }, [currentStreak, maxStreak]);

    return (
        <Box>
            {isLoading ? (
                <Box sx={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="rectangular" width="80%" height="60%" />
                    <Box width={"80%"}>
                        <LinearProgress />
                    </Box>
                </Box>
            ) : (
                hasError ? (
                    <Alert severity="error">Hubo un error al obtener la actividad</Alert>
                ) : (
                    !!activityContent && (
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2 }}>
                                <Button 
                                    startIcon={<ArrowBackIcon />}
                                    onClick={exitActivity}
                                    variant="outlined"
                                >
                                    Salir
                                </Button>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <EmojiEventsIcon color="secondary" />
                                        <Typography variant="caption">Actual</Typography>
                                        <Typography variant="h6">{currentStreak}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <EmojiEventsIcon color="warning" />
                                        <Typography variant="caption">Max</Typography>
                                        <Typography variant="h6">{maxStreak}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            
                            <Suspense fallback={<LinearProgress />}>
                                {ActivityType && <ActivityType content={activityContent} onResponse={handleResponse} images={imagesFiles} />}
                            </Suspense>
                        </Box>
                    )
                )
            )}

            <Dialog disableEscapeKeyDown open={showDialog} maxWidth="sm">
                <DialogContent>
                    <Box sx={{ 
                        position: 'relative', 
                        overflow: 'hidden', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        minHeight: 320,
                        py: 4
                    }}>
                        {isLoading ? (
                            <LinearProgress sx={{ width: '100%' }} />
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                {responseContent?.value ? (
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
                                                ¡Tu racha es ahora de {currentStreak}!<br />
                                                ¿Quieres continuar?
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
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
                                            Perdiste tu racha.<br />
                                            ¿Quieres empezar de nuevo?
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                    )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        {isMobile ? (
                            <>
                                <Button 
                                    size="small"
                                    onClick={exitActivity}
                                    disabled={isLoading}
                                    aria-label="Salir"
                                >
                                    <CloseIcon />
                                </Button>
                                {responseContent?.value ? (
                                    <Button
                                        size="small"
                                        onClick={loadNextContent}
                                        disabled={isLoading}
                                        aria-label="Continuar"
                                        color="primary"
                                    >
                                        <ArrowForwardIcon />
                                    </Button>
                                ) : (
                                    <Button
                                        size="small"
                                        onClick={loadNextContent}
                                        disabled={isLoading}
                                        aria-label="Reintentar"
                                    >
                                        <ReplayIcon />
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button
                                    startIcon={<CloseIcon />}
                                    onClick={exitActivity}
                                    disabled={isLoading}
                                >
                                    Salir
                                </Button>
                                {responseContent?.value ? (
                                    <Button
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={loadNextContent}
                                        disabled={isLoading}
                                        color="primary"
                                        variant="contained"
                                    >
                                        Continuar
                                    </Button>
                                ) : (
                                    <Button
                                        startIcon={<ReplayIcon />}
                                        onClick={loadNextContent}
                                        disabled={isLoading}
                                    >
                                        Reintentar
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

ActivityRandom.propTypes = {};