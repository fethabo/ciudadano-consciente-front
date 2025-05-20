import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, LinearProgress, Skeleton } from "@mui/material";
import useMap from "../../components/Hooks/useMap";
import { useGetContent, useGetContentImages, useGetImagesFilesOfContent } from "../../components/Hooks/requests/Content";
import { usePostAnswer } from "../../components/Hooks/requests/Answer";
import { useNavigate, useParams } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animatedFail from '@animations/Fail.lottie'
//import animatedEntusiastic from '@animations/Entusiastic.lottie'
import animatedCheck from '@animations/Check.lottie'
import ReactConfetti from "react-confetti";
import PropTypes from "prop-types"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useIsMobile from "@components/Hooks/useIsMobile";


/**
 * @todo: agregar post del streak al responder correctamente (eso no deberia afectar a activities)
 * @returns 
 */
export default function Activity({id}) {

    const [activityContent, setActivityContent] = useState(null);
    const user = useUserApi();
    const navigate= useNavigate();
    const { idParentLevel, idContent } = useParams();
    const [ answer, setAnswer ] =useState(null);
    const [ enabledPost, setEnabledPost ] = useState(false);
    const { activity, setActivity } = useMap();
    
    //Si estoy en un mapa y no tengo actividad en el contexto navego al mapa (algo falló)
    useEffect(() => {
        if(activity===null && !idContent && !id){
            navigate(`/map/${idParentLevel}`)
        }
    }, [activity, idParentLevel, navigate, idContent, id]);

    const { data: content, isFetching: isFetchingContent, isError: isErrorContent } = useGetContent({contentId:  id || idContent || activity?.content, enabled:(!!activity&&!!activity.content)||!!idContent || !!id})
    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion}= useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    const { data: response, isFetching: isFetchingAnswer, isError: isErrorAnswer} = usePostAnswer({form: answer, enabled:(!!answer && enabledPost)})
    const [responseContent, setResponseContent] = useState(false)
    const { data: images, isFetching: isFetchingImages, isError: isErrorImages} = useGetContentImages({contentId:content?.contentId, enabled: !!content?.contentId})
    const { data: imagesFiles, isPending } = useGetImagesFilesOfContent({images: images || [], enabled: !!images && images?.length>0});

    //Obtengo el contenido de la respuesta del content
    useEffect(() => {
      if (content && !!content.model && activityContent===null){
        //console.log("modelo que llega" , content.model)
        const modelObject = JSON.parse(content.model); 

        setActivityContent(modelObject)
      }
    },[content,activityContent])

    //Handler de la actividad, habilita el post 
    const handleResponse = useCallback((value)=>{
        if(activity){
            //(EL POST SOLO OCURRE CUANDO ESTOY JUGANDO EN UNA ACTIVIDAD)
            setAnswer({activity:activity.activityId, userId:user?.userId, status: value})        
            setEnabledPost(true);
        }else{
            //si ejecuto directamente el content
            setResponseContent({value: value})
        }

    },[activity, user])

    useEffect(() => {
        //console.log("uef response", response)
        if(response && !isFetchingAnswer){
            setAnswer(null)
        }
    }, [response, isFetchingAnswer]);

    //Obtengo el template de la actividad
    const [ActivityType, setActivityType] = useState(null);
    useEffect(() => {
        if(activityTypeVersion?.template&& ActivityType===null){
            const aux = lazy(() => import(`../../components/Templates/${activityTypeVersion.template}/index.jsx`))
            setActivityType(aux)
        }
    }, [activityTypeVersion, ActivityType]);

   

    // Import icons from MUI

    // Responsive button styles for mobile
    // Usar tamaño "small" y solo iconos en móviles, texto+icono en desktop
    // Se puede usar useMediaQuery de MUI para detectar tamaño de pantalla

   
    const isMobile = useIsMobile();

    return ( 
        <Box>
         {(isFetchingContent || isFetchingActivityTypeVersion || isFetchingImages || isPending) 
             ? <Box sx={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <Skeleton variant="rectangular" width="80%" height="60%">
                 </Skeleton>
                 <Box width={"80%"}>
                    <LinearProgress/>
                 </Box>
               </Box>
            :   ((isErrorContent  || isErrorActivityTypeVersion || isErrorImages)
                    ? <Alert severity="error">Hubo un error al obtener la actividad</Alert>
                    :(!!activityContent&&
                         <Suspense fallback={<LinearProgress/>}>
                            {ActivityType && <ActivityType content={activityContent} onResponse={handleResponse} images={imagesFiles} />}
                         </Suspense>
                    )
                )
        }    
    <Dialog  disableEscapeKeyDown open={enabledPost || responseContent} maxWidth="sm" >
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
            <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between', alignItems: 'center', width: '100%' }}>
               {activity&& 
                (isMobile ?
                    <Button 
                        size="small"
                        onClick={()=> {navigate(`/map/${idParentLevel}`); setActivity(null)}} 
                        disabled={isFetchingAnswer}
                        aria-label="Volver"
                    >
                        <ArrowBackIcon />
                    </Button>
                :
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={()=> {navigate(`/map/${idParentLevel}`); setActivity(null)}} 
                        disabled={isFetchingAnswer}
                    >
                        Volver al mapa
                    </Button>
                )
                }
                {id ?
                (isMobile ?
                    <Button 
                        size="small"
                        onClick={()=>{setAnswer(null);setEnabledPost(false); setResponseContent(false); setActivityContent(null)}}
                        aria-label="Cerrar"
                    >
                        <CloseIcon />
                    </Button>
                :
                    <Button 
                        startIcon={<CloseIcon />} 
                        onClick={()=>{setAnswer(null);setEnabledPost(false); setResponseContent(false); setActivityContent(null)}}
                    >
                        Cerrar
                    </Button>    
                )
                    :<Box>
                        {isMobile ? (
                            <>
                                <Button 
                                    size="small"
                                    onClick={()=>{setAnswer(null);setEnabledPost(false); setResponseContent(false); setActivityContent(null)}} 
                                    disabled={isFetchingAnswer || (response ? response?.status : responseContent?.value)}
                                    aria-label="Reintentar"
                                >
                                    <ReplayIcon />
                                </Button>
                                <Button 
                                    size="small"
                                    onClick={()=>{ idContent? navigate(-1) : navigate(`/map/${idParentLevel}`);setActivity(null);}} 
                                    disabled={isFetchingAnswer ||(response ? !response?.status: !responseContent?.value)}
                                    aria-label="Siguiente"
                                >
                                    <ArrowForwardIcon />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    startIcon={<ReplayIcon />} 
                                    onClick={()=>{setAnswer(null);setEnabledPost(false); setResponseContent(false); setActivityContent(null)}} 
                                    disabled={isFetchingAnswer || (response ? response?.status : responseContent?.value)}
                                >
                                    Reintentar
                                </Button>
                                <Button 
                                    endIcon={<ArrowForwardIcon />} 
                                    onClick={()=>{ idContent? navigate(-1) : navigate(`/map/${idParentLevel}`);setActivity(null);}} 
                                    disabled={isFetchingAnswer ||(response ? !response?.status: !responseContent?.value)}
                                >
                                    Siguiente
                                </Button>
                            </>
                        )}
                    </Box>
            }
            </Box>
        </DialogActions>
    </Dialog>
      </Box>
)
}

Activity.propTypes={
    id: PropTypes.number
}