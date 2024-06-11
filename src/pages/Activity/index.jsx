import { useEffect, useState } from "react";
import MultipleChoice from "../../components/Templates/MultipleChoice";
import { Box, LinearProgress } from "@mui/material";
import { URL_API } from "../../constants";
import axios from "axios";
import { useGetActivity } from "../../components/Hooks/requests/Activity";
import useMap from "../../components/Hooks/useMap";
import { useGetContent } from "../../components/Hooks/requests/Content";

export default function Activity() {

    const [activityContent, setActivityContent] = useState(null);
    const [answer, setAnswer] =useState(null);
    const [enabledPost, setEnabledPost] = useState(false);
    const { level } = useMap();//TODO: DEBERIA OBTENER LA ACTIVIDAD EN LA VENTANA DEL MAP, aca obtener el content solamente.
    const { data: activity, isFetching } = useGetActivity({activityId: 5})
    const { data: content, isFetching: isFetchingContent, isError: isErrorContent, error: errorContent } = useGetContent({contentId:activity?.content, enabled:!!activity&&!!activity.content})
  
    useEffect(() => {
      if (content && !!content.model){
        const modelObject = JSON.parse(content.model); 
        setActivityContent(modelObject)
      }
    },[content])
    const handleResponse =(value)=>{
        console.log("handleResponse", value)
        setAnswer(value)
        setEnabledPost(true);
    }
    useEffect(() => {
        
        if(enabledPost){
            const payload={activity:activity.activityId, userId:4, status: answer}

            axios.post(`${URL_API}/answers`, payload)
                .then((response)=>
                {
                    const modelObject = JSON.parse(response.data.model); 
                    setActivityContent(modelObject)
                    console.log("Content:", response.data)
                }
                )
            //setEnabledPost(false)
            }
        //TODO: usar el estado enabledPost para abrir la ventana, en la ventana poner un progress con el fetching del POST y en el reintentar setear el enablePost en false
    }, [answer, enabledPost]);

    console.log("acontent", activityContent)
    return ( 
        <Box>
            Respuesta:{String(answer)}
        <h1>Activity page</h1>{/* TODO: agregar descripcion /nombre de actividad (quizas la descripcion en un tooltip o similar) */}
         {isFetching&& <LinearProgress />}
        
        {!!activityContent&&
              <MultipleChoice content={activityContent} onResponse={handleResponse} />
    }

      </Box>

     );
}

