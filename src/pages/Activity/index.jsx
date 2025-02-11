import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, LinearProgress, Skeleton } from "@mui/material";
import useMap from "../../components/Hooks/useMap";
import { useGetContent } from "../../components/Hooks/requests/Content";
import { usePostAnswer } from "../../components/Hooks/requests/Answer";
import { useNavigate, useParams } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
import Confetti from 'react-confetti'


/**
 * @todo: los ActivityType deben o reiniciarse o volverse a montar para el reintento (que es menos costoso?)
 * @returns 
 */
export default function Activity() {

    const [activityContent, setActivityContent] = useState(null);
    const user = useUserApi();
    const navigate= useNavigate();
    const { idParentLevel, idContent } = useParams();
    const [ answer, setAnswer ] =useState(null);
    const [ enabledPost, setEnabledPost ] = useState(false);
    const { activity } = useMap();
    
    useEffect(() => {
        if(activity===null && !idContent){
            navigate(`/map/${idParentLevel}`)
        }
    }, [activity, idParentLevel, navigate, idContent]);

    const { data: content, isFetching: isFetchingContent, isError: isErrorContent } = useGetContent({contentId:activity?.content || idContent, enabled:(!!activity&&!!activity.content)||!!idContent})
    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion}= useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    const { data: response, isFetching: isFetchingAnswer, isError: isErrorAnswer} = usePostAnswer({form: answer, enabled:(!!answer && enabledPost)})
    const [responseContent, setResponseContent] = useState(false)
    //Obtengo el contenido de la respuesta del content
    useEffect(() => {
      if (content && !!content.model){
        console.log("modelo que llega" , content.model)
        const modelObject = JSON.parse(content.model); 
        setActivityContent(modelObject)
      }
    },[content])

    //Handler de la actividad, habilita el post 
    const handleResponse = useCallback((value)=>{
        //console.log("handleResponse")
        
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
        console.log("uef response", response)
        if(response && !isFetchingAnswer){
            setAnswer(null)
        }
    }, [response, isFetchingAnswer]);

    //Obtengo el template de la actividad
    const [ActivityType, setActivityType] = useState(null);
    useEffect(() => {
        if(activityTypeVersion?.template&& ActivityType===null){
            const aux = lazy(() => import(/* @vite-ignore */ `../../components/Templates/${activityTypeVersion.template}`))
            setActivityType(aux)
        }
    }, [activityTypeVersion, ActivityType]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isFetchingContent || isFetchingActivityTypeVersion) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        return 0;
                    }
                    const diff = Math.random() * 10;
                    return Math.min(oldProgress + diff, 100);
                });
            }, 500);

            return () => {
                clearInterval(timer);
            };
        }
    }, [isFetchingContent, isFetchingActivityTypeVersion]);

    return ( 
        <Box>
         {(isFetchingContent || isFetchingActivityTypeVersion) 
             ? <Box sx={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                 <Skeleton variant="rectangular" width="80%" height="60%">
                 </Skeleton>
                 <Box width={"80%"}>
                    <LinearProgress/>
                 </Box>
               </Box>
            :   ((isErrorContent || isErrorActivityTypeVersion)
                    ? <Alert severity="error">Hubo un error al obtener la actividad</Alert>
                    :(!!activityContent&&
                         <Suspense fallback={<LinearProgress/>}>
                            {ActivityType && <ActivityType content={activityContent} onResponse={handleResponse}/>}
                         </Suspense>
                    )
                )
        }    
    <Dialog  disableEscapeKeyDown open={enabledPost || responseContent} >
        <DialogContent>
           <Box>
            {isFetchingAnswer 
                ? <LinearProgress />
                : isErrorAnswer
                    ? <Alert severity="error">Fallo al guardar la respuesta, vuelve a intentarlo</Alert> 
                    :<div>
                        {response?.status || responseContent?.value
                            ? <div> 
                                ¡Correcto!
                              </div>
                            : "ups.. es incorrecto, intenta nuevamente"}
                            </div>}
              <Confetti
                width={"100%"}
                height={"100%"}
                hidden={response ? !response?.status : !responseContent?.value}
            >
            </Confetti>
            </Box>
        </DialogContent>
        <DialogActions>
               {activity&& <Button onClick={()=> navigate(`/map/${idParentLevel}`)} disabled={isFetchingAnswer}>Volver al mapa</Button>}
                <Button onClick={()=>{setAnswer(null);setEnabledPost(false); setResponseContent(false)}} disabled={isFetchingAnswer || (response ? response?.status : responseContent?.value)}>Reintentar</Button>
                <Button onClick={()=>{ idContent? navigate(-1) : navigate(`/map/${idParentLevel}`)}} disabled={isFetchingAnswer ||(response ? !response?.status: !responseContent?.value)}>Siguiente</Button>
                {/* El siguiente vuelve al mapa para permitirle elegir la siguiente actividad (no siempre hay un solo camino a seguir) 
                TODO: agregar en contexto de useMap el id de la respuesta recien guardada, esto mostraria la animacion en el nodo de completado y habilitar los siguientes nodos.
                */}
        </DialogActions>
    </Dialog>
      </Box>

     );
}

