import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { Alert, Box, LinearProgress, Skeleton } from "@mui/material";
import useMap from "../../components/Hooks/useMap";
import { useGetContent, useGetContentImages, useGetImagesFilesOfContent } from "../../components/Hooks/requests/Content";
import { usePostAnswer } from "../../components/Hooks/requests/Answer";
import { useNavigate, useParams } from "react-router-dom";
import useUserApi from "../../components/Hooks/useUserApi";
import { useGetActivityTypeVersion } from "../../components/Hooks/requests/ActivityTypeVersion";
//import animatedEntusiastic from '@animations/Entusiastic.lottie'
import PropTypes from "prop-types"
import useIsMobile from "@components/Hooks/useIsMobile";
import ActivityResultDialog from "./ActivityResultDialog";


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
            console.log("no estoy en una actividad", value)
            //si ejecuto directamente el content
            setResponseContent({value: value})
        }

    },[activity, user])

    useEffect(() => {
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
            <ActivityResultDialog
                open={enabledPost || responseContent}
                isFetchingAnswer={isFetchingAnswer}
                isErrorAnswer={isErrorAnswer}
                response={response}
                responseContent={responseContent}
                activity={activity}
                isMobile={isMobile}
                id={id}
                idParentLevel={idParentLevel}
                idContent={idContent}
                navigate={navigate}
                setActivity={setActivity}
                setAnswer={setAnswer}
                setEnabledPost={setEnabledPost}
                setResponseContent={setResponseContent}
                setActivityContent={setActivityContent}
            />
        </Box>
    )
}

Activity.propTypes={
    id: PropTypes.number
}