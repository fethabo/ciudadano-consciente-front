import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, LinearProgress, Typography } from "@mui/material";
import useMap from "../../components/Hooks/useMap";
import { useGetContent } from "../../components/Hooks/requests/Content";
import { usePostAnswer } from "../../components/Hooks/requests/Answer";
import { useNavigate, useParams } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
import Confetti from 'react-confetti'

export default function Activity() {

    const [activityContent, setActivityContent] = useState(null);
    const user = useUserApi();
    const navigate= useNavigate();
    const {idParentLevel} = useParams();
    const [answer, setAnswer] =useState(null);
    const [enabledPost, setEnabledPost] = useState(false);
    const { activity } = useMap();
    
    useEffect(() => {
        if(activity===null){
            navigate(`/map/${idParentLevel}`)
        }
    }, [activity, idParentLevel, navigate]);

    const { data: content, isFetching: isFetchingContent, isError: isErrorContent } = useGetContent({contentId:activity?.content, enabled:!!activity&&!!activity.content})
    const { data: activityTypeVersion, isFetching: isFetchingActivityTypeVersion, isError: isErrorActivityTypeVersion}= useGetActivityTypeVersion({activityTypeVersionId: content?.activityTypeVersionId, enabled: !!content})
    const { data: response, isFetching: isFetchingAnswer, isError: isErrorAnswer} = usePostAnswer({form: answer, enabled:(!!answer && enabledPost)})
    console.log(content)
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
        console.log("handleResponse")
        setAnswer({activity:activity.activityId, userId:user?.userId, status: value})        
        setEnabledPost(true);
    },[activity, user])

    useEffect(() => {
        console.log("uef response", response)
        if(response && !isFetchingAnswer){
            setAnswer(null)
        }
    }, [response, isFetchingAnswer]);

    const [ActivityType, setActivityType] = useState(null);
    useEffect(() => {
        if(activityTypeVersion?.template&& ActivityType===null){
            const aux = lazy(() => import(`../../components/Templates/${activityTypeVersion.template}`))
            setActivityType(aux)
        }
    }, [activityTypeVersion, ActivityType]);

    return ( 
        <Box>
        <Typography variant="h5">{activity?.description}</Typography>{/* TODO: agregar descripcion /nombre de actividad (quizas la descripcion en un tooltip o similar) */}
         {(isFetchingContent)
             ? <LinearProgress />
            :   (isErrorContent
                    ? <Alert severity="error">Hubo un error al obtener la actividad</Alert>
                    :(!!activityContent&&
                         <Suspense fallback={<LinearProgress/>}>
                            {ActivityType && <ActivityType content={activityContent} onResponse={handleResponse}/>}
                         </Suspense>
                        /*  <MultipleChoice content={activityContent} onResponse={handleResponse} /> */
                    )
                )
        }    
    <Dialog  disableEscapeKeyDown open={enabledPost} >
        <DialogContent>
            {isFetchingAnswer 
                ? <LinearProgress />
                : isErrorAnswer
                    ? <Alert severity="error">Fallo al guardar la respuesta, vuelve a intentarlo</Alert> 
                    :<div>
                    <Confetti
                        width={"100%"}
                        height={"100%"}
                        />
                    {response?.status ? "¡CORRECTO!" : "ups.. es incorrecto, intenta nuevamente"}</div>}
        </DialogContent>
        <DialogActions>
                <Button onClick={()=> navigate(`/map/${idParentLevel}`)} disabled={isFetchingAnswer}>Volver al mapa</Button>
                <Button onClick={()=>{setAnswer(null);setEnabledPost(false)}} disabled={isFetchingAnswer || response?.status}>Reintentar</Button>
                <Button onClick={()=>{ navigate(`/map/${idParentLevel}`)}} disabled={isFetchingAnswer || !response?.status}>Siguiente</Button>
                {/* El siguiente vuelve al mapa para permitirle elegir la siguiente actividad (no siempre hay un solo camino a seguir) 
                TODO: agregar en contexto de useMap el id de la respuesta recien guardada, esto mostraria la animacion en el nodo de completado y habilitar los siguientes nodos.
                */}
        </DialogActions>
    </Dialog>
      </Box>

     );
}

