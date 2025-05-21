import { useCallback, useEffect, useState, lazy, Suspense, useRef } from "react";
import { Alert, Box, Button, LinearProgress, Skeleton, Typography, CircularProgress } from "@mui/material";
import { useGetContents } from "../../components/Hooks/requests/Content";
import { useGetContentImages, useGetImagesFilesOfContent } from "../../components/Hooks/requests/Content";
import { useNavigate } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import { useGetStreakOfUser, usePatchStreak, usePostStreak } from "@components/Hooks/requests/RandomStreak";
import ActivityStreakDialog from "./ActivityStreakDialog";

// Constante para el tiempo máximo del juego en segundos
const MAX_TIME_SECONDS = 60;

export default function ActivityRandom() {
    const [randomContent, setRandomContent] = useState(null);
    const [activityContent, setActivityContent] = useState(null);
    const [responseContent, setResponseContent] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [streakId, setStreakId] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(MAX_TIME_SECONDS);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const timerRef = useRef(null);
    const user = useUserApi();
    const navigate = useNavigate();

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
            // Reset and start the timer when new content is loaded
            setTimeRemaining(MAX_TIME_SECONDS);
            setIsTimerActive(true);
        }
    }, [publicContents, randomContent]);

    // Timer logic
    useEffect(() => {
        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        if (isTimerActive && !showDialog) {
            timerRef.current = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        // Time's up - handle as incorrect answer
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                        handleResponse(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [isTimerActive, showDialog]);

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
        // Stop the timer
        setIsTimerActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        setResponseContent({ value });
        
        // Update streak if correct answer
        if (value) {
            const formData = {userId: user?.userId, actualStreak: currentStreak + 1};
            setCurrentStreak(prev => prev + 1);
            if (streakId) {
                setFormPatch(formData);
            } else {
                setFormPost(formData) 
            }
        } else {
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
        setShowDialog(false);
        setActivityType(null);
        setRandomContent(null);
        setActivityContent(null);
        setResponseContent(null);
        setTimeRemaining(MAX_TIME_SECONDS);
        setIsTimerActive(true);
    };

    // Exit activity
    const exitActivity = () => {
        // Stop the timer when exiting
        setIsTimerActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        navigate('/'); // Navigate to home or appropriate page
    };

    // Check if loading
    const isLoading = isFetchingContents || isFetchingActivityTypeVersion || 
                      isFetchingImages || isPending;

    // Check for errors
    const hasError = isErrorContents || isErrorActivityTypeVersion || isErrorImages;

    // Update max streak when current streak increases
    useEffect(() => {
        if (currentStreak > maxStreak) {
            setMaxStreak(currentStreak);
        }
    }, [currentStreak, maxStreak]);

    const handleCloseDialog = () => { 
        setShowDialog(false); 
        setResponseContent(null); 
    }

    // Calculate timer color based on remaining time
    const getTimerColor = () => {
        // Start with green (hue 120) and move to red (hue 0) as time decreases
        const hue = (timeRemaining / MAX_TIME_SECONDS) * 120;
        return `hsl(${hue}, 100%, 40%)`;
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box sx={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="rectangular" width="80%" height="60%" />
                    <Box width={"80%"}>
                        <LinearProgress />
                    </Box>
                </Box>
            );
        }
        if (hasError) {
            return <Alert severity="error">Hubo un error al obtener la actividad</Alert>;
        }
        if (!!activityContent) {
            return (
                <Box sx={{ position: 'relative' }}>
                    {/* Sticky Header */}
                    <Box
                        sx={{
                            position: 'sticky',
                            top: { xs: '6em', sm: '6em' },
                            zIndex: 10,
                            background: (theme) => `linear-gradient(90deg, ${theme.palette.secondary.light}AA 0%, ${theme.palette.secondary.dark}AA 100%)`,
                            boxShadow: 2,
                            borderRadius: 2,
                            mb: 2,
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={exitActivity}
                                variant="outlined"
                                sx={{ bgcolor: 'background.paper' }}
                            >
                                Salir
                            </Button>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    letterSpacing: 1,
                                    ml: 2,
                                    textShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                }}
                            >
                                Random Play
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            {/* Timer */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        value={(timeRemaining / MAX_TIME_SECONDS) * 100}
                                        size={60}
                                        thickness={5}
                                        sx={{
                                            color: getTimerColor(),
                                            '& .MuiCircularProgress-circle': {
                                                strokeLinecap: 'round',
                                            }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                            {timeRemaining}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="caption" sx={{ color: 'white', mt: 1 }}>
                                    <TimerIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                    Tiempo
                                </Typography>
                            </Box>
                            
                            {/* Streak counters */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <EmojiEventsIcon color="secondary" />
                                    <Typography variant="caption" sx={{ color: 'white' }}>Actual</Typography>
                                    <Typography variant="h6" sx={{ color: 'white' }}>{currentStreak}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <EmojiEventsIcon color="warning" />
                                    <Typography variant="caption" sx={{ color: 'white' }}>Max</Typography>
                                    <Typography variant="h6" sx={{ color: 'white' }}>{maxStreak}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Suspense fallback={<LinearProgress />}>
                        {ActivityType && <ActivityType content={activityContent} onResponse={(v)=>handleResponse(v)} images={imagesFiles} />}
                    </Suspense>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box>
            {renderContent()}
            <ActivityStreakDialog
                open={showDialog}
                onClose={handleCloseDialog}
                responseContent={responseContent}
                currentStreak={currentStreak}
                maxStreak={maxStreak}
                isLoading={isPostingStreak || isPatchingStreak}
                onContinue={loadNextContent}
            />
        </Box>
    );
}