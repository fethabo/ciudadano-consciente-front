import { useCallback, useEffect, useState } from "react";
import MultipleChoice from "../../components/Templates/MultipleChoice";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, LinearProgress, Typography } from "@mui/material";
import useMap from "../../components/Hooks/useMap";
import { useGetContent } from "../../components/Hooks/requests/Content";
import { usePostAnswer } from "../../components/Hooks/requests/Answer";
import { useNavigate, useParams } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";

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
    const { data: response, isFetching: isFetchingAnswer, isError: isErrorAnswer} = usePostAnswer({form: answer, enabled:(!!answer && enabledPost)})
    
    //Obtengo el contenido de la respuesta del content
    useEffect(() => {
      if (content && !!content.model){
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
    return ( 
        <Box>
        <Typography variant="h5">{activity?.description}</Typography>{/* TODO: agregar descripcion /nombre de actividad (quizas la descripcion en un tooltip o similar) */}
         {(isFetchingContent)
             ? <LinearProgress />
            :   (isErrorContent
                    ? <Alert severity="error">Hubo un error al obtener la actividad</Alert>
                    :(!!activityContent&&
                                   /* TODO: oobtener el componentes segun el tipo de actividad  */
                         <MultipleChoice content={activityContent} onResponse={handleResponse} />
                    )
                )
        }
         {/* TODO: ESTE CHILDREN PROBAR DE ARMAR UN SANDBOX PARA PRODUCIR TEMPLATES */}
       
    <Dialog  disableEscapeKeyDown open={enabledPost} >
        <DialogContent>
            {isFetchingAnswer 
                ? <LinearProgress />
                : isErrorAnswer? <Alert severity="error">Fallo al guardar la respuesta, vuelve a intentarlo</Alert> 
                /* TODO:  Animacion de RESPUESTA CORRECTA/INCORRECTA, si es correcta redirigir en x segundos a la siguiente (¿obtener siguiente actividad del mapa?) */
                :<div>{response?.status ? "¡CORRECTO!" : "ups.. es incorrecto, intenta nuevamente"}</div>}
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

